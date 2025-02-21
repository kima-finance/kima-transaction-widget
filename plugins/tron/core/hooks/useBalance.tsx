import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useWallet as useTronWallet } from '@tronweb3/tronwallet-adapter-react-hooks'

import {
  selectErrorHandler,
  selectSourceChain,
  selectTokenOptions,
  selectNetworkOption,
  selectSourceCurrency
} from '@store/selectors'
import { NetworkOptions } from '@interface'
import { isEmptyObject } from '../../helpers/functions'
import { tronWebTestnet, tronWebMainnet } from '../../tronweb'
import ERC20ABI from '../../utils/ethereum/erc20ABI.json'
import { formatUnits } from 'ethers'

export default function useBalance() {
  const [balance, setBalance] = useState<number>(0)
  const { address: tronAddress } = useTronWallet()

  const errorHandler = useSelector(selectErrorHandler)
  const sourceChain = useSelector(selectSourceChain)
  const sourceCurrency = useSelector(selectSourceCurrency)
  const tokenOptions = useSelector(selectTokenOptions)
  const networkOption = useSelector(selectNetworkOption)

  const tokenAddress = useMemo(() => {
    if (isEmptyObject(tokenOptions)) return ''
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
      if (!tokenAddress || sourceChain !== 'TRX' || !tronAddress) return
      const tronWeb =
        networkOption === NetworkOptions.mainnet
          ? tronWebMainnet
          : tronWebTestnet
      try {
        const trc20Contract = await tronWeb.contract(ERC20ABI.abi, tokenAddress)
        const [decimals, userBalance] = await Promise.all([
          trc20Contract.decimals().call(),
          trc20Contract.balanceOf(tronAddress).call()
        ])

        setBalance(+formatUnits(userBalance.balance, decimals))
      } catch (error) {
        errorHandler(error)
      }
    })()
  }, [tronAddress, tokenAddress, sourceChain, networkOption])

  return useMemo(() => ({ balance }), [balance])
}
