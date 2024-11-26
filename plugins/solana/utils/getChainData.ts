import getChainIcon from './getChainIcon'
import getTokenIcon from './getTokenIcon'

async function getChainData() {
  const response = await fetch('http://localhost:3001/chains/chain', {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  })

  if (!response.ok) {
    console.error('Failed to fetch chain data:', response.statusText)
    return []
  }

  const data = await response.json()
  const chainData = data.Chain ?? []

  const chains = chainData
    .filter(
      (chain) => !chain.disabled && !chain.isEvm && chain?.name === 'Solana'
    ) // Filter only Solana chains
    .map((chain) => {
      const { name, symbol, tokens } = chain
      const icon = getChainIcon(symbol) // Fetch chain icon dynamically

      // Add icons to each token in the Solana chain
      const tokensWithIcons = tokens.map((token) => ({
        ...token,
        icon: getTokenIcon(token.symbol) // Add token icon dynamically
      }))

      return { name, symbol, tokens: tokensWithIcons, icon }
    })

  console.info('Solana chains with token icons: ', chains)
  return chains
}

export default getChainData
