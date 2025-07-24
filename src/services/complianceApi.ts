import { fetchWrapper } from '../helpers/fetch-wrapper'
import log from '@widget/utils/logger'

export const getCompliance = async (
  walletAddress: string,
  compliantOption: boolean,
  backendUrl: string
) => {
  if (!walletAddress || !compliantOption) return null

  try {
    const response: any = await fetchWrapper.get(
      `${backendUrl}/compliant?address=${walletAddress}`
    )

    log.debug('compliance: ', response)
    return response
  } catch (error) {
    log.error('compliance error: ', error)
    throw new Error('Cant get compliance')
  }
}
