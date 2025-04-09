import { useQuery } from '@tanstack/react-query'
import { fetchWrapper } from '../helpers/fetch-wrapper'
import log from '@utils/logger'

export interface KYCResult {
  id: string
  status: string
  name: string
  surname: string
  external_uuid: string
  account_id: string
  created_at: number
}

export const useKycStatus = (inputs: {
  uuid: string
  isVerifying: boolean
  kimaBackendUrl: string
}) => {
  const { uuid, isVerifying, kimaBackendUrl } = inputs
  return useQuery({
    queryKey: ['kycStatus', uuid],
    queryFn: async () => {
      try {
        const res: any = await fetchWrapper.post(
          `${kimaBackendUrl}/kyc`,
          JSON.stringify({
            uuid
          })
        )
        const kycResult: Array<KYCResult> = res.data
        log.debug({ kycResult })

        return kycResult[0]
      } catch (e) {
        const msg = `failed to check kyc status for ${uuid}`
        log.error(msg, e)
        throw new Error(msg)
      }
    },
    enabled: !!uuid && !!kimaBackendUrl && isVerifying,
    refetchInterval: 3000,
    staleTime: 3000
  })
}
