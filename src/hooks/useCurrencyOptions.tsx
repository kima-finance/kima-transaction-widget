import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import {
  selectBackendUrl,
  selectMode,
  selectNetworks,
  selectSourceChain,
  selectTargetChain,
  selectTransactionOption
} from '../store/selectors'
import { useDispatch } from 'react-redux'
import { ModeOptions } from '../interface'
import { setSourceCurrency, setTargetCurrency } from '../store/optionSlice'
import { ChainToken } from '@plugins/pluginTypes'
import log from '@utils/logger'

export default function useCurrencyOptions(isSourceChain: boolean) {
  const dispatch = useDispatch()
  const mode = useSelector(selectMode)
  const sourceChain = useSelector(selectSourceChain)
  const targetChain = useSelector(selectTargetChain)
  const chain = isSourceChain ? sourceChain : targetChain
  const transactionOption = useSelector(selectTransactionOption)
  const networks = useSelector(selectNetworks)

  const output = useMemo(() => {
    log.debug('useCurrencyOptions: networks: ', networks)
    const networkTokenList =
      networks.find((network) => network.id === chain.id) || networks[0]

    log.debug('useCurrencyOptions: networkTokenList: ', networkTokenList, chain)

    return !!networks
      ? { tokenList: networkTokenList?.supportedTokens as ChainToken[] }
      : { tokenList: [] }
  }, [networks, chain])
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
