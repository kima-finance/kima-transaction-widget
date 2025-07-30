import type { FeeResponse, ServiceFee } from '@interface'
import { fetchWrapper } from '../helpers/fetch-wrapper'
import { toBigintAmount } from 'src/helpers/functions'

export const getFees = async (
  amount: number,
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
      `${backendUrl}/submit/fees?amount=${amount}&originChain=${originChain}&originAddress=${['BANK', 'CC'].includes(originChain) ? targetAddress : originAddress}&originSymbol=${originSymbol}&targetChain=${targetChain}&targetAddress=${targetAddress}&targetSymbol=${targetSymbol}`
    )
    const result = response as FeeResponse

    // convert bigint string values to bigint
    const output = {
      feeId: result.feeId,
      peggedTo: result.peggedTo,
      expiration: result.expiration,
      sourceFee: toBigintAmount(result.feeOriginGasBigInt),
      targetFee: toBigintAmount(result.feeTargetGasBigInt),
      kimaFee: toBigintAmount(result.feeKimaProcessingBigInt),
      totalFee: toBigintAmount(result.feeTotalBigInt),
      transactionValues: {
        originChain,
        originAddress,
        originSymbol,
        targetChain,
        targetAddress,
        targetSymbol,
        feeFromOrigin: {
          allowanceAmount: toBigintAmount(
            result.transactionValues.feeFromOrigin.allowanceAmount
          ),
          submitAmount: toBigintAmount(
            result.transactionValues.feeFromOrigin.submitAmount
          ),
          message: result.transactionValues.feeFromOrigin.message
        },
        feeFromTarget: {
          allowanceAmount: toBigintAmount(
            result.transactionValues.feeFromTarget.allowanceAmount
          ),
          submitAmount: toBigintAmount(
            result.transactionValues.feeFromTarget.submitAmount
          ),
          message: result.transactionValues.feeFromTarget.message
        }
      }
    } satisfies ServiceFee
    // console.log('getFees: ', output, response)

    return output
  } catch (e) {
    // log.error('Failed to fetch fees:', e)
    throw new Error('Failed to fetch fees')
  }
}
