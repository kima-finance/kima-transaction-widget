import getChainIcon from './getChainIcon'
import getTokenIcon from './getTokenIcon'

export default async function getChainData(backendURL = 'http://localhost:3001') {
  const _fetch = async (
    URL: string,
    method = 'GET',
    JSON = true
  ) => {
    const response = await fetch(URL, {
      method,
      headers: {
        Accept: 'application/json'
      }
    })
    return JSON ? await response.json() : response
  }

  const envURL = `${backendURL}/chains/env`
  const { env } = await _fetch(envURL)

  const chainsURL = `${backendURL}/chains?env=${env}`
  const chains = await _fetch(chainsURL)

  const formattedChains = [...chains]
    .filter(
      (chain) => chain.shortName === 'SOL'
    )
    .map(async (chain) => {
      const { name, shortName: symbol, supportedTokens } = chain

      const icon = getChainIcon(symbol) // Fetch icon dynamically

      const tokens = [...supportedTokens]
        .filter((token) => token.symbol === 'USDK')
        .map((token) => {
          const { symbol, address } = token
          return { symbol, address }
        })

      const tokensWithIcons = tokens.map((token) => ({
        ...token,
        icon: getTokenIcon(token.symbol) // Add token icon
      }))

      const pluginID = 'SOL'

      const availableChainsURL = `${backendURL}/chains/get_available_chains/${symbol}`
      const { Chains: chains } = await _fetch(availableChainsURL)

      const filteredChains = [...chains].filter((chain) => chain !== 'BTC').sort()

      return {
        pluginID,
        name,
        symbol,
        tokens: tokensWithIcons,
        icon,
        chains: filteredChains
      }
    })

  const resolvedChains = await Promise.all(formattedChains)

  return resolvedChains
}
