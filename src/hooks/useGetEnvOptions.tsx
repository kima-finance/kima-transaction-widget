import { NetworkOptions } from '@interface'
import { useQuery } from '@tanstack/react-query'
import { fetchWrapper } from 'src/helpers/fetch-wrapper'

export interface EnvOptions {
  env: NetworkOptions
  kimaExplorer: string
  paymentPartnerId: string
  transferLimitMaxUSDT: string | null
}

const getEnvOptions = async ({
  kimaBackendUrl
}: {
  kimaBackendUrl: string
}): Promise<EnvOptions> => {
  const response = await fetchWrapper.get(`${kimaBackendUrl}/chains/env`) // Update with your API endpoint

  if (typeof response === 'string')
    return {
      env: NetworkOptions.testnet,
      kimaExplorer: 'https://explorer.sardis.kima.network',
      paymentPartnerId: 'KimaTest',
      transferLimitMaxUSDT: null
    }

  return response as EnvOptions
}

export const useGetEnvOptions = ({
  kimaBackendUrl
}: {
  kimaBackendUrl: string
}) => {
  return useQuery({
    queryKey: ['envOptions'],
    queryFn: async () => await getEnvOptions({ kimaBackendUrl })
  })
}
