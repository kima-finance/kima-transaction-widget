import { useQuery, UseQueryResult } from '@tanstack/react-query'
import log from '@kima-widget/shared/logger'
import { ChainData, Option } from '@kima-widget/shared/types'
import { useDispatch } from 'react-redux'
import { fetchWrapper } from '@kima-widget/shared/api/fetcher'
import {
  setNetworks,
  setTokenOptions,
  TokenOptions
} from '@kima-widget/shared/store/optionSlice'

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
        dispatch(setNetworks(chains))
        dispatch(setTokenOptions(tokens))

        log.debug('useChainData::Chain data:', { networks, tokens, chains })

        return chains
      } catch (error) {
        log.error('Error fetching chain data:', error)
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
