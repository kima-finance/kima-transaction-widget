import { useSelector } from 'react-redux'
import { useChainData } from '../shared/lib/hooks/useChainData'
import { selectBackendUrl } from '@kima-widget/shared/store/selectors'

export const useSingleChainData = (chainName: string) => {
  const backendURL = useSelector(selectBackendUrl)
  const { data: chainData } = useChainData(backendURL)

  const chain = chainData?.find((chain) => chain.shortName === chainName)
  return chain
}
