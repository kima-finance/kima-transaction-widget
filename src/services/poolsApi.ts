import { fetchWrapper } from 'src/helpers/fetch-wrapper'

export const getPoolsBalances = async (
  backendUrl: string
): Promise<Array<any>> => {
  const poolsData: any = await fetchWrapper.get(
    `${backendUrl}/chains/pool_balance`
  )

  console.log('poolsData: ', poolsData)

  return poolsData.poolBalance || []
}
