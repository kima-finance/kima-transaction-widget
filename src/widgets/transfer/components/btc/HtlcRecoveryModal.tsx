import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import WalletModalShell from '../WalletModalShell'
import {
  selectBackendUrl,
  selectBitcoinAddress,
  selectNetworkOption,
  selectTheme
} from '@kima-widget/shared/store/selectors'
import { fetchWrapper } from '@kima-widget/shared/api/fetcher'
import { formatBigInt } from '@kima-widget/shared/lib/bigint'
import { getUnisat } from '@kima-widget/features/connect-wallet/btc/unisat'
import { CrossIcon } from '@kima-widget/assets/icons'
import toast from 'react-hot-toast'
import {
  PrimaryButton,
  SecondaryButton
} from '@kima-widget/components/reusable'
import {
  saveBtcHtlcLock,
  getStoredBtcHtlcLocks,
  StoredBtcHtlcLock,
  updateStoredBtcHtlcLock
} from '@kima-widget/shared/lib/btcHtlcStorage'

type HtlcScanUtxo = {
  txid: string
  vout: number
  value: number
  status?: {
    confirmed: boolean
    block_height?: number
  }
}

type RefundResponse = {
  psbt: string
  timeoutHeight: number
  amountSats: string
  feeSats: string
  refundAddress: string
}

type RefundStatus = {
  txid: string
  confirmed: boolean
  blockHeight?: number
  error?: string
}

const LOCKTIME_THRESHOLD = 500_000_000

const formatUnixTime = (seconds: number) => {
  const date = new Date(seconds * 1000)
  return date.toISOString().replace('T', ' ').replace('.000Z', ' UTC')
}

