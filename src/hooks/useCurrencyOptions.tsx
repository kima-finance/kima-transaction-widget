import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import {
  selectBackendUrl,
  selectMode,
  selectSourceChain,
  selectTransactionOption
} from '../store/selectors'
import { useDispatch } from 'react-redux'
import { ModeOptions } from '../interface'
import { setSourceCurrency, setTargetCurrency } from '../store/optionSlice'
import { useChainData } from './useChainData'

export default function useCurrencyOptions() {
  const dispatch = useDispatch()
  const mode = useSelector(selectMode)
  const transactionOption = useSelector(selectTransactionOption)
  const originNetwork = useSelector(selectSourceChain)

  const backendUrl = useSelector(selectBackendUrl)
  const { data: chains } = useChainData(backendUrl, originNetwork)

  const output = useMemo(() => {
    console.log('using currency options...')
    return !!chains
      ? { tokenList: chains[0].supportedTokens }
      : { tokenList: [] }
  }, [chains])
  const { tokenList } = output

  useEffect(() => {
    if (
      !originNetwork ||
      (!transactionOption && mode === ModeOptions.payment) ||
      !tokenList.length
    ) {
      return
    }

    if (
      transactionOption?.currency &&
      tokenList?.findIndex(
        (item) => item.symbol === transactionOption.currency
      ) >= 0
    ) {
      dispatch(setSourceCurrency(transactionOption.currency))
      dispatch(setTargetCurrency(transactionOption.currency))
    } else {
      const [firstToken] = tokenList
      const firstTokenSymbol =
        firstToken.symbol === 'KIMAUSD' ? 'USDK' : firstToken.symbol
      dispatch(setSourceCurrency(firstTokenSymbol))
      dispatch(setTargetCurrency(firstTokenSymbol))
    }
  }, [originNetwork, tokenList, transactionOption, mode])

  return output
}
