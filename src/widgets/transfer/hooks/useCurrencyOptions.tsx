import { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import log from '@kima-widget/shared/logger'
import { ChainToken, ModeOptions } from '@kima-widget/shared/types'
import {
  selectMode,
  selectSourceChain,
  selectSourceCurrency,
  selectTargetChain,
  selectTargetCurrency
} from '@kima-widget/shared/store/selectors'
import {
  setSourceCurrency,
  setTargetCurrency
} from '@kima-widget/shared/store/optionSlice'

const emptyTokenList = { tokenList: [] as ChainToken[] }

/**
 * useCurrencyOptions
 *
 * - Shows ONLY the tokens valid for the current location (origin or target).
 * - If a token lacks `supportedLocations`, it is treated as valid for BOTH.
 * - Only assigns a default if:
 *   a) current symbol is empty, or
 *   b) current symbol is not in the latest tokenList (e.g., chain or location constraints changed).
 * - Never overwrites an explicit user selection.
 */
export default function useCurrencyOptions(isSourceChain: boolean) {
  const dispatch = useDispatch()
  const mode = useSelector(selectMode)
  const sourceChain = useSelector(selectSourceChain)
  const sourceSymbol = useSelector(selectSourceCurrency)
  const targetChain = useSelector(selectTargetChain)
  const targetSymbol = useSelector(selectTargetCurrency)

  const output = useMemo(() => {
    const chain = isSourceChain ? sourceChain : targetChain
    const location = isSourceChain ? 'origin' : 'target'

    if (!chain) {
      log.debug(`useCurrencyOptions(${location}): no chain selected`, {
        chain,
        sourceSymbol,
        targetSymbol
      })
      return emptyTokenList
    }

    // Filter by allowed locations; default to both when field is missing.
    const tokenList = (chain.supportedTokens ?? []).filter((t) => {
      const allowed = t.supportedLocations ?? ['origin', 'target']
      return allowed.includes(location)
    })

    log.debug(`useCurrencyOptions(${location}): token list`, {
      chainShortName: chain.shortName,
      tokenList
    })

    return { tokenList }
  }, [sourceChain, targetChain, isSourceChain, sourceSymbol, targetSymbol])

  const { tokenList } = output

  // Defaulting: only when necessary; never fight the user’s choice.
  useEffect(() => {
    if (!tokenList.length) return

    // Payment mode: keep behavior for SOURCE only, leave TARGET alone.
    if (mode === ModeOptions.payment && !isSourceChain) return

    const current = isSourceChain ? sourceSymbol : targetSymbol
    const stillValid = current
      ? tokenList.some((t) => t.symbol === current)
      : false

    if (stillValid) return

    // If empty or invalid for this chain/location, set a sane default (first token).
    const next = tokenList[0]?.symbol
    if (!next) return

    if (isSourceChain) {
      if (!current) {
        log.debug(
          `useCurrencyOptions: setting default SOURCE currency -> ${next}`
        )
        dispatch(setSourceCurrency(next))
      } else {
        log.debug(
          `useCurrencyOptions: SOURCE currency "${current}" not valid here; switching -> ${next}`
        )
        dispatch(setSourceCurrency(next))
      }
    } else {
      if (!current) {
        log.debug(
          `useCurrencyOptions: setting default TARGET currency -> ${next}`
        )
        dispatch(setTargetCurrency(next))
      } else {
        log.debug(
          `useCurrencyOptions: TARGET currency "${current}" not valid here; switching -> ${next}`
        )
        dispatch(setTargetCurrency(next))
      }
    }
  }, [tokenList, mode, isSourceChain, sourceSymbol, targetSymbol, dispatch])

  return output
}
