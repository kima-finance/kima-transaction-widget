import { ExternalProvider, JsonRpcFetchFunc } from '@ethersproject/providers'
import { useQuery } from '@tanstack/react-query'
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react'
import { getEvmBalance } from '../../utils/getBalance'

const useNativeEvmBalance = () => {
  const appkitAccountInfo = useAppKitAccount()
  const { address: signerAddress } = appkitAccountInfo || {}
  const { walletProvider } = useAppKitProvider('eip155')

  const result = useQuery({
    queryKey: ['evmNativeBalance', signerAddress],
    queryFn: async () => {
      try {
        const response = await getEvmBalance({
          address: signerAddress!,
          walletProvider: walletProvider as ExternalProvider | JsonRpcFetchFunc
        })
        return response
      } catch (e) {
        const msg = `Error getting native balance for wallet ${signerAddress}`
        console.error(msg, e)
        throw new Error(msg)
      }
    },
    enabled: !!signerAddress && !!walletProvider,
    staleTime: 1000 * 60 // 1 min
  })
  const { data } = result

  return data
}

export default useNativeEvmBalance
