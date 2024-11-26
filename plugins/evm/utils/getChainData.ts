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
      (chain) =>
        !chain.disabled &&
        chain.isEvm &&
        chain.symbol !== 'TRX' &&
        chain.symbol !== 'BTC'
    ) // Filter out disabled chains
    .map((chain) => {
      const { name, symbol, tokens } = chain
      const icon = getChainIcon(symbol) // Fetch icon dynamically

      // Add icons to each token in the chain
      const tokensWithIcons = tokens.map((token) => ({
        ...token,
        icon: getTokenIcon(token.symbol) // Add token icon
      }))

      return { name, symbol, tokens: tokensWithIcons, icon }
    })

  console.info('EVM chain data: ', chainData)
  console.info('EVM chains with token icons: ', chains)
  return chains
}

export default getChainData
