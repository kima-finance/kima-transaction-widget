async function getChainData() {
  const response = await fetch('http://localhost:3001/chains/chain', {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  })
  const data = await response.json()
  const chainData = data.Chain ?? []
  const chains = chainData
    .filter((chain) => !chain.disabled && chain?.name === "Tron")
    .map((chain) => {
      const { name, symbol, tokens } = chain
      return { name, symbol, tokens }
    })
  return chains
}

export default getChainData
