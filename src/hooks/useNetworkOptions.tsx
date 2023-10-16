import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchWrapper } from '../helpers/fetch-wrapper'
import { DAppOptions } from '../interface'
import {
  selectDappOption,
  selectMode,
  selectNodeProviderQuery,
  selectUseFIAT
} from '../store/selectors'
import { ChainName, networkOptions } from '../utils/constants'

export default function useNetworkOptions() {
  const mode = useSelector(selectMode)
  const dAppOption = useSelector(selectDappOption)
  const useFIAT = useSelector(selectUseFIAT)
  const nodeProviderQuery = useSelector(selectNodeProviderQuery)
  const [options, setOptions] = useState<Array<any>>(networkOptions)

  useEffect(() => {
    if (!nodeProviderQuery) return
    if (dAppOption === DAppOptions.None) {
      ;(async function () {
        try {
          const networks: any = await fetchWrapper.get(
            `${nodeProviderQuery}/kima-finance/kima-blockchain/kima/get_chains`
          )

          setOptions(
            networkOptions.filter(
              (network) =>
                networks.Chains.findIndex((id: any) => id === network.id) >=
                  0 ||
                (network.id === ChainName.FIAT && useFIAT)
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
  }, [nodeProviderQuery, dAppOption, mode])

  return useMemo(
    () => ({
      options
    }),
    [options]
  )
}
