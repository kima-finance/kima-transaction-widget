import { fetchWrapper } from 'src/helpers/fetch-wrapper'

export const getNetworkOption = async (kimaBackendUrl: string) => {
  try {
    const response: any = await fetchWrapper.get(`${kimaBackendUrl}/chains/env`)

    return response.env
  } catch (error) {
    console.error(error)
    throw new Error('Error getting network option env variable')
  }
}
