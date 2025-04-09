import { NetworkFee, ServiceFee } from '@interface'
import { fetchWrapper } from '../helpers/fetch-wrapper'
import log from '@utils/logger'

export interface FeeResult
  extends Omit<ServiceFee, 'sourceNetworkFee' | 'targetNetworkFee'> {
  breakdown: NetworkFee[]
}

export const getFees = async (
  amount: number,
  deductFee: boolean,
  originChain: string,
  originSymbol: string,
  targetChain: string,
  backendUrl: string
): Promise<ServiceFee> => {
  try {
    const response: any = await fetchWrapper.get(
      `${backendUrl}/submit/fees?amount=${amount}&originChain=${originChain}&originSymbol=${originSymbol}&targetChain=${targetChain}&deductFee=${deductFee}`
    )

    log.debug('response: ', response)
    const { breakdown, ...totals } = response as FeeResult
    const [sourceNetworkFee, targetNetworkFee] = breakdown

    const serviceFees: ServiceFee = {
      ...totals,
      sourceNetworkFee,
      targetNetworkFee
    }

    return serviceFees
  } catch (e) {
    log.error('Failed to fetch fees:', e)
    throw new Error('Failed to fetch fees')
  }
}
