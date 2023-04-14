import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchWrapper } from '../helpers/fetch-wrapper'
import { DAppOptions } from '../interface'
import {
  selectDappOption,
  selectLightModeOption,
  selectMode,
  selectNodeProviderQuery
} from '../store/selectors'
import { networkOptions } from '../utils/constants'

export default function useNetworkOptions() {
  const mode = useSelector(selectMode)
  const dAppOption = useSelector(selectDappOption)
  const lightModeOption = useSelector(selectLightModeOption)
  const nodeProviderQuery = useSelector(selectNodeProviderQuery)
  const [options, setOptions] = useState<Array<any>>(networkOptions)

  useEffect(() => {
    if (!nodeProviderQuery) return
    if (
      dAppOption === DAppOptions.None ||
      dAppOption === DAppOptions.LightDemo
    ) {
      ;(async function () {
        try {
          const networks: any = await fetchWrapper.get(
            `${nodeProviderQuery}/kima-finance/kima/kima/getChains`
          )

          setOptions(
            networkOptions.filter(
              (network) =>
                networks.Chains.findIndex((id: any) => id === network.id) >=
                  0 &&
                (lightModeOption && dAppOption === DAppOptions.LightDemo
                  ? lightModeOption.chains.findIndex(
                      (id: any) => id === network.id
                    ) >= 0
                  : true)
            )
          )
        } catch (e) {
          console.log('rpc disconnected', e)
        }
      })()
    } else if (dAppOption === DAppOptions.G$) {
      setOptions(
        networkOptions.filter(
          (network) => network.label === 'Fuse' || network.label === 'Celo'
        )
      )
    }
  }, [nodeProviderQuery, dAppOption, lightModeOption, mode])

  return useMemo(
    () => ({
      options
    }),
    [options]
  )
}
