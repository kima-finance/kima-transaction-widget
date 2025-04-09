import { fetchWrapper } from 'src/helpers/fetch-wrapper'
import log from '@utils/logger'

export const getNetworkOption = async (kimaBackendUrl: string) => {
  try {
    const response: any = await fetchWrapper.get(`${kimaBackendUrl}/chains/env`)

    return response.env
  } catch (error) {
    log.error(error)
    throw new Error('Error getting network option env variable')
  }
}
