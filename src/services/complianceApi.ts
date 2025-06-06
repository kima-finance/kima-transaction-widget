import { errorHandler } from '@utils/error'
import { fetchWrapper } from '../helpers/fetch-wrapper'
import log from '@utils/logger'

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
    errorHandler.handleError({
      error,
      context: 'fetching compliance'
    })
    throw new Error('Cant get compliance')
  }
}
