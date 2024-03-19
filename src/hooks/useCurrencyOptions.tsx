import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchWrapper } from '../helpers/fetch-wrapper'
import {
  selectNodeProviderQuery,
  selectSourceChain,
  selectTargetChain
} from '../store/selectors'
import { ChainName } from '../utils/constants'

export default function useCurrencyOptions() {
  const [options, setOptions] = useState('USDK')
  const nodeProviderQuery = useSelector(selectNodeProviderQuery)
  const originNetwork = useSelector(selectSourceChain)
  const targetNetwork = useSelector(selectTargetChain)

  useEffect(() => {
    if (!nodeProviderQuery || !originNetwork || !targetNetwork) return
    ;(async function () {
      try {
        if (
          originNetwork === ChainName.FIAT ||
          targetNetwork === ChainName.FIAT
        ) {
          setOptions('KEUR')
          return
        }
        const coins: any = await fetchWrapper.get(
          `${nodeProviderQuery}/kima-finance/kima-blockchain/chains/get_currencies/${originNetwork}/${targetNetwork}`
        )

        setOptions(coins.Currencies?.length ? coins.Currencies[0] : 'USDK')
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
