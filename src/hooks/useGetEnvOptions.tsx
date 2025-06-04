import { NetworkOptions, NodeEnv } from '@interface'
import { useQuery } from '@tanstack/react-query'
import { fetchWrapper } from 'src/helpers/fetch-wrapper'

export interface EnvOptions {
  env: NetworkOptions
  kimaExplorer: string
  paymentPartnerId: string
  sentry?: SentryConfig
  transferLimitMaxUSDT: string | null
}

export interface SentryConfig {
  dsn: string
  environment: NodeEnv

  // set this to true to troubleshoot Sentry config issues, you'll see verbose logs
  debug: boolean

  // error reporting rate: 1.0 means 100% of errors are sent to Sentry
  sampleRate: number

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: boolean
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
