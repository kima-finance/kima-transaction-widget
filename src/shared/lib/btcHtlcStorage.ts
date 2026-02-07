export type StoredBtcHtlcLock = {
  lockId: string
  htlcAddress?: string
  senderAddress: string
  senderPubkey?: string
  recipientAddress: string
  amountSats: string
  hash: string
  timeoutHeight: number
  network?: string
  createdAt: number
  lockTxId?: string
  lockVout?: number
  refundTxId?: string
  refundConfirmed?: boolean
  refundBroadcastAt?: number
}

const STORAGE_KEY = 'kima-btc-htlc-locks'

const readAll = (): StoredBtcHtlcLock[] => {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as StoredBtcHtlcLock[]) : []
  } catch {
    return []
  }
}

const writeAll = (locks: StoredBtcHtlcLock[]) => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(locks))
  } catch {
    // ignore storage failures
  }
}

export const getStoredBtcHtlcLocks = (
  senderAddress?: string,
  network?: string
) => {
  const all = readAll()
  return all.filter((lock) => {
    if (senderAddress && lock.senderAddress !== senderAddress) return false
    if (network && lock.network && lock.network !== network) return false
    return true
  })
}

export const saveBtcHtlcLock = (lock: StoredBtcHtlcLock) => {
  const all = readAll()
  const next = all.filter((item) => item.lockId !== lock.lockId)
  next.unshift(lock)
  writeAll(next)
}

export const updateStoredBtcHtlcLock = (
  lockId: string,
  updates: Partial<StoredBtcHtlcLock>
) => {
  const all = readAll()
  const next = all.map((item) =>
    item.lockId === lockId ? { ...item, ...updates } : item
  )
  writeAll(next)
}
