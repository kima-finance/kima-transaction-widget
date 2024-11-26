import getChainIcon from './getChainIcon'

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
    .filter((chain) => !chain.disabled && !chain.isEvm && chain?.name === "Solana")
    .map((chain) => {
      const { name, symbol, tokens } = chain
      const icon = getChainIcon(symbol) // Fetch icon dynamically
      return { name, symbol, tokens, icon }
    })

  console.info('Solana chains: ', chains)
  return chains
}

export default getChainData

getChainData();
