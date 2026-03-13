import { ChainToken, ModeOptions } from '@kima-widget/shared/types'

export const filterTokensByLocation = (
  tokens: ChainToken[] | undefined,
  location: 'origin' | 'target'
): ChainToken[] =>
  (tokens ?? []).filter((token) => {
    const allowed = token.supportedLocations ?? ['origin', 'target']
    return allowed.includes(location)
  })

export const resolveDefaultCurrency = ({
  current,
  isSourceChain,
  mode,
  tokenList
}: {
  current: string
  isSourceChain: boolean
  mode: ModeOptions
  tokenList: ChainToken[]
}): string | null => {
  if (!tokenList.length) return null
  if (mode === ModeOptions.payment && !isSourceChain) return null
  if (current && tokenList.some((token) => token.symbol === current)) return null
  return tokenList[0]?.symbol ?? null
}
