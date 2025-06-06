import { errorHandler } from '@utils/error'
import { fetchWrapper } from 'src/helpers/fetch-wrapper'

export const getNetworkOption = async (kimaBackendUrl: string) => {
  try {
    const response: any = await fetchWrapper.get(`${kimaBackendUrl}/chains/env`)

    return response.env
  } catch (error) {
    errorHandler.handleError({
      error,
      context: 'fetch env'
    })
    throw new Error('Error getting network option env variable')
  }
}
