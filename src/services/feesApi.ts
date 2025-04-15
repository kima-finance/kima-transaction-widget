import { ServiceFee } from '@interface'
import { fetchWrapper } from '../helpers/fetch-wrapper'
import log from '@utils/logger'

export const getFees = async (
  amount: number,
  deductFee: boolean,
  originChain: string,
  originSymbol: string,
  targetChain: string,
  targetSymbol: string,
  originAddress: string,
  targetAddress: string,
  backendUrl: string
): Promise<ServiceFee> => {
  try {
    const response: any = await fetchWrapper.get(
      `${backendUrl}/submit/fees?amount=${amount}&originChain=${originChain === 'CC' ? 'FIAT' : originChain}&originAddress=${originChain === 'CC' ? targetAddress : originAddress}&originSymbol=${originSymbol}&targetChain=${targetChain}&deductFee=${deductFee}&targetSymbol=${targetSymbol}&targetAddress=${targetAddress}`
    )

    log.debug('fees response: ', response)

    return response as ServiceFee
  } catch (e) {
    log.error('Failed to fetch fees:', e)
    throw new Error('Failed to fetch fees')
  }
}
