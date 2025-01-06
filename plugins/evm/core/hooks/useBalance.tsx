import { useMemo } from 'react'
import { useSelector } from 'react-redux'
// import { Contract } from '@ethersproject/contracts'
// import { formatUnits } from '@ethersproject/units'
// import { ethers } from 'ethers'
import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Web3Provider
} from '@ethersproject/providers'

import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react'
import {
  // selectErrorHandler,
  selectSourceChain,
  selectTokenOptions,
  selectSourceCurrency,
  selectExternalProvider
} from '@store/selectors'
import { ChainName, isEVMChain } from '../../utils/constants'
// import ERC20ABI from '../../utils/ethereum/erc20ABI.json'
import { isEmptyObject } from '../../helpers/functions'
import { getEvmTokenBalance } from '../../utils/getTokenBalance'
import { useQuery } from '@tanstack/react-query'

const zeroBalance = { balance: 0, decimals: 6 }

export default function useBalance() {
  const appkitAccountInfo = useAppKitAccount()
  const { address: signerAddress } = appkitAccountInfo || {}
  const { walletProvider } = useAppKitProvider('eip155')
  const externalProvider = useSelector(selectExternalProvider)

  const sourceChain = useSelector(selectSourceChain)
  const sourceCurrency = useSelector(selectSourceCurrency)
  const tokenOptions = useSelector(selectTokenOptions)

  const tokenAddress = useMemo(() => {
    if (isEmptyObject(tokenOptions) || sourceChain === ChainName.FIAT) return ''
    const coinOptions = tokenOptions[sourceCurrency]
    if (coinOptions && typeof coinOptions === 'object') {
      return coinOptions[sourceChain]
    }
    return ''
  }, [sourceCurrency, sourceChain, tokenOptions])

  // define wallet address
  const walletAddress = externalProvider?.signer?._address || signerAddress

  // define query key
  const queryKey = ['evmBalance', sourceChain, tokenAddress, walletAddress]

  // enable query
  const enabled =
    !!tokenAddress &&
    (!!walletProvider || !!externalProvider) &&
    !!walletAddress

  const result = useQuery({
    queryKey,
    queryFn: () => {
      try {
        if (!isEVMChain(sourceChain)) return zeroBalance
        return getEvmTokenBalance({
          address: walletAddress as string,
          tokenAddress,
          walletProvider: externalProvider
            ? (externalProvider.provider as Web3Provider)
            : (walletProvider as ExternalProvider | JsonRpcFetchFunc)
        })
      } catch (e) {
        const msg = `Error getting ${sourceChain} ${sourceCurrency} balance for wallet ${walletAddress}`
        console.error(msg, e)
        throw new Error(msg)
      }
    },
    enabled,
    staleTime: 1000 * 60 // 1 min
  })
  const { data } = result

  return data
}
