import detectEthereumProvider from '@metamask/detect-provider'

export type Eip1193Provider = {
  request?: (args: { method: string; params?: any[] }) => Promise<any>
  send?: (method: string, params?: any[]) => Promise<any>
} & Record<string, any>

type WalletInfoLike = {
  name?: string
  rdns?: string
  [key: string]: unknown
}

export const getAppKitEip1193Provider = (
  appkitProvider: unknown
): Eip1193Provider | null => {
  const provider = appkitProvider as Eip1193Provider | undefined

  if (provider?.request) return provider

  const nestedProvider = provider?.provider as Eip1193Provider | undefined
  if (nestedProvider?.request) return nestedProvider

  return null
}

export const describeAppKitProvider = (appkitProvider: unknown) => {
  const provider = appkitProvider as Eip1193Provider | undefined
  const nestedProvider = provider?.provider as Eip1193Provider | undefined

  return {
    hasDirectRequest: typeof provider?.request === 'function',
    hasDirectSend: typeof provider?.send === 'function',
    directConstructor:
      provider?.constructor && typeof provider.constructor === 'function'
        ? provider.constructor.name
        : undefined,
    directKeys: provider ? Object.keys(provider).slice(0, 12) : [],
    hasNestedProvider: !!nestedProvider,
    hasNestedRequest: typeof nestedProvider?.request === 'function',
    hasNestedSend: typeof nestedProvider?.send === 'function',
    nestedConstructor:
      nestedProvider?.constructor &&
      typeof nestedProvider.constructor === 'function'
        ? nestedProvider.constructor.name
        : undefined,
    nestedKeys: nestedProvider ? Object.keys(nestedProvider).slice(0, 12) : []
  }
}

export const readAppKitRpcDebug = async (
  provider: Eip1193Provider
): Promise<Record<string, unknown>> => {
  const out: Record<string, unknown> = {}

  try {
    out.ethChainId = await provider.request?.({ method: 'eth_chainId' })
  } catch (err: any) {
    out.ethChainIdError = String(err?.message ?? err)
  }

  try {
    out.ethAccounts = await provider.request?.({ method: 'eth_accounts' })
  } catch (err: any) {
    out.ethAccountsError = String(err?.message ?? err)
  }

  return out
}

export const isMetaMaskWalletInfo = (walletInfo?: WalletInfoLike | null) => {
  const name = String(walletInfo?.name ?? '').toLowerCase()
  const rdns = String(walletInfo?.rdns ?? '').toLowerCase()

  return name.includes('metamask') || rdns.includes('metamask')
}

export const isUsableMetaMaskInjectedProvider = (
  provider?: Eip1193Provider | null
) =>
  !!provider?.request &&
  provider?.isMetaMask === true &&
  provider?.isTronLink !== true

export const getDirectMetaMaskProvider = async (): Promise<{
  provider: Eip1193Provider | null
  source: 'metamask-detect' | 'metamask-window' | 'none'
}> => {
  if (typeof window === 'undefined') {
    return { provider: null, source: 'none' }
  }

  const ethereum = (window as any)?.ethereum as
    | (Eip1193Provider & { providers?: Eip1193Provider[] })
    | undefined

  const providerFromList = Array.isArray(ethereum?.providers)
    ? ethereum.providers.find(isUsableMetaMaskInjectedProvider)
    : null

  if (providerFromList) {
    return { provider: providerFromList, source: 'metamask-window' }
  }

  try {
    const detected = (await detectEthereumProvider({
      mustBeMetaMask: true,
      silent: true,
      timeout: 300
    })) as Eip1193Provider | null

    if (isUsableMetaMaskInjectedProvider(detected)) {
      return { provider: detected, source: 'metamask-detect' }
    }
  } catch {
    // ignore and continue to the browser provider scan fallback
  }

  if (isUsableMetaMaskInjectedProvider(ethereum)) {
    return { provider: ethereum, source: 'metamask-window' }
  }

  return {
    provider: null,
    source: 'none'
  }
}

export const getPreferredEvmWriteProvider = async ({
  appkitProvider,
  walletInfo
}: {
  appkitProvider: unknown
  walletInfo?: WalletInfoLike | null
}): Promise<{
  provider: Eip1193Provider | null
  source: 'appkit' | 'metamask-detect' | 'metamask-window'
}> => {
  if (isMetaMaskWalletInfo(walletInfo)) {
    const metamask = await getDirectMetaMaskProvider()

    if (metamask.provider) {
      return {
        provider: metamask.provider,
        source: metamask.source
      }
    }
  }

  return {
    provider: getAppKitEip1193Provider(appkitProvider),
    source: 'appkit'
  }
}
