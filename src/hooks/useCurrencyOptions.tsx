import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchWrapper } from '../helpers/fetch-wrapper'
import {
  selectMode,
  selectNodeProviderQuery,
  selectSourceChain,
  selectTargetChain,
  selectTransactionOption
} from '../store/selectors'
import { ChainName } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { setSelectedToken } from '../store/optionSlice'
import toast from 'react-hot-toast'
import { ModeOptions } from '../interface'

export default function useCurrencyOptions() {
  const dispatch = useDispatch()
  const [tokenList, setTokenList] = useState<Array<string>>(['USDK'])
  const mode = useSelector(selectMode)
  const transactionOption = useSelector(selectTransactionOption)
  const nodeProviderQuery = useSelector(selectNodeProviderQuery)
  const originNetwork = useSelector(selectSourceChain)
  const targetNetwork = useSelector(selectTargetChain)

  useEffect(() => {
    if (
      !nodeProviderQuery ||
      !originNetwork ||
      !targetNetwork ||
      (!transactionOption && mode === ModeOptions.payment)
    )
      return
    ;(async function () {
      try {
        if (
          originNetwork === ChainName.FIAT ||
          targetNetwork === ChainName.FIAT
        ) {
          dispatch(setSelectedToken('KEUR'))
          return
        }
        const coins: any = await fetchWrapper.get(
          `${nodeProviderQuery}/kima-finance/kima-blockchain/chains/get_currencies/${originNetwork}/${targetNetwork}`
        )

        let _tokenList = coins.Currencies.map((coin: string) =>
          coin.toUpperCase()
        ) || ['USDK']
        if (
          originNetwork === ChainName.BTC ||
          targetNetwork === ChainName.BTC
        ) {
          _tokenList = ['WBTC']
        }

        if (
          transactionOption?.currency &&
          _tokenList.findIndex((item) => item === transactionOption.currency) >=
            0
        ) {
          dispatch(setSelectedToken(transactionOption.currency))
        } else {
          dispatch(setSelectedToken(_tokenList[0]))
        }
        setTokenList(_tokenList)
      } catch (e) {
        console.log('rpc disconnected', e)
        toast.error('rpc disconnected')
      }
    })()
  }, [nodeProviderQuery, originNetwork, targetNetwork, transactionOption, mode])

  return useMemo(
    () => ({
      tokenList
    }),
    [tokenList]
  )
}
