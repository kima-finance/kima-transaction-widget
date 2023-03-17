import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchWrapper } from '../helpers/fetch-wrapper'
import { DAppOptions } from '../interface'
import { selectDappOption, selectNodeProviderQuery } from '../store/selectors'
import { networkOptions } from '../utils/constants'

export default function useNetworkOptions() {
  const [options, setOptions] = useState<Array<any>>(networkOptions)
  const dAppOption = useSelector(selectDappOption)
  const nodeProviderQuery = useSelector(selectNodeProviderQuery)

  useEffect(() => {
    if (!nodeProviderQuery) return
    if (dAppOption === DAppOptions.None) {
      ;(async function () {
        try {
          const networks: any = await fetchWrapper.get(
            `${nodeProviderQuery}/kima-finance/kima/kima/getChains`
          )

          setOptions(
            networkOptions.filter(
              (network) =>
                networks.Chains.findIndex((id: any) => id === network.id) >= 0
            )
          )
        } catch (e) {
          console.log('rpc disconnected', e)
        }
      })()
    } else {
      setOptions(
        networkOptions.filter(
          (network) => network.label === 'Fuse' || network.label === 'Celo'
        )
      )
    }
  }, [nodeProviderQuery, dAppOption])

  return useMemo(
    () => ({
      options
    }),
    [options]
  )
}
