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

export const isSamePeggedToken = (
  sourceChain: ChainData,
  sourceTokenId: string,
  targetChain: ChainData,
  targetTokenId: string
): boolean => {
  const sourceToken = sourceChain.supportedTokens.find(
    (token) => token.symbol === sourceTokenId
  )
  const targetToken = targetChain.supportedTokens.find(
    (token) => token.symbol === targetTokenId
  )

  // Prefer peggedTo; fall back to symbol/id if missing
  const sPeg = sourceToken?.peggedTo ?? sourceToken?.symbol ?? sourceTokenId
  const tPeg = targetToken?.peggedTo ?? targetToken?.symbol ?? targetTokenId

  // SAME pegged if these match
  return sPeg === tPeg
}