const HtlcRecoveryModal = ({
  isOpen,
  onClose
}: {
  isOpen: boolean
  onClose: () => void
}) => {
  const theme = useSelector(selectTheme)
  const backendUrl = useSelector(selectBackendUrl)
  const bitcoinAddress = useSelector(selectBitcoinAddress)
  const networkOption = useSelector(selectNetworkOption)
  const [feeSats, setFeeSats] = useState('300')
  const [psbts, setPsbts] = useState<Record<string, RefundResponse>>({})
  const [signedPsbts, setSignedPsbts] = useState<Record<string, string>>({})
  const [txids, setTxids] = useState<Record<string, string>>({})
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [signingId, setSigningId] = useState<string | null>(null)
  const [localLocks, setLocalLocks] = useState<StoredBtcHtlcLock[]>([])
  const [manualOpen, setManualOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const [manualLock, setManualLock] = useState({
    lockId: '',
    senderAddress: '',
    senderPubkey: '',
    recipientAddress: '',
    hash: '',
    timeoutHeight: '',
    amountSats: '',
    htlcAddress: '',
    lockTxId: '',
    lockVout: ''
  })

  useEffect(() => {
    if (!isOpen) return
    setLocalLocks(getStoredBtcHtlcLocks(bitcoinAddress, networkOption))
  }, [bitcoinAddress, isOpen, networkOption])

  const scanTargets = useMemo(
    () => localLocks.filter((lock) => !!lock.htlcAddress),
    [localLocks]
  )
  const lockKey = useMemo(
    () =>
      scanTargets
        .map((lock) => `${lock.lockId}:${lock.htlcAddress}`)
        .join('|'),
    [scanTargets]
  )

  const {
    data: scanData,
    isLoading: isScanning,
    isError: isScanError,
    refetch: refetchScan
  } = useQuery<{ lockId: string; utxos: HtlcScanUtxo[] }[]>({
    queryKey: [
      'btc-htlc-scan',
      backendUrl,
      bitcoinAddress,
      networkOption,
      lockKey
    ],
    enabled:
      isOpen && !!backendUrl && !!bitcoinAddress && scanTargets.length > 0,
    queryFn: async () => {
      return await Promise.all(
        scanTargets.map(async (lock) => {
          try {
            const res = await fetchWrapper.get<{
              utxos: HtlcScanUtxo[]
            }>(`${backendUrl}/btc/htlc/scan?address=${lock.htlcAddress}`)
            return { lockId: lock.lockId, utxos: res?.utxos ?? [] }
          } catch {
            return { lockId: lock.lockId, utxos: [] }
          }
        })
      )
    },
    refetchOnWindowFocus: false,
    refetchInterval: isOpen ? 30_000 : false,
    staleTime: 10_000
  })

  const { data: chainTip } = useQuery<{
    height: number
    timestamp?: number | null
  }>({
    queryKey: ['btc-tip', backendUrl],
    enabled: isOpen && !!backendUrl,
    queryFn: async () => {
      return await fetchWrapper.get(`${backendUrl}/btc/tip`)
    },
    refetchInterval: isOpen ? 30_000 : false,
    refetchOnWindowFocus: false,
    staleTime: 10_000
  })

  const scanById = useMemo(() => {
    const map = new Map<string, HtlcScanUtxo[]>()
    scanData?.forEach((entry) => {
      map.set(entry.lockId, entry.utxos)
    })
    return map
  }, [scanData])

  const refundTargets = useMemo(
    () =>
      localLocks
        .map((lock) => ({
          lockId: lock.lockId,
          txid: txids[lock.lockId] || lock.refundTxId || '',
          lockTxId: lock.lockTxId,
          lockVout: lock.lockVout
        }))
        .filter(
          (entry) =>
            !!entry.txid || (!!entry.lockTxId && entry.lockVout != null)
        ),
    [localLocks, txids]
  )

  const refundKey = useMemo(
    () => refundTargets.map((entry) => `${entry.lockId}:${entry.txid}`).join('|'),
    [refundTargets]
  )

  const { data: refundStatuses, refetch: refetchRefunds } = useQuery<
    Record<string, RefundStatus>
  >({
    queryKey: ['btc-htlc-refund-status', backendUrl, refundKey],
    enabled: isOpen && !!backendUrl && refundTargets.length > 0,
    queryFn: async () => {
      const entries = await Promise.all(
        refundTargets.map(async ({ lockId, txid: seedTxid, lockTxId, lockVout }) => {
          let txid = seedTxid
          try {
            if (!txid && lockTxId && lockVout != null) {
              const outspend = await fetchWrapper.get<{
                spent?: boolean
                txid?: string
                status?: { confirmed?: boolean; block_height?: number }
              }>(
                `${backendUrl}/btc/outspend?txid=${lockTxId}&vout=${lockVout}`
              )
              if (outspend?.spent && outspend?.txid) {
                txid = outspend.txid
              }
            }
            if (!txid) {
              return [
                lockId,
                { txid: '', confirmed: false, error: 'not_started' } as RefundStatus
              ]
            }
            const tx = await fetchWrapper.get<{
              status?: { confirmed?: boolean; block_height?: number }
            }>(`${backendUrl}/btc/transaction?hash=${txid}`)
            return [
              lockId,
              {
                txid,
                confirmed: !!tx?.status?.confirmed,
                blockHeight: tx?.status?.block_height
              } satisfies RefundStatus
            ]
          } catch {
            return [
              lockId,
              { txid, confirmed: false, error: 'unavailable' } as RefundStatus
            ]
          }
        })
      )
      return Object.fromEntries(entries)
    },
    refetchInterval: isOpen ? 15_000 : false,
    refetchOnWindowFocus: false,
    staleTime: 10_000
  })

  const onRefresh = useCallback(() => {
    setLocalLocks(getStoredBtcHtlcLocks(bitcoinAddress, networkOption))
    refetchScan()
    refetchRefunds()
  }, [bitcoinAddress, networkOption, refetchRefunds, refetchScan])

  useEffect(() => {
    if (!refundStatuses) return
    let updated = false
    const locksById = new Map(localLocks.map((lock) => [lock.lockId, lock]))
    Object.entries(refundStatuses).forEach(([lockId, status]) => {
      const lock = locksById.get(lockId)
      if (!lock || !status?.txid) return
      const updates: Partial<StoredBtcHtlcLock> = {}
      if (!lock.refundTxId || lock.refundTxId !== status.txid) {
        updates.refundTxId = status.txid
        updates.refundBroadcastAt = lock.refundBroadcastAt ?? Date.now()
      }
      if (status.confirmed && !lock.refundConfirmed) {
        updates.refundConfirmed = true
      }
      if (Object.keys(updates).length) {
        updateStoredBtcHtlcLock(lockId, updates)
        updated = true
      }
    })
    if (updated) {
      setLocalLocks(getStoredBtcHtlcLocks(bitcoinAddress, networkOption))
    }
  }, [bitcoinAddress, localLocks, networkOption, refundStatuses])

  const pickUtxo = useCallback(
    (lock: StoredBtcHtlcLock) => {
      if (
        lock.lockTxId &&
        lock.lockVout != null &&
        lock.amountSats &&
        !Number.isNaN(Number(lock.amountSats))
      ) {
        return {
          txid: lock.lockTxId,
          vout: Number(lock.lockVout),
          value: Number(lock.amountSats),
          status: { confirmed: false }
        }
      }
      const utxos = scanById.get(lock.lockId) ?? []
      if (!utxos.length) return undefined
      const exact = utxos.find(
        (utxo) => String(utxo.value) === lock.amountSats
      )
      return exact ?? utxos[0]
    },
    [scanById]
  )

  const onAddManualLock = useCallback(() => {
    const senderAddress = manualLock.senderAddress.trim()
    const senderPubkey = manualLock.senderPubkey.trim()
    const recipientAddress = manualLock.recipientAddress.trim()
    const hash = manualLock.hash.trim()
    const timeoutHeight = manualLock.timeoutHeight.trim()
    const amountSats = manualLock.amountSats.trim()
    const htlcAddress = manualLock.htlcAddress.trim()
    const lockTxId = manualLock.lockTxId.trim()
    const lockVout = manualLock.lockVout.trim()

    if (!senderAddress || !amountSats) {
      toast.error('Sender address and amount are required.')
      return
    }

    if (!htlcAddress && (!lockTxId || lockVout === '')) {
      toast.error('Provide an HTLC address or a lock txid/vout.')
      return
    }

    const lockId =
      manualLock.lockId.trim() ||
      (typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `manual-${Date.now()}`)

    saveBtcHtlcLock({
      lockId,
      htlcAddress: htlcAddress || undefined,
      senderAddress,
      senderPubkey: senderPubkey || undefined,
      recipientAddress,
      hash,
      timeoutHeight: Number(timeoutHeight),
      amountSats,
      lockTxId: lockTxId || undefined,
      lockVout: lockVout !== '' ? Number(lockVout) : undefined,
      network: networkOption,
      createdAt: Date.now()
    })

    setManualLock({
      lockId: '',
      senderAddress: '',
      senderPubkey: '',
      recipientAddress: '',
      hash: '',
      timeoutHeight: '',
      amountSats: '',
      htlcAddress: '',
      lockTxId: '',
      lockVout: ''
    })
    setLocalLocks(getStoredBtcHtlcLocks(bitcoinAddress, networkOption))
    toast.success('HTLC lock saved locally.')
  }, [bitcoinAddress, manualLock, networkOption])

  const onRecover = useCallback(
    async (lock: StoredBtcHtlcLock) => {
      if (!backendUrl) return
      if (!lock.senderPubkey || !lock.recipientAddress || !lock.timeoutHeight) {
        toast.error('Missing HTLC metadata for this lock.')
        return
      }
      const utxo = pickUtxo(lock)
      if (!utxo) {
        toast.error('No on-chain HTLC UTXO found yet.')
        return
      }
      setLoadingId(lock.lockId)
      try {
        const res: RefundResponse = await fetchWrapper.post(
          `${backendUrl}/btc/htlc/refund-psbt-direct`,
          JSON.stringify({
            senderAddress: lock.senderAddress,
            recipientAddress: lock.recipientAddress,
            senderPubkey: lock.senderPubkey,
            timeoutHeight: lock.timeoutHeight,
            lockTxId: utxo.txid,
            lockVout: utxo.vout,
            amountSats: String(utxo.value),
            feeSats,
            destinationAddress: lock.senderAddress
          })
        )
        updateStoredBtcHtlcLock(lock.lockId, {
          lockTxId: utxo.txid,
          lockVout: utxo.vout
        })
        setPsbts((prev) => ({ ...prev, [lock.lockId]: res }))
        toast.success('Refund PSBT generated.')
      } catch (e: any) {
        const msg = e?.error ? String(e.error) : 'Failed to build refund PSBT.'
        toast.error(msg)
      } finally {
        setLoadingId(null)
      }
    },
    [backendUrl, feeSats, pickUtxo]
  )

  const onSignAndBroadcast = useCallback(
    async (lock: StoredBtcHtlcLock) => {
      if (!backendUrl) return
      if (lock.timeoutHeight) {
        if (lock.timeoutHeight >= LOCKTIME_THRESHOLD) {
          const tipTimestamp = chainTip?.timestamp
          if (tipTimestamp == null) {
            toast.error('Refund status unavailable. Try again once chain tip loads.')
            return
          }
          if (tipTimestamp < lock.timeoutHeight) {
            toast.error(
              `Refund not available until ${formatUnixTime(
                lock.timeoutHeight
              )} (now ${formatUnixTime(tipTimestamp)}).`
            )
            return
          }
        } else if (
          chainTip?.height != null &&
          chainTip.height < lock.timeoutHeight
        ) {
          toast.error(
            `Refund not available until height ${lock.timeoutHeight} (current ${chainTip.height}).`
          )
          return
        }
      }
      const provider = getUnisat()
      if (!provider?.signPsbt) {
        toast.error('Wallet does not support PSBT signing.')
        return
      }
      if (!lock.senderPubkey || !lock.recipientAddress || !lock.timeoutHeight) {
        toast.error('Missing HTLC metadata for this lock.')
        return
      }

      const utxo = pickUtxo(lock)
      if (!utxo) {
        toast.error('No on-chain HTLC UTXO found yet.')
        return
      }

      setSigningId(lock.lockId)
      try {
        let psbtRes = psbts[lock.lockId]
        if (!psbtRes) {
          psbtRes = await fetchWrapper.post(
            `${backendUrl}/btc/htlc/refund-psbt-direct`,
            JSON.stringify({
              senderAddress: lock.senderAddress,
              recipientAddress: lock.recipientAddress,
              senderPubkey: lock.senderPubkey,
              timeoutHeight: lock.timeoutHeight,
              lockTxId: utxo.txid,
              lockVout: utxo.vout,
              amountSats: String(utxo.value),
              feeSats,
              destinationAddress: lock.senderAddress
            })
          )
          updateStoredBtcHtlcLock(lock.lockId, {
            lockTxId: utxo.txid,
            lockVout: utxo.vout
          })
          setPsbts((prev) => ({
            ...prev,
            [lock.lockId]: psbtRes as RefundResponse
          }))
        }

        let signedPsbt: string
        try {
          signedPsbt = await provider.signPsbt(psbtRes.psbt)
        } catch (_err) {
          signedPsbt = await provider.signPsbt(psbtRes.psbt, {
            autoFinalized: true
          })
        }

        setSignedPsbts((prev) => ({ ...prev, [lock.lockId]: signedPsbt }))

        if (provider.pushPsbt) {
          const txid = await provider.pushPsbt(signedPsbt)
          if (txid) {
            setTxids((prev) => ({ ...prev, [lock.lockId]: txid }))
            updateStoredBtcHtlcLock(lock.lockId, {
              refundTxId: txid,
              refundBroadcastAt: Date.now()
            })
            setLocalLocks(getStoredBtcHtlcLocks(bitcoinAddress, networkOption))
            toast.success('Refund broadcasted. Tracking confirmation...')
            return
          }
        }

        toast.success('Refund PSBT signed. Copy to broadcast if needed.')
      } catch (e: any) {
        const raw = e?.message ? String(e.message) : ''
        const msg = raw || 'Failed to sign refund PSBT.'
        if (raw.toLowerCase().includes('finalize input')) {
          toast.error(
            `Wallet could not finalize refund. Check timeout height (${lock.timeoutHeight}) and try again.`
          )
        } else {
          toast.error(msg)
        }
      } finally {
        setSigningId(null)
      }
    },
    [
      backendUrl,
      feeSats,
      pickUtxo,
      psbts,
      bitcoinAddress,
      networkOption,
      chainTip
    ]
  )

  const copySigned = useCallback(async (psbt: string) => {
    try {
      await navigator.clipboard.writeText(psbt)
      toast.success('Signed PSBT copied.')
    } catch {
      toast.error('Failed to copy signed PSBT.')
    }
  }, [])

  const copyPsbt = useCallback(async (psbt: string) => {
    try {
      await navigator.clipboard.writeText(psbt)
      toast.success('PSBT copied.')
    } catch {
      toast.error('Failed to copy PSBT.')
    }
  }, [])

  const rows = useMemo(() => {
    if (!localLocks.length) return []
    return localLocks.map((lock) => {
      const utxo = pickUtxo(lock)
      const height = chainTip?.height
      const tipTimestamp = chainTip?.timestamp
      const isTimeLock =
        !!lock.timeoutHeight && lock.timeoutHeight >= LOCKTIME_THRESHOLD
      const timeoutReached = lock.timeoutHeight
        ? isTimeLock
          ? tipTimestamp != null && tipTimestamp >= lock.timeoutHeight
          : height != null && height >= lock.timeoutHeight
        : false
      const refundable = !!utxo && !!lock.timeoutHeight && timeoutReached
      const psbt = psbts[lock.lockId]
      const refundStatus = refundStatuses?.[lock.lockId]
      const refundTxId =
        txids[lock.lockId] || lock.refundTxId || refundStatus?.txid
      return {
        lock,
        refundable,
        psbt,
        utxo,
        refundTxId,
        refundStatus,
        height,
        timeoutReached,
        tipTimestamp,
        isTimeLock
      }
    })
  }, [localLocks, pickUtxo, psbts, txids, refundStatuses, chainTip])

  return (
    <>
      <WalletModalShell
      isOpen={isOpen}
      title='HTLC Recovery'
      onClose={onClose}
      className={`wallet-connect htlc-recovery-modal ${theme.colorMode}`}
      rightHeader={
        <>
          <button
            className='icon-button help-icon-button'
            onClick={() => setHelpOpen(true)}
            aria-label='HTLC recovery help'
          >
            ?
          </button>
          <button className='cross-icon-button' onClick={onClose}>
            <CrossIcon
              width={30}
              height={30}
              fill={theme.colorMode === 'light' ? 'black' : 'white'}
            />
          </button>
        </>
      }
    >
      <div className='htlc-recovery'>
        <p className='muted'>
          Recovery is possible only after the HTLC timeout is reached (height or
          time) and the lock transaction is recorded.
        </p>

        <div className='htlc-toolbar'>
          <SecondaryButton clickHandler={onRefresh} theme={theme.colorMode}>
            Refresh
          </SecondaryButton>
          <SecondaryButton
            clickHandler={() => setManualOpen((prev) => !prev)}
            theme={theme.colorMode}
          >
            {manualOpen ? 'Hide Manual Import' : 'Manual Import'}
          </SecondaryButton>
        </div>

        <div className='htlc-fee'>
          <label className='label'>Fee (sats)</label>
          <input
            type='text'
            value={feeSats}
            onChange={(e) => setFeeSats(e.target.value.replace(/[^0-9]/g, ''))}
            className={theme.colorMode}
          />
        </div>

        {manualOpen && (
          <div className='htlc-manual'>
            <div className='htlc-manual-header'>
              <span className='label'>Manual HTLC Import</span>
              <span className='muted'>
                Use this for older locks not stored in this browser. Hash/timeout
                are required for refunds.
              </span>
              <span className='muted'>
                Provide an HTLC address or a lock txid + vout.
              </span>
            </div>
            <div className='htlc-manual-grid'>
              <div className='htlc-manual-field'>
                <label>Lock ID (optional)</label>
                <input
                  type='text'
                  value={manualLock.lockId}
                  onChange={(e) =>
                    setManualLock((prev) => ({
                      ...prev,
                      lockId: e.target.value
                    }))
                  }
                  className={theme.colorMode}
                />
              </div>
              <div className='htlc-manual-field'>
                <label>Sender Address *</label>
                <input
                  type='text'
                  value={manualLock.senderAddress}
                  onChange={(e) =>
                    setManualLock((prev) => ({
                      ...prev,
                      senderAddress: e.target.value
                    }))
                  }
                  className={theme.colorMode}
                />
              </div>
              <div className='htlc-manual-field'>
                <label>Sender Pubkey</label>
                <input
                  type='text'
                  value={manualLock.senderPubkey}
                  onChange={(e) =>
                    setManualLock((prev) => ({
                      ...prev,
                      senderPubkey: e.target.value
                    }))
                  }
                  className={theme.colorMode}
                />
              </div>
              <div className='htlc-manual-field'>
                <label>Recipient Address</label>
                <input
                  type='text'
                  value={manualLock.recipientAddress}
                  onChange={(e) =>
                    setManualLock((prev) => ({
                      ...prev,
                      recipientAddress: e.target.value
                    }))
                  }
                  className={theme.colorMode}
                />
              </div>
              <div className='htlc-manual-field'>
                <label>Hash (sha256)</label>
                <input
                  type='text'
                  value={manualLock.hash}
                  onChange={(e) =>
                    setManualLock((prev) => ({ ...prev, hash: e.target.value }))
                  }
                  className={theme.colorMode}
                />
              </div>
              <div className='htlc-manual-field'>
                <label>Timeout Height</label>
                <input
                  type='text'
                  value={manualLock.timeoutHeight}
                  onChange={(e) =>
                    setManualLock((prev) => ({
                      ...prev,
                      timeoutHeight: e.target.value.replace(/[^0-9]/g, '')
                    }))
                  }
                  className={theme.colorMode}
                />
              </div>
              <div className='htlc-manual-field'>
                <label>Amount (sats) *</label>
                <input
                  type='text'
                  value={manualLock.amountSats}
                  onChange={(e) =>
                    setManualLock((prev) => ({
                      ...prev,
                      amountSats: e.target.value.replace(/[^0-9]/g, '')
                    }))
                  }
                  className={theme.colorMode}
                />
              </div>
              <div className='htlc-manual-field'>
                <label>HTLC Address</label>
                <input
                  type='text'
                  value={manualLock.htlcAddress}
                  onChange={(e) =>
                    setManualLock((prev) => ({
                      ...prev,
                      htlcAddress: e.target.value
                    }))
                  }
                  className={theme.colorMode}
                />
              </div>
              <div className='htlc-manual-field'>
                <label>Lock Txid</label>
                <input
                  type='text'
                  value={manualLock.lockTxId}
                  onChange={(e) =>
                    setManualLock((prev) => ({
                      ...prev,
                      lockTxId: e.target.value
                    }))
                  }
                  className={theme.colorMode}
                />
              </div>
              <div className='htlc-manual-field'>
                <label>Lock Vout</label>
                <input
                  type='text'
                  value={manualLock.lockVout}
                  onChange={(e) =>
                    setManualLock((prev) => ({
                      ...prev,
                      lockVout: e.target.value.replace(/[^0-9]/g, '')
                    }))
                  }
                  className={theme.colorMode}
                />
              </div>
            </div>
            <div className='htlc-manual-actions'>
              <SecondaryButton
                clickHandler={onAddManualLock}
                theme={theme.colorMode}
              >
                Save HTLC Locally
              </SecondaryButton>
            </div>
          </div>
        )}

        {!bitcoinAddress && (
          <p className='muted'>Connect a BTC wallet to load HTLC locks.</p>
        )}
        {bitcoinAddress && isScanning && (
          <p className='muted'>Scanning HTLC UTXOs on-chain…</p>
        )}
        {bitcoinAddress && isScanError && (
          <p className='error-message'>Failed to scan HTLC UTXOs.</p>
        )}

        {bitcoinAddress && !isScanning && !rows.length && (
          <p className='muted'>
            No HTLC locks found for {bitcoinAddress} in this browser.
          </p>
        )}

        <div className='htlc-recovery-list'>
          {rows.map(
            ({
              lock,
              refundable,
              psbt,
              utxo,
              refundTxId,
              refundStatus,
              height,
              timeoutReached,
              tipTimestamp,
              isTimeLock
            }) => (
            <div
              key={lock.lockId}
              className={`card-item htlc-recovery-card ${theme.colorMode}`}
            >
              <div className='wallet-item htlc-recovery-details'>
                <div className='htlc-row'>
                  <span className='htlc-label'>Lock</span>
                  <span className='htlc-value'>{lock.lockId}</span>
                </div>
                <div className='htlc-row'>
                  <span className='htlc-label'>HTLC</span>
                  <span className='htlc-value'>
                    {lock.htlcAddress || 'not provided'}
                  </span>
                </div>
                <div className='htlc-row'>
                  <span className='htlc-label'>Sender Pubkey</span>
                  <span className='htlc-value'>
                    {lock.senderPubkey || 'not provided'}
                  </span>
                </div>
                <div className='htlc-row'>
                  <span className='htlc-label'>Amount</span>
                  <span className='htlc-value'>
                    {formatBigInt({
                      value: BigInt(lock.amountSats),
                      decimals: 8
                    })}{' '}
                    BTC
                  </span>
                </div>
                <div className='htlc-row'>
                  <span className='htlc-label'>Timeout</span>
                  <span className='htlc-value'>{lock.timeoutHeight}</span>
                </div>
                <div className='htlc-row'>
                  <span className='htlc-label'>Lock Tx</span>
                  <span className='htlc-value'>
                    {utxo ? `${utxo.txid}:${utxo.vout}` : 'not found yet'}
                  </span>
                </div>
                <div className='htlc-row'>
                  <span className='htlc-label'>Status</span>
                  <span className='htlc-value'>
                    {utxo
                      ? utxo.status?.confirmed
                        ? 'confirmed'
                        : 'pending'
                      : 'unavailable'}
                  </span>
                </div>
                <div className='htlc-row'>
                  <span className='htlc-label'>Refund</span>
                  <span className='htlc-value'>
                    {lock.refundConfirmed || refundStatus?.confirmed
                      ? 'confirmed'
                      : refundTxId
                        ? 'pending'
                        : !timeoutReached && lock.timeoutHeight
                          ? isTimeLock
                            ? tipTimestamp != null
                              ? `locked (now ${formatUnixTime(tipTimestamp)})`
                              : 'locked (time unavailable)'
                            : height != null
                              ? `locked (now ${height})`
                              : 'locked'
                          : 'not started'}
                  </span>
                </div>
                <div className='htlc-row'>
                  <span className='htlc-label'>Refund Unlock</span>
                  <span className='htlc-value'>
                    {lock.timeoutHeight
                      ? isTimeLock
                        ? tipTimestamp != null
                          ? `${formatUnixTime(lock.timeoutHeight)} (now ${formatUnixTime(
                              tipTimestamp
                            )})`
                          : formatUnixTime(lock.timeoutHeight)
                        : height != null
                          ? `${lock.timeoutHeight} (now ${height})`
                          : lock.timeoutHeight
                      : 'n/a'}
                  </span>
                </div>
              </div>

              <div className='htlc-actions'>
                <SecondaryButton
                  clickHandler={() => onRecover(lock)}
                  disabled={!refundable || loadingId === lock.lockId}
                  isLoading={loadingId === lock.lockId}
                  theme={theme.colorMode}
                >
                  {loadingId === lock.lockId ? 'Preparing…' : 'Recover'}
                </SecondaryButton>
                <PrimaryButton
                  clickHandler={() => onSignAndBroadcast(lock)}
                  disabled={!refundable || signingId === lock.lockId}
                  isLoading={signingId === lock.lockId}
                >
                  {signingId === lock.lockId ? 'Signing…' : 'Sign & Broadcast'}
                </PrimaryButton>
                {psbt && (
                  <SecondaryButton
                    clickHandler={() => copyPsbt(psbt.psbt)}
                    theme={theme.colorMode}
                  >
                    Copy PSBT
                  </SecondaryButton>
                )}
                {signedPsbts[lock.lockId] && (
                  <SecondaryButton
                    clickHandler={() => copySigned(signedPsbts[lock.lockId])}
                    theme={theme.colorMode}
                  >
                    Copy Signed PSBT
                  </SecondaryButton>
                )}
              </div>
              {refundTxId && (
                <p className='muted'>Broadcasted tx: {refundTxId}</p>
              )}
            </div>
            )
          )}
        </div>
      </div>
    </WalletModalShell>
      <WalletModalShell
      isOpen={helpOpen}
      title='HTLC Recovery Help'
      onClose={() => setHelpOpen(false)}
      className={`wallet-connect htlc-recovery-help ${theme.colorMode}`}
      rightHeader={
        <button className='cross-icon-button' onClick={() => setHelpOpen(false)}>
          <CrossIcon
            width={30}
            height={30}
            fill={theme.colorMode === 'light' ? 'black' : 'white'}
          />
        </button>
      }
    >
      <div className='htlc-help'>
        <p>
          Recovery has two steps. Building a refund does not move funds; it
          only prepares a transaction. Funds move only after you sign and
          broadcast.
        </p>
        <ol>
          <li>
            Click <strong>Recover</strong> to build a refund PSBT once the HTLC
            timeout has passed and an HTLC UTXO is visible.
          </li>
          <li>
            Click <strong>Sign & Broadcast</strong> to sign the PSBT with your
            wallet and broadcast the refund transaction.
          </li>
        </ol>
        <p>
          If your wallet cannot broadcast, use <strong>Copy Signed PSBT</strong>{' '}
          and broadcast it using your preferred Bitcoin tool or wallet.
        </p>
      </div>
      </WalletModalShell>
    </>
  )
}

export default HtlcRecoveryModal
