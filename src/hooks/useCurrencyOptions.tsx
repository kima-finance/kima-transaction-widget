import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import {
  selectBackendUrl,
  selectMode,
  selectSourceChain,
  selectTargetChain,
  selectTransactionOption
} from '../store/selectors'
import { useDispatch } from 'react-redux'
import { ModeOptions } from '../interface'
import { setSourceCurrency, setTargetCurrency } from '../store/optionSlice'
import { useChainData } from './useChainData'

export default function useCurrencyOptions(isSourceChain: boolean) {
  const dispatch = useDispatch()
  const mode = useSelector(selectMode)
  const sourceChain = useSelector(selectSourceChain)
  const targetChain = useSelector(selectTargetChain)
  const chainName = isSourceChain ? sourceChain : targetChain
  const transactionOption = useSelector(selectTransactionOption)

  const backendUrl = useSelector(selectBackendUrl)
  const { data: chains } = useChainData(backendUrl, chainName)

  const output = useMemo(() => {
    return !!chains
      ? { tokenList: chains[0].supportedTokens }
      : { tokenList: [] }
  }, [chains])
  const { tokenList } = output

  useEffect(() => {
    // set the defualt currency when the chain changes
    // should never set the target currency in payment mode
    if (!tokenList.length) return
    if (mode === ModeOptions.payment && !isSourceChain) return

    const [firstToken] = tokenList
    if (isSourceChain) {
      dispatch(setSourceCurrency(firstToken.symbol))
    } else {
      dispatch(setTargetCurrency(firstToken.symbol))
    }
  }, [tokenList, transactionOption, isSourceChain])

  return output
}
