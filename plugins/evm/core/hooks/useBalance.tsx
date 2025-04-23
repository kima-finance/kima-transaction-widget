import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react'
import { useQuery } from '@tanstack/react-query'
import { useKimaContext } from '../../../../src/KimaProvider'

import {
  selectSourceChain,
  selectTokenOptions,
  selectSourceCurrency,
  selectNetworkOption,
  selectSourceAddress,
  selectMode
} from '@store/selectors'
import { ChainName, isEVMChain } from '../../utils/constants'
import { isEmptyObject } from '../../helpers/functions'
import { ModeOptions, NetworkOptions } from '@interface'
import { getEvmTokenBalance } from '../../utils/getTokenBalance'
import log from '@utils/logger'

const zeroBalance = { balance: 0, decimals: 6 }

export default function useBalance() {
  const appkitAccountInfo = useAppKitAccount()
  const { address: signerAddress } = appkitAccountInfo || {}
  const { walletProvider } = useAppKitProvider('eip155')
  const { externalProvider } = useKimaContext()

  const mode = useSelector(selectMode)
  const sourceChain = useSelector(selectSourceChain)
  const sourceCurrency = useSelector(selectSourceCurrency)
  const tokenOptions = useSelector(selectTokenOptions)
  const networkOption = useSelector(selectNetworkOption)

  // Get token address
  const tokenAddress = useMemo(() => {
    if (
      isEmptyObject(tokenOptions) ||
      sourceChain.shortName === ChainName.FIAT
    ) {
      return ''
    }
    return tokenOptions?.[sourceCurrency]?.[sourceChain.shortName] || ''
  }, [sourceCurrency, sourceChain, tokenOptions])

  // Get wallet address from externalProvider or AppKit
  const walletAddress = useSelector(selectSourceAddress)

  // Define query key
  const queryKey = ['evmBalance', sourceChain, tokenAddress, walletAddress]

  // Enable query when required conditions are met
  const enabled =
    !!tokenAddress &&
    !!walletAddress &&
    isEVMChain(sourceChain.shortName) &&
    (!!walletProvider || !!externalProvider || mode === ModeOptions.light)

  const result = useQuery({
    queryKey,
    queryFn: async () => {
      if (!isEVMChain(sourceChain.shortName)) return zeroBalance
      if (!walletAddress || !tokenAddress) return zeroBalance

      try {
        return await getEvmTokenBalance({
          address: walletAddress,
          tokenAddress,
          chain: sourceChain.shortName,
          isTestnet: networkOption === NetworkOptions.testnet
        })
      } catch (error) {
        log.error(
          `Error getting ${sourceChain} ${sourceCurrency} balance for wallet ${walletAddress}:`,
          error
        )
        return zeroBalance
      }
    },
    enabled,
    staleTime: 1000 * 60 // 1 min
  })

  return result.data
}
