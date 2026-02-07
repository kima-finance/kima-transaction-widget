import { ChainData } from '../types'

export const getShortenedAddress = (address: string) => {
  const is0x = (addr: string) => addr?.startsWith('0x')
  return `${address?.substring(0, is0x(address) ? 6 : 5)}...${address?.substr(
    address.length - (is0x(address) ? 8 : 8)
  )}`
}

export const truncateToDecimals = (num: number, decimals: number): number => {
  const factor = Math.pow(10, decimals)
  return Math.floor(num * factor) / factor
}

type TokenMeta = {
  symbol: string
  peggedTo?: string
  decimals: number
  address?: string
}

const findToken = (
  chain: ChainData | undefined,
  symbol: string
): TokenMeta | undefined => {
  if (!chain || !symbol) return undefined
  return chain.supportedTokens?.find((t) => t.symbol === symbol)
}

/**
 * Returns true if the origin & target tokens are pegged to the same underlying (e.g. both 'USD'),
 * regardless of symbol (USDT vs USD1).
 */
export const isSamePeggedToken = (
  originChain: ChainData | undefined,
  originSymbol: string | undefined,
  targetChain: ChainData | undefined,
  targetSymbol: string | undefined
): boolean => {
  if (!originSymbol || !targetSymbol) return false
  const uiOrigin = uiTokenSymbol(originSymbol).toUpperCase()
  const uiTarget = uiTokenSymbol(targetSymbol).toUpperCase()
  if (uiOrigin && uiTarget && uiOrigin === uiTarget) return true

  const src = findToken(originChain, originSymbol ?? '')
  const dst = findToken(targetChain, targetSymbol ?? '')
  if (!src || !dst) return false
  if (!src.peggedTo || !dst.peggedTo) return false
  return src.peggedTo === dst.peggedTo
}

export const uiTokenSymbol = (symbol?: string) => {
  if (!symbol) return symbol ?? ''
  const s = symbol.toString().trim()
  const up = s.toUpperCase()
  if (up === 'WETH') return 'ETH'
  if (up === 'WSOL') return 'SOL'
  if (up === 'WBTC') return 'BTC'
  return s
}
