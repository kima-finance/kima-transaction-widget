export type BtcAccount = {
  address: string
  publicKey?: string
}

type ProviderLike = {
  requestAccounts?: () => Promise<any>
  getAccounts?: () => Promise<any>
  getAddresses?: () => Promise<any>
  request?: (args: any, params?: any) => Promise<any>
  getPublicKey?: () => Promise<any>
  publicKey?: string
  pubkey?: string
}

const getErrorCode = (error: any) => {
  if (!error) return undefined
  return error.code ?? error?.error?.code
}

const getErrorMessage = (error: any) => {
  if (!error) return ''
  return (
    error.message ??
    error?.error?.message ??
    error?.data?.message ??
    ''
  )
}

const isMethodNotSupported = (error: any) => {
  if (!error) return false
  if (getErrorCode(error) === -32601) return true
  return /not supported|unsupported|unknown method|not implemented|method not found/i.test(
    String(getErrorMessage(error))
  )
}

const isUserRejected = (error: any) => {
  if (!error) return false
  if (getErrorCode(error) === 4001) return true
  return /reject|cancel/i.test(String(getErrorMessage(error)))
}

const isInvalidParams = (error: any) => {
  if (!error) return false
  if (getErrorCode(error) === -32602) return true
  return /invalid params/i.test(String(getErrorMessage(error)))
}

const normalizeAccount = (item: any): BtcAccount | null => {
  if (!item) return null
  if (typeof item === 'string') return { address: item }
  if (typeof item.address === 'string') {
    const publicKey =
      item.publicKey || item.publicKeyHex || item.pubkey
    return {
      address: item.address,
      publicKey: typeof publicKey === 'string' ? publicKey : undefined
    }
  }
  return null
}

const extractAccounts = (payload: any): BtcAccount[] => {
  if (!payload) return []
  if (Array.isArray(payload)) {
    return payload.map(normalizeAccount).filter(Boolean) as BtcAccount[]
  }
  if (payload.addresses) return extractAccounts(payload.addresses)
  if (payload.accounts) return extractAccounts(payload.accounts)
  if (payload.result) return extractAccounts(payload.result)
  if (payload.address) {
    const account = normalizeAccount(payload)
    return account ? [account] : []
  }
  return []
}

const resolvePubkey = async (
  provider: ProviderLike,
  account: BtcAccount
) => {
  if (account.publicKey) return account.publicKey
  if (typeof provider.publicKey === 'string') return provider.publicKey
  if (typeof provider.pubkey === 'string') return provider.pubkey
  if (typeof provider.getPublicKey === 'function') {
    try {
      const res = await provider.getPublicKey()
      return typeof res === 'string' ? res : ''
    } catch {
      return ''
    }
  }
  return ''
}

const callIfSupported = async (fn?: () => Promise<any>) => {
  if (typeof fn !== 'function') return undefined
  try {
    return await fn()
  } catch (error) {
    if (isMethodNotSupported(error) || isInvalidParams(error)) return undefined
    throw error
  }
}

const requestViaProvider = async (
  provider: ProviderLike,
  method: string,
  params?: any
) => {
  if (typeof provider.request !== 'function') return undefined

  try {
    return await provider.request({ method, params })
  } catch (error) {
    if (isUserRejected(error)) throw error
    try {
      return await provider.request(method, params)
    } catch (error2) {
      if (isUserRejected(error2)) throw error2
      if (isMethodNotSupported(error2) || isMethodNotSupported(error)) {
        return undefined
      }
      throw error2
    }
  }
}

export const getBtcAccountFromProvider = async (
  provider: ProviderLike | null | undefined,
  {
    interactive,
    methodParams,
    methods,
    preferParams
  }: {
    interactive: boolean
    methodParams?: Record<string, any[]>
    methods?: string[]
    preferParams?: boolean
  }
): Promise<BtcAccount | null> => {
  if (!provider) return null

  const methodList =
    methods ??
    (interactive
      ? ['requestAccounts', 'getAccounts', 'getAddresses']
      : ['getAccounts', 'getAddresses'])

  for (const method of methodList) {
    const fallbackParams = methodParams?.[method]

    if (preferParams && fallbackParams?.length) {
      for (const params of fallbackParams) {
        const fallback = await requestViaProvider(provider, method, params)
        const fallbackAccount = extractAccounts(fallback)[0]
        if (fallbackAccount?.address) {
          const publicKey = await resolvePubkey(provider, fallbackAccount)
          return {
            ...fallbackAccount,
            publicKey: publicKey || fallbackAccount.publicKey
          }
        }
      }
    }

    const direct = await callIfSupported(
      (provider as any)?.[method]?.bind(provider)
    )
    const directAccount = extractAccounts(direct)[0]
    if (directAccount?.address) {
      const publicKey = await resolvePubkey(provider, directAccount)
      return { ...directAccount, publicKey: publicKey || directAccount.publicKey }
    }

    const requested = await requestViaProvider(provider, method)
    const requestedAccount = extractAccounts(requested)[0]
    if (requestedAccount?.address) {
      const publicKey = await resolvePubkey(provider, requestedAccount)
      return {
        ...requestedAccount,
        publicKey: publicKey || requestedAccount.publicKey
      }
    }

    if (!preferParams && fallbackParams?.length) {
      for (const params of fallbackParams) {
        const fallback = await requestViaProvider(provider, method, params)
        const fallbackAccount = extractAccounts(fallback)[0]
        if (fallbackAccount?.address) {
          const publicKey = await resolvePubkey(provider, fallbackAccount)
          return {
            ...fallbackAccount,
            publicKey: publicKey || fallbackAccount.publicKey
          }
        }
      }
    }
  }

  return null
}
