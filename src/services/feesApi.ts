import { NetworkFee, ServiceFee } from '@interface'
import { fetchWrapper } from 'src/helpers/fetch-wrapper'

export interface FeeResult
  extends Omit<ServiceFee, 'sourceNetworkFee' | 'targetNetworkFee'> {
  breakdown: NetworkFee[]
}

export const getFees = async (
  amount: number | null,
  deductFee: boolean,
  originChain: string | null,
  targetChain: string | null,
  backendUrl: string
): Promise<ServiceFee> => {
  try {
    const response: any = await fetchWrapper.get(
      `${backendUrl}/submit/fees?amount=${amount}&originChain=${originChain}&targetChain=${targetChain}&deductFee=${deductFee}`
    )

    console.log('response: ', response)
    const { breakdown, ...totals } = response as FeeResult
    const [sourceNetworkFee, targetNetworkFee] = breakdown

    const serviceFees: ServiceFee = {
      ...totals,
      sourceNetworkFee,
      targetNetworkFee
    }

    return serviceFees
  } catch (e) {
    console.error('Failed to fetch fees:', e)
    throw new Error('Failed to fetch fees')
  }
}
