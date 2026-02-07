import { useGetEnvOptions } from '@kima-widget/hooks/useGetEnvOptions'
import { bigIntToNumber, formatBigInt } from '@kima-widget/shared/lib/bigint'
import { truncateToDecimals, uiTokenSymbol } from '@kima-widget/shared/lib/misc'
import { setAmount } from '@kima-widget/shared/store/optionSlice'
import {
  selectAmount,
  selectBackendUrl,
  selectCompliantOption,
  selectDappOption,
  selectFeeDeduct,
  selectMode,
  selectServiceFee,
  selectSourceAddress,
  selectSourceChain,
  selectSourceCurrency,
  selectTargetAddress,
  selectTargetChain,
  selectTargetCompliant,
  selectTargetCurrency,
  selectTheme
} from '@kima-widget/shared/store/selectors'
import {
  ChainCompatibility,
  ChainName,
  DAppOptions,
  ModeOptions,
  lightDemoAccounts,
  lightDemoNetworks
} from '@kima-widget/shared/types'
import useBalance from '@kima-widget/widgets/transfer/hooks/useBalance'
import useIsWalletReady from '@kima-widget/widgets/transfer/hooks/useIsWalletReady'
import { parseUnits } from 'viem'
import React, { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import NetworkSelector from '../primary/NetworkSelector'
import CoinDropdown from './CoinDropdown'
import WalletButton from './WalletButton'
import AddressInput from './AddressInput'
import { useKimaContext } from '@kima-widget/app/providers'
import log from '@kima-widget/shared/logger'

type InitialSelection = {
  sourceSelection: boolean
  targetSelection: boolean
}

const SingleForm = ({
  isLoadingFees,
  feeError,
  initialSelection,
  setInitialSelection
}: {
  isLoadingFees: boolean
  feeError?: boolean
  initialSelection: InitialSelection
  setInitialSelection: React.Dispatch<React.SetStateAction<InitialSelection>>
}) => {
  const dispatch = useDispatch()
  const mode = useSelector(selectMode)
  const theme = useSelector(selectTheme)
  const feeDeduct = useSelector(selectFeeDeduct)
  const { totalFee } = useSelector(selectServiceFee)
  const dAppOption = useSelector(selectDappOption)
  const compliantOption = useSelector(selectCompliantOption)
  const targetCompliant = useSelector(selectTargetCompliant)
  const sourceAddress = useSelector(selectSourceAddress)
  const sourceNetwork = useSelector(selectSourceChain)
  const targetNetwork = useSelector(selectTargetChain)
  const targetAddress = useSelector(selectTargetAddress)
  const { isReady } = useIsWalletReady()
  const [amountValue, setAmountValue] = useState('')
  const amount = useSelector(selectAmount)
  const sourceCurrency = useSelector(selectSourceCurrency)
  const targetCurrency = useSelector(selectTargetCurrency)
  const backendUrl = useSelector(selectBackendUrl)
  const { balance, decimals } = useBalance()

  // Limits and environment options
  const { kimaBackendUrl } = useKimaContext()
  const { data: envOptions } = useGetEnvOptions({ kimaBackendUrl })

  // Compliance warning surfaced early for better UX
  const errorMessage = useMemo(
    () =>
      compliantOption &&
      targetCompliant !== null &&
      !targetCompliant?.isCompliant
        ? `Target address has ${targetCompliant.results?.[0].result.risk_score} risk`
        : '',
    [compliantOption, targetCompliant]
  )

  // Compute a conservative maximum spendable — balances minus current fee
  const maxValue = useMemo(() => {
    if (mode === ModeOptions.light) {
      const limit = envOptions?.transferLimitMaxUSDT
        ? parseFloat(envOptions.transferLimitMaxUSDT)
        : 1000
      return BigInt(limit)
    }

    if (!balance) return 0n
    if (totalFee.value === 0n) return balance

    // Note: amount can be empty string on first render
    const intAmount = parseUnits(amount || '0', totalFee.decimals)
    return balance - intAmount
  }, [mode, envOptions?.transferLimitMaxUSDT, balance, totalFee, amount])

  // Currency for displaying fee (source token may be pegged)
  const feeTokenSymbol = useMemo(() => {
    if (!sourceCurrency) return 'USD'
    return uiTokenSymbol(sourceCurrency)
  }, [sourceCurrency])

  // Gate the fee quote region to show the skeleton only when the query can actually run
  // This mirrors the `enabled` logic used in useGetFees.
  const canQuoteFees = useMemo(() => {
    const haveBasics =
      !!backendUrl &&
      !!amount &&
      !!sourceNetwork?.shortName &&
      !!sourceCurrency &&
      !!targetNetwork?.shortName &&
      !!targetCurrency

    if (!haveBasics) return false

    const requiresSourceAddress = !['BANK', 'CC'].includes(
      sourceNetwork.shortName
    )

    const hasSource = requiresSourceAddress ? !!sourceAddress : true
    const hasTarget = !!targetAddress

    return hasSource && hasTarget
  }, [
    backendUrl,
    amount,
    sourceNetwork?.shortName,
    sourceCurrency,
    targetNetwork?.shortName,
    targetCurrency,
    sourceAddress,
    targetAddress
  ])

  useEffect(() => {
    if (!errorMessage) return
    toast.error(errorMessage)
  }, [errorMessage])

  // Keep controlled input aligned with store value on first mount/reset
  useEffect(() => {
    if (amountValue && amount !== '') return
    setAmountValue(amount)
  }, [amount, amountValue])

  // Input masking: enforce numeric, single dot, max decimals and environment cap
  const onAmountChange = (value: string) => {
    try {
      const safeDecimals = Math.min(decimals ?? 6, 18)
      let masked = value
        .replace(/[^0-9.]/g, '')
        .replace(/(\..*?)\..*/g, '$1')
        .replace(new RegExp(`(\\.\\d{${safeDecimals}})\\d+`), '$1')

      if (envOptions?.transferLimitMaxUSDT) {
        const txLimit = parseFloat(envOptions.transferLimitMaxUSDT)
        const numeric = parseFloat(masked || '0')
        if (numeric > txLimit) masked = txLimit.toString()
      }

      setAmountValue(masked)
      dispatch(setAmount(masked))
    } catch (e) {
      log.error('[SingleForm] onAmountChange failed', e)
      toast.error(
        'Invalid amount entered. Please contact support for assistance.',
        {}
      )
    }
  }

  // Max helper: cap by network limit and available balance
  const onMaxClick = () => {
    try {
      // Need a real balance to compute max
      if (!balance || decimals == null) return

      // Cap by environment limit (if any)
      const envCap =
        envOptions?.transferLimitMaxUSDT != null
          ? parseFloat(envOptions.transferLimitMaxUSDT)
          : Number.POSITIVE_INFINITY

      // Convert on-chain balance -> display number
      const raw = bigIntToNumber({ value: balance, decimals })
      const capped = Math.min(raw, envCap)

      // Keep UX-friendly precision
      const truncated = truncateToDecimals(capped, 2).toString()

      setAmountValue(truncated)
      dispatch(setAmount(truncated))
    } catch (e) {
      log.error('[SingleForm] onMaxClick failed', e)
      toast.error(
        'Unable to calculate the maximum amount. Please contact support for assistance.'
      )
    }
  }

  // LIGHT mode: set placeholder addresses so wrappers expand correctly
  const demoSourceAddress = useMemo(() => {
    if (mode !== ModeOptions.light) return ''
    const short = sourceNetwork?.shortName
    if (!short) return ''
    if (short === ChainName.SOLANA) return lightDemoAccounts.SOL
    if (short === ChainName.TRON) return lightDemoAccounts.TRX
    if (lightDemoNetworks.includes(short)) return lightDemoAccounts.EVM
    return ''
  }, [mode, sourceNetwork?.shortName])

  // Decide whether the “Wallet” wrapper shows as connected (source)
  const isConnectedSourceWrapper = useMemo(() => {
    if (mode === ModeOptions.light) {
      const on = !!demoSourceAddress
      log.debug('[SingleForm] source wrapper connected (LIGHT)?', {
        on,
        demoSourceAddress,
        srcShort: sourceNetwork?.shortName
      })
      return on
    }

    if (mode === ModeOptions.payment && dAppOption !== DAppOptions.None) {
      const on = isReady
      log.debug('[SingleForm] source wrapper connected (PAYMENT dApp)?', {
        on,
        isReady
      })
      return on
    }

    const on = isReady
    log.debug('[SingleForm] source wrapper connected (ADVANCED)?', {
      on,
      isReady,
      initial: initialSelection.sourceSelection
    })
    return on
  }, [
    mode,
    dAppOption,
    isReady,
    initialSelection.sourceSelection,
    demoSourceAddress,
    sourceNetwork?.shortName
  ])

  // Decide whether the “Target Wallet” wrapper shows as connected (only relevant in LIGHT)
  const isConnectedTargetWrapper = useMemo(() => {
    if (mode !== ModeOptions.light) return false
    const on = !!targetAddress
    log.debug('[SingleForm] target wrapper connected (LIGHT)?', {
      on,
      targetAddress,
      tgtShort: targetNetwork?.shortName
    })
    return on
  }, [mode, targetAddress, targetNetwork?.shortName])

  // Inner WalletButton (advanced/payment) still needs a boolean
  const isConnected = useMemo(() => {
    if (mode === ModeOptions.payment && dAppOption !== DAppOptions.None) {
      return isReady
    }
    return isReady && !initialSelection.sourceSelection
  }, [isReady, initialSelection, mode, dAppOption])

  useEffect(() => {
    log.debug('[SingleForm] snapshot', {
      mode,
      srcShort: sourceNetwork?.shortName,
      tgtShort: targetNetwork?.shortName,
      initialSelection,
      isReady,
      sourceAddress,
      targetAddress,
      isConnectedSourceWrapper,
      isConnectedTargetWrapper,
      demoSourceAddress,
      feeDeduct
    })
  }, [
    mode,
    sourceNetwork?.shortName,
    targetNetwork?.shortName,
    initialSelection,
    isReady,
    sourceAddress,
    targetAddress,
    isConnectedSourceWrapper,
    isConnectedTargetWrapper,
    demoSourceAddress,
    feeDeduct
  ])

  return (
    <div className='single-form'>
      {/* Source network and coin pickers */}
      <div className='form-item'>
        <span className='label'>
          {dAppOption === DAppOptions.None && 'Source'} Network:
        </span>
        <div className='items'>
          <NetworkSelector
            type='origin'
            {...{
              initialSelection: initialSelection.sourceSelection,
              setInitialSelection
            }}
          />
          <CoinDropdown isSourceChain={true} />
        </div>
      </div>

      {/* Wallet + Target network area: order depends on FIAT */}
      <div
        className={`dynamic-area ${
          sourceNetwork.shortName === ChainName.FIAT ? 'reverse' : '1'
        }`}
      >
        {![ChainCompatibility.CC, ChainCompatibility.BANK].includes(
          sourceNetwork.compatibility
        ) && (
          <div
            className={`form-item wallet-button-item ${isConnectedSourceWrapper ? 'connected' : ''}`}
          >
            <span className='label'>Wallet:</span>
            <WalletButton initialSelection={initialSelection.sourceSelection} />
          </div>
        )}

        {mode !== ModeOptions.payment && (
          <div className='form-item'>
            <span className='label'>Target Network:</span>
            <div className='items'>
              <NetworkSelector
                type='target'
                {...{
                  initialSelection: initialSelection.targetSelection,
                  setInitialSelection
                }}
              />
              <CoinDropdown isSourceChain={false} />
            </div>
          </div>
        )}
      </div>

      {/* Target address (Bridge) */}
      {mode === ModeOptions.bridge && (
        <div className={`form-item ${theme.colorMode}`}>
          <span className='label'>Target Address:</span>
          <AddressInput
            theme={theme.colorMode as string}
            placeholder='Target address'
          />
        </div>
      )}

      {/* LIGHT mode target wallet placeholder */}
      {mode === ModeOptions.light && (
        <div
          className={`form-item wallet-button-item ${isConnectedTargetWrapper ? 'connected' : ''}`}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <span className='label'>Target Wallet:</span>
          <WalletButton
            initialSelection={initialSelection.targetSelection}
            placeholder={true}
          />
        </div>
      )}

      {/* Amount + Max + Estimated fees (with proper gating/skeleton) */}
      <div className={`form-item ${theme.colorMode}`}>
        <span className='label'>Amount:</span>
        <div className={`amount-label-container items ${theme.colorMode}`}>
          <input
            className={`${theme.colorMode}`}
            type='text'
            placeholder='Enter amount'
            value={amountValue || ''}
            onChange={(e) => onAmountChange(e.target.value)}
            disabled={mode === ModeOptions.payment}
          />

          <div className='max-disclaimer'>
            {sourceNetwork.shortName !== 'CC' &&
              mode !== ModeOptions.payment && (
                <span className='max-button' onClick={onMaxClick}>
                  Max
                </span>
              )}

            {dAppOption === DAppOptions.None && canQuoteFees && (
              <p className='fee-amount'>
                Est fees:{' '}
                {isLoadingFees ? (
                  <span className='inline-spinner loading' aria-live='polite'>
                    <span className='dot' />
                    <span className='dot' />
                    <span className='dot' />
                  </span>
                ) : feeError ? (
                  <span className='fee-value fee-error'>Fee unavailable</span>
                ) : totalFee.value >= 0n ? (
                  <span className='fee-value'>
                    {formatBigInt(totalFee)} {feeTokenSymbol}
                  </span>
                ) : (
                  <span className='fee-value'>—</span>
                )}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleForm
