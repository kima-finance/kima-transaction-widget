import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Contract } from '@ethersproject/contracts'
import { formatUnits } from '@ethersproject/units'
import { ethers } from 'ethers'
import { ExternalProvider, JsonRpcFetchFunc } from '@ethersproject/providers'

import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react'
import {
  selectErrorHandler,
  selectSourceChain,
  selectTokenOptions,
  selectSourceCurrency
} from '@store/selectors'
import { ChainName, isEVMChain } from '../../utils/constants'
import ERC20ABI from '../../utils/ethereum/erc20ABI.json'
import { isEmptyObject } from '../../helpers/functions'

export default function useBalance() {
  const [balance, setBalance] = useState<number>(0)
  const appkitAccountInfo = useAppKitAccount()
  const { address: signerAddress } = appkitAccountInfo || {}
  const { walletProvider } = useAppKitProvider('eip155')

  const errorHandler = useSelector(selectErrorHandler)
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

  useEffect(() => {
    setBalance(0)
  }, [sourceChain])

  useEffect(() => {
    ;(async () => {
      if (!tokenAddress || !isEVMChain(sourceChain) || !walletProvider) return
      try {
        const provider = new ethers.providers.Web3Provider(
          walletProvider as ExternalProvider | JsonRpcFetchFunc
        )
        const signer = provider.getSigner()
        if (!signer || !signerAddress) return

        const erc20Contract = new Contract(tokenAddress, ERC20ABI.abi, signer)
        const [decimals, userBalance] = await Promise.all([
          erc20Contract.decimals(),
          erc20Contract.balanceOf(signerAddress)
        ])

        setBalance(+formatUnits(userBalance, decimals))
      } catch (error) {
        errorHandler(error)
      }
    })()
  }, [signerAddress, tokenAddress, sourceChain, walletProvider])

  return useMemo(() => ({ balance }), [balance])
}
