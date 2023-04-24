import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Contract } from '@ethersproject/contracts'
import { formatUnits } from '@ethersproject/units'
import { ChainName, networkOptions } from '../utils/constants'
import ERC20ABI from '../utils/ethereum/erc20ABI.json'
import { selectCurrencyOptions, selectErrorHandler } from '../store/selectors'
import { JsonRpcProvider } from '@ethersproject/providers'

export default function useBalanceLightMode({
  chain,
  address
}: {
  chain: ChainName
  address: string
}) {
  const [balance, setBalance] = useState<number | undefined>()
  const errorHandler = useSelector(selectErrorHandler)
  const selectedCoin = useSelector(selectCurrencyOptions)
  const tokenAddress = useMemo(() => {
    return selectedCoin.address[chain]
  }, [selectedCoin, chain])
  const providerUrl = useMemo(() => {
    const idx = networkOptions.findIndex((network) => network.id === chain)
    return idx >= 0 ? networkOptions[idx].providerUrl : null
  }, [networkOptions, chain])

  useEffect(() => {
    ;(async () => {
      try {
        console.log(tokenAddress, providerUrl, address)
        if (!tokenAddress || !providerUrl || !address) return

        const provider = new JsonRpcProvider(providerUrl)
        const erc20Contract = new Contract(tokenAddress, ERC20ABI.abi, provider)
        const decimals = await erc20Contract.decimals()
        const userBalance = await erc20Contract.balanceOf(address)

        console.log('userBalance', userBalance)
        setBalance(+formatUnits(userBalance, decimals))
      } catch (error) {
        console.log('error', error)
        errorHandler(error)
      }
    })()
  }, [tokenAddress, providerUrl, address])

  return useMemo(
    () => ({
      balance
    }),
    [balance]
  )
}
