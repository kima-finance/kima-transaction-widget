import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { fetchWrapper } from '../helpers/fetch-wrapper'
import { ChainData } from '../../plugins'
import { useDispatch } from 'react-redux'
import {
  setNetworks,
  setTokenOptions,
  TokenOptions
} from '../store/optionSlice'
import { Option } from '../interface'

export const useChainData = (
  backendURL: string,
  chainName?: string
): UseQueryResult<ChainData[], Error> => {
  const dispatch = useDispatch()

  const ouput = useQuery({
    queryKey: ['chainData'],
    queryFn: async () => {
      try {
        const response = await fetchWrapper.get(`${backendURL}/chains`)
        const chains =
          typeof response === 'string' ? [] : (response as ChainData[])

        // update the store
        const { networks, tokens } = getChainAndTokensOptions(chains)
        dispatch(setNetworks(networks))
        dispatch(setTokenOptions(tokens))

        console.log('useChainData::Chain data:', { networks, tokens, chains })

        return chains
      } catch (error) {
        console.error('Error fetching chain data:', error)
        return []
      }
    },
    select: (data) => {
      if (!chainName) return data
      return data.filter((chain) => chain.shortName === chainName)
    },
    enabled: !!backendURL,
    staleTime: 1000 * 60 * 15, // Cache for 15 minutes
    gcTime: 1000 * 60 * 60 // Garbage collect after 1 hour
  })
  return ouput
}

function getChainAndTokensOptions(chains: ChainData[]): {
  networks: Option[]
  tokens: TokenOptions
} {
  const networks: Option[] = []
  const tokens: TokenOptions = {}

  chains.forEach((chain) => {
    networks.push({
      id: chain.shortName,
      label: chain.name
    })
    chain.supportedTokens.forEach((token) => {
      if (!tokens[token.symbol]) {
        tokens[token.symbol] = {}
      }
      tokens[token.symbol][chain.shortName] = token.address
    })
  })
  return { networks, tokens }
}
