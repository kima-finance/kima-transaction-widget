import { useSelector } from 'react-redux'
import { selectBackendUrl } from '../store/selectors'
import { useChainData } from './useChainData'

export const useSingleChainData = (chainName: string) => {
  const backendURL = useSelector(selectBackendUrl)
  const { data: chainData } = useChainData(backendURL)

  const chain = chainData?.find((chain) => chain.shortName === chainName)
  return chain
}
