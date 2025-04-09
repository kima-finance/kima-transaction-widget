import { useQuery } from '@tanstack/react-query'
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react'
import { getEvmBalance } from '../../utils/getBalance'
import { useKimaContext } from '../../../../src/KimaProvider'
import { selectNetworkOption, selectSourceChain } from '@store/selectors'
import { useSelector } from 'react-redux'
import { NetworkOptions } from '@interface'
import log from '@utils/logger'

const useNativeEvmBalance = () => {
  const { externalProvider } = useKimaContext()
  const appkitAccountInfo = useAppKitAccount()
  const { address: appkitAddress } = appkitAccountInfo || {}
  const { walletProvider } = useAppKitProvider('eip155')

  // Get the current chain and network option
  const sourceChain = useSelector(selectSourceChain)
  const networkOption = useSelector(selectNetworkOption)

  // Use external provider's signer address if available; otherwise, use AppKit's address
  const walletAddress = externalProvider?.signer?.address || appkitAddress

  const result = useQuery({
    queryKey: ['evmNativeBalance', walletAddress, sourceChain],
    queryFn: async () => {
      if (!walletAddress || !sourceChain) return { balance: 0, decimals: 18 }

      try {
        return await getEvmBalance({
          walletAddress,
          chain: sourceChain,
          isTestnet: networkOption === NetworkOptions.testnet
        })
      } catch (error) {
        log.error(
          `Error getting native balance for wallet ${walletAddress}`,
          error
        )
        throw new Error(`Failed to fetch native balance`)
      }
    },
    enabled: !!walletAddress && !!sourceChain,
    staleTime: 1000 * 60 // 1 min cache time
  })

  return result.data
}

export default useNativeEvmBalance
