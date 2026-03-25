const mockDetectEthereumProvider = jest.fn()

jest.mock('@metamask/detect-provider', () => ({
  __esModule: true,
  default: (...args: unknown[]) => mockDetectEthereumProvider(...args)
}))

import {
  getAppKitEip1193Provider,
  getPreferredEvmWriteProvider,
  isMetaMaskWalletInfo,
  isUsableMetaMaskInjectedProvider
} from './appkit'

describe('getAppKitEip1193Provider', () => {
  beforeEach(() => {
    mockDetectEthereumProvider.mockReset()
    delete (window as any).ethereum
  })

  it('returns the provider when AppKit exposes request directly', () => {
    const provider = {
      request: jest.fn()
    }

    expect(getAppKitEip1193Provider(provider)).toBe(provider)
  })

  it('returns the nested provider when AppKit wraps it under provider', () => {
    const nested = {
      request: jest.fn()
    }

    expect(getAppKitEip1193Provider({ provider: nested })).toBe(nested)
  })

  it('returns null when no EIP-1193 request function is available', () => {
    expect(getAppKitEip1193Provider({})).toBeNull()
  })

  it('detects MetaMask wallet info by name or rdns', () => {
    expect(isMetaMaskWalletInfo({ name: 'MetaMask' })).toBe(true)
    expect(isMetaMaskWalletInfo({ rdns: 'io.metamask' })).toBe(true)
    expect(isMetaMaskWalletInfo({ name: 'Coinbase Wallet' })).toBe(false)
  })

  it('rejects hybrid injected providers that also masquerade as TronLink', () => {
    expect(
      isUsableMetaMaskInjectedProvider({
        request: jest.fn(),
        isMetaMask: true,
        isTronLink: true
      })
    ).toBe(false)
  })

  it('prefers the direct MetaMask provider for MetaMask wallet writes', async () => {
    const metamaskProvider = {
      request: jest.fn(),
      isMetaMask: true
    }

    mockDetectEthereumProvider.mockResolvedValue(metamaskProvider)

    await expect(
      getPreferredEvmWriteProvider({
        appkitProvider: { request: jest.fn() },
        walletInfo: { name: 'MetaMask' }
      })
    ).resolves.toEqual({
      provider: metamaskProvider,
      source: 'metamask-detect'
    })
  })

  it('prefers the real MetaMask provider from window.ethereum.providers over a hybrid wrapper', async () => {
    const hybridProvider = {
      request: jest.fn(),
      isMetaMask: true,
      isTronLink: true
    }
    const metamaskProvider = {
      request: jest.fn(),
      isMetaMask: true
    }

    Object.defineProperty(window, 'ethereum', {
      configurable: true,
      value: {
        ...hybridProvider,
        providers: [hybridProvider, metamaskProvider]
      }
    })

    mockDetectEthereumProvider.mockResolvedValue(hybridProvider)

    await expect(
      getPreferredEvmWriteProvider({
        appkitProvider: { request: jest.fn() },
        walletInfo: { name: 'MetaMask' }
      })
    ).resolves.toEqual({
      provider: metamaskProvider,
      source: 'metamask-window'
    })
  })

  it('falls back to the AppKit provider for non-MetaMask wallets', async () => {
    const appkitProvider = {
      request: jest.fn()
    }

    await expect(
      getPreferredEvmWriteProvider({
        appkitProvider,
        walletInfo: { name: 'Coinbase Wallet' }
      })
    ).resolves.toEqual({
      provider: appkitProvider,
      source: 'appkit'
    })
  })
})
