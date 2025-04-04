import { ServiceFee } from '@interface'
import { fetchWrapper } from '../helpers/fetch-wrapper'
import { formatterFloat } from 'src/helpers/functions'

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

    const result = response as ServiceFee

    return {
      ...result,
      allowanceAmount: formatterFloat.format(+result.allowanceAmount),
      submitAmount: formatterFloat.format(+result.submitAmount),
      sourceFee: formatterFloat.format(+result.sourceFee),
      targetFee: formatterFloat.format(+result.targetFee),
      kimaFee: formatterFloat.format(+result.kimaFee),
      totalFee: formatterFloat.format(+result.totalFee)
    }
  } catch (e) {
    console.error('Failed to fetch fees:', e)
    throw new Error('Failed to fetch fees')
  }
}
