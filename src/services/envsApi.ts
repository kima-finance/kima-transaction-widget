import { fetchWrapper } from '@kima-widget/shared/api/fetcher'
import log from '@kima-widget/shared/logger'

export const getNetworkOption = async (kimaBackendUrl: string) => {
  try {
    const response: any = await fetchWrapper.get(`${kimaBackendUrl}/chains/env`)

    return response.env
  } catch (error) {
    log.error(error)
    throw new Error('Error getting network option env variable')
  }
}
