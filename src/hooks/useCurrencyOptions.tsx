import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchWrapper } from '../helpers/fetch-wrapper'
import {
  selectNodeProviderQuery,
  selectOriginNetwork,
  selectTargetNetwork
} from '../store/selectors'
import { COIN_LIST, ChainName } from '../utils/constants'

export default function useCurrencyOptions() {
  const [options, setOptions] = useState(COIN_LIST['USDK'])
  const nodeProviderQuery = useSelector(selectNodeProviderQuery)
  const originNetwork = useSelector(selectOriginNetwork)
  const targetNetwork = useSelector(selectTargetNetwork)

  useEffect(() => {
    if (!nodeProviderQuery || !originNetwork || !targetNetwork) return
    ;(async function () {
      try {
        if (
          originNetwork === ChainName.FIAT ||
          targetNetwork === ChainName.FIAT
        ) {
          setOptions(COIN_LIST['KEUR'])
          return
        }
        const coins: any = await fetchWrapper.get(
          `${nodeProviderQuery}/kima-finance/kima/getCurrencies/${originNetwork}/${targetNetwork}`
        )

        setOptions(
          COIN_LIST[coins.Currencies?.length ? coins.Currencies[0] : 'USDK']
        )
      } catch (e) {
        console.log('rpc disconnected', e)
      }
    })()
  }, [nodeProviderQuery, originNetwork, targetNetwork])

  return useMemo(
    () => ({
      options
    }),
    [options]
  )
}
