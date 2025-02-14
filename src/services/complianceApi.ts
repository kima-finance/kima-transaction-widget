import { fetchWrapper } from '../helpers/fetch-wrapper'

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

    console.log('compliance: ', response)
    return response
  } catch (error) {
    console.error('compliance error: ', error)
    throw new Error('Cant get compliance')
  }
}
