import { ServiceFee } from '@interface'
import { fetchWrapper } from 'src/helpers/fetch-wrapper'

export const getFees = async (
  amount: number | null,
  originChain: string | null,
  targetChain: string | null,
  backendUrl: string
): Promise<ServiceFee> => {
  try {
    const response: any = await fetchWrapper.get(
      `${backendUrl}/submit/fees?amount=${amount}&originChain=${originChain}&targetChain=${targetChain}`
    )

    console.log('response: ', response)
    const { totalFeeUsd, breakdown } = response
    const [sourceNetworkFee, targetNetworkFee] = breakdown

    const serviceFees: ServiceFee = {
      totalFeeUsd,
      sourceNetworkFee,
      targetNetworkFee
    }

    return serviceFees
  } catch (e) {
    console.error('Failed to fetch fees:', e)
    throw new Error('Failed to fetch fees')
  }
}
