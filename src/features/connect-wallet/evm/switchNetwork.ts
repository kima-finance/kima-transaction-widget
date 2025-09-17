// utils/switchNetwork.ts
import { BrowserProvider, toBeHex } from 'ethers'
import { toHex } from 'viem'
import log from '@kima-widget/shared/logger'
import type { ChainData } from '@kima-widget/shared/types'

type Eip1193 = {
  request?: (args: { method: string; params?: any[] }) => Promise<any>
  // Some wrappers expose `send` instead of `request`
  send?: (method: string, params?: any[]) => Promise<any>
} & Record<string, any>

type SwitchOpts = {
  chainId: number
  chains?: ChainData[]
  // Any EIP-1193-capable provider (wallet, injected, wrapped)
  eip1193?: Eip1193 | null
  // ethers BrowserProvider (external wallet, AppKit’s wrapped provider, etc.)
  browserProvider?: BrowserProvider | null
  // Optional: AppKit modal model that can switch by chain object
  appKitSwitch?: ((target: ChainData) => void | Promise<void>) | null
}

/**
 * Best-effort network switching:
 * 1) EIP-1193 `wallet_switchEthereumChain`
 * 2) If 4902 → `wallet_addEthereumChain` from provided `chains`
 * 3) Fallback to optional AppKit modal switch callback
 */
export const switchNetworkSmart = async ({
  chainId,
  chains = [],
  eip1193,
  browserProvider,
  appKitSwitch
}: SwitchOpts): Promise<boolean> => {
  const hexId = toHex(chainId)
  log.debug('[switchNetworkSmart] start', { chainId, hexId })

  // Try to get a request sender in this order:
  // - direct EIP-1193 .request(...)
  // - ethers v6 BrowserProvider .send(...)
  // - EIP-1193 .send(...)
  const request = async (method: string, params?: any[]) => {
    if (eip1193?.request) return eip1193.request({ method, params })
    if (browserProvider) return browserProvider.send(method, params ?? [])
    if (eip1193?.send) return eip1193.send(method, params ?? [])
    throw new Error('No compatible provider to send requests.')
  }

  const findChain = (id: number) => chains.find((c) => c.id === id)

  const addChain = async (id: number) => {
    const net = findChain(id)
    if (!net) throw new Error(`Unknown chainId ${id} – cannot add.`)

    // Block explorer(s)
    const blockExplorerUrls = Object.values(net.blockExplorers || {}).flatMap(
      (explorer: any) => {
        if (typeof explorer === 'string') return [explorer]
        // viem-like: { name, url, apiUrl }
        return [explorer?.url].filter(Boolean)
      }
    )

    // RPC(s)
    // viem-like shape: rpcUrls: { default: { http: string[] }, public?: { http: string[] }, ... }
    const rpcUrls = Object.values(net.rpcUrls || {}).flatMap((cfg: any) =>
      Array.isArray(cfg?.http) ? cfg.http : []
    )

    const nativeCurrency = net.nativeCurrency || {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    }

    const payload = {
      chainId: toBeHex(net.id),
      chainName: net.name,
      rpcUrls: rpcUrls.length ? rpcUrls : undefined,
      blockExplorerUrls: blockExplorerUrls.length
        ? blockExplorerUrls
        : undefined,
      nativeCurrency
    }

    log.debug('[switchNetworkSmart] wallet_addEthereumChain payload', payload)
    await request('wallet_addEthereumChain', [payload])
  }

  // 1) Try direct switch first
  try {
    await request('wallet_switchEthereumChain', [{ chainId: hexId }])
    log.debug('[switchNetworkSmart] switched via wallet_switchEthereumChain')
    return true
  } catch (err: any) {
    // 4902 = chain not added
    if (err?.code === 4902) {
      log.warn('[switchNetworkSmart] chain not added, attempting add…', err)
      try {
        await addChain(chainId)
        // try switch again after adding
        await request('wallet_switchEthereumChain', [{ chainId: hexId }])
        log.debug(
          '[switchNetworkSmart] added & switched via wallet_addEthereumChain'
        )
        return true
      } catch (addErr) {
        log.error('[switchNetworkSmart] add chain failed', addErr)
      }
    } else if (err?.code === -32603) {
      log.debug('[switchNetworkSmart] node says already switched / busy', err)
      // often harmless — treat as success
      return true
    } else {
      log.warn(
        '[switchNetworkSmart] direct switch failed; will try fallback',
        err
      )
    }
  }

  // 2) AppKit modal fallback if provided
  if (appKitSwitch) {
    const net = findChain(chainId)
    if (net) {
      try {
        await appKitSwitch(net)
        log.debug('[switchNetworkSmart] switched via AppKit modal fallback')
        return true
      } catch (e) {
        log.error('[switchNetworkSmart] AppKit modal fallback failed', e)
      }
    } else {
      log.warn('[switchNetworkSmart] no chain data for AppKit fallback')
    }
  }

  log.error('[switchNetworkSmart] failed to switch network')
  return false
}

/**
 * Backward-compat convenience wrapper (your old signature).
 */
export const switchNetworkEthers = async (
  provider: BrowserProvider,
  chainId: number,
  chains: ChainData[]
): Promise<void> => {
  await switchNetworkSmart({
    chainId,
    chains,
    browserProvider: provider
  })
}
