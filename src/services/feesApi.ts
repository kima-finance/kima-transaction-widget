import { ServiceFee } from '@interface'
import { fetchWrapper } from '../helpers/fetch-wrapper'

export const getFees = async (
  amount: number,
  deductFee: boolean,
  originChain: string,
  originAddress: string,
  originSymbol: string,
  targetChain: string,
  targetAddress: string,
  targetSymbol: string,
  backendUrl: string
): Promise<ServiceFee> => {
  try {
    const response: any = await fetchWrapper.get(
      `${backendUrl}/submit/fees?amount=${amount}&originChain=${originChain}&originAddress=${originAddress}&originSymbol=${originSymbol}&targetChain=${targetChain}&targetAddress=${targetAddress}&targetSymbol=${targetSymbol}&deductFee=${deductFee}`
    )

    console.log('response: ', response)

    return response as ServiceFee
  } catch (e) {
    console.error('Failed to fetch fees:', e)
    throw new Error('Failed to fetch fees')
  }
}
