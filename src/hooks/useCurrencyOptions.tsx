import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import {
  selectMode,
  selectSourceChain,
  selectSourceCurrency,
  selectTargetChain,
  selectTransactionOption
} from '../store/selectors'
import { useDispatch } from 'react-redux'
import { ModeOptions } from '../interface'
import { setSourceCurrency, setTargetCurrency } from '../store/optionSlice'
import { ChainToken } from '@widget/plugins/pluginTypes'
import log from '@widget/utils/logger'

const emptyTokenList = { tokenList: [] as ChainToken[] }

export default function useCurrencyOptions(isSourceChain: boolean) {
  const dispatch = useDispatch()
  const mode = useSelector(selectMode)
  const sourceChain = useSelector(selectSourceChain)
  const sourceSymbol = useSelector(selectSourceCurrency)
  const targetChain = useSelector(selectTargetChain)
  const transactionOption = useSelector(selectTransactionOption)

  const output = useMemo(() => {
    const chain = isSourceChain ? sourceChain : targetChain
    const location = isSourceChain ? 'origin' : 'target'

    // nothing selected
    if (!chain) {
      log.debug(`useCurrencyOptions(${location}): no chain selected`, {
        chain,
        sourceSymbol
      })
      return emptyTokenList
    }

    // source chain: always return all tokens for the source chain
    if (isSourceChain) return { tokenList: chain.supportedTokens }

    // target chain: no source chain selected, just return all tokens
    if (!sourceSymbol) {
      log.debug(`useCurrencyOptions(${location}): no sourceSymbol selected`, {
        chain,
        sourceSymbol
      })
      return { tokenList: chain.supportedTokens }
    }

    // filter the tokens for the target chain based on the selected source token
    const sourceToken = sourceChain.supportedTokens.find(
      (t) => t.symbol === sourceSymbol
    )
    if (!sourceToken) {
      log.debug(
        `useCurrencyOptions(${location}): source token ${sourceSymbol ?? 'undefined'} not found`,
        { sourceChain, sourceSymbol }
      )
      return { tokenList: chain.supportedTokens }
    }

    // currently both source and target tokens must be pegged to the same currency
    const tokenList = chain.supportedTokens.filter(
      (token) => token.peggedTo === sourceToken.peggedTo
    )
    log.debug(`useCurrencyOptions(${location}): updated token list `, {
      tokenList,
      sourceSymbol,
      sourceToken,
      chain
    })

    return { tokenList }
  }, [sourceChain, sourceSymbol, targetChain, isSourceChain])
  const { tokenList } = output

  useEffect(() => {
    // set the defualt currency when the chain changes
    // should never set the target currency in payment mode
    if (!tokenList.length) return
    if (mode === ModeOptions.payment && !isSourceChain) return

    const [firstToken] = tokenList
    log.debug(
      `useCurrencyOptions: seting default currency to ${firstToken.symbol}`
    )
    if (isSourceChain) {
      dispatch(setSourceCurrency(firstToken.symbol))
    } else {
      dispatch(setTargetCurrency(firstToken.symbol))
    }
  }, [tokenList, transactionOption, isSourceChain])

  return output
}
