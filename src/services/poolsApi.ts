import { fetchWrapper } from '../helpers/fetch-wrapper'
import log from '@widget/utils/logger'

export const getPools = async (backenUrl: string): Promise<any> => {
  const poolsData: any = await fetchWrapper.get(`${backenUrl}/chains/pool`)

  return poolsData
}

export const getPoolsBalances = async (
  backendUrl: string
): Promise<Array<any>> => {
  const poolsBalancesData: any = await fetchWrapper.get(
    `${backendUrl}/chains/pool_balance`
  )

  log.debug('poolsBalancesData: ', poolsBalancesData)

  return poolsBalancesData.poolBalance || []
}
