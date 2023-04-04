import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ChainName } from '../../utils/constants'
import {
  selectDappOption,
  selectMode,
  selectNodeProviderQuery,
  selectOriginNetwork,
  selectSwitchChainHandler,
  selectTargetNetwork,
  selectTheme,
  selectUseFIAT
} from '../../store/selectors'
import {
  setBankPopup,
  setOriginNetwork,
  setServiceFee,
  setTargetNetwork
} from '../../store/optionSlice'
import useNetworkOptions from '../../hooks/useNetworkOptions'
import { DAppOptions, ModeOptions } from '../../interface'
import { fetchWrapper } from '../../helpers/fetch-wrapper'
import { BankIcon } from '../../assets/icons'
import { CHAIN_NAMES_TO_IDS } from '../../utils/constants'

const NetworkDropdown = React.memo(
  ({ isOriginChain = true }: { isOriginChain?: boolean }) => {
    const [collapsed, setCollapsed] = useState(true)
    const [availableNetworks, setAvailableNetworks] = useState<
      Array<ChainName>
    >([])
    const ref = useRef<any>()
    const sourceChangeRef = useRef<boolean>(false)
    const mode = useSelector(selectMode)
    const useFIAT = useSelector(selectUseFIAT)
    const dAppOption = useSelector(selectDappOption)
    const switchChainHandler = useSelector(selectSwitchChainHandler)
    const originNetwork = useSelector(selectOriginNetwork)
    const targetNetwork = useSelector(selectTargetNetwork)
    const nodeProviderQuery = useSelector(selectNodeProviderQuery)
    const { options: networkOptions } = useNetworkOptions()
    const selectedNetwork = useMemo(() => {
      const index = networkOptions.findIndex(
        (option) =>
          option.id === (isOriginChain ? originNetwork : targetNetwork)
      )
      if (index >= 0) return networkOptions[index]
      return networkOptions[0]
    }, [originNetwork, targetNetwork, networkOptions])
    const networks = useMemo(() => {
      if (isOriginChain && mode === ModeOptions.bridge) {
        return networkOptions
      }

      return networkOptions.filter(
        (network) =>
          availableNetworks.findIndex((id: any) => id === network.id) >= 0
      )
    }, [networkOptions, isOriginChain, availableNetworks])
    const theme = useSelector(selectTheme)
    const dispatch = useDispatch()

    useEffect(() => {
      if (!nodeProviderQuery || mode !== ModeOptions.bridge) return
      ;(async function () {
        try {
          const networks: any = await fetchWrapper.get(
            `${nodeProviderQuery}/kima-finance/kima/kima/get_available_chains/${originNetwork}`
          )

          setAvailableNetworks(networks.Chains)
          if (isOriginChain && !targetNetwork) {
            dispatch(setTargetNetwork(networks.Chains[0]))
          }
          if (sourceChangeRef.current) {
            sourceChangeRef.current = false
            dispatch(setTargetNetwork(networks.Chains[0]))
          }
        } catch (e) {
          console.log('rpc disconnected', e)
        }
      })()
    }, [nodeProviderQuery, originNetwork, targetNetwork, mode, isOriginChain])

    useEffect(() => {
      if (!nodeProviderQuery || mode !== ModeOptions.payment) return
      ;(async function () {
        try {
          const networks: any = await fetchWrapper.get(
            `${nodeProviderQuery}/kima-finance/kima/kima/get_available_chains/${targetNetwork}`
          )

          setAvailableNetworks(networks.Chains)
        } catch (e) {
          console.log('rpc disconnected', e)
        }
      })()
    }, [nodeProviderQuery, mode])

    useEffect(() => {
      const bodyMouseDowntHandler = (e: any) => {
        if (ref?.current && !ref.current.contains(e.target)) {
          setCollapsed(true)
        }
      }

      document.addEventListener('mousedown', bodyMouseDowntHandler)
      return () => {
        document.removeEventListener('mousedown', bodyMouseDowntHandler)
      }
    }, [setCollapsed])

    return (
      <div
        className={`network-dropdown ${theme.colorMode} ${
          collapsed ? 'collapsed' : ''
        }`}
        onClick={() => setCollapsed((prev) => !prev)}
        ref={ref}
      >
        <div className='network-wrapper'>
          {<selectedNetwork.icon />}
          {selectedNetwork.label}
        </div>
        <div
          className={`network-menu custom-scrollbar ${theme.colorMode} ${
            collapsed ? 'collapsed' : ''
          }`}
        >
          {networks.map((network) => (
            <div
              className='network-menu-item'
              key={network.label}
              onClick={async () => {
                if (isOriginChain) {
                  if (dAppOption === DAppOptions.G$) {
                    if (network.id !== originNetwork)
                      switchChainHandler(CHAIN_NAMES_TO_IDS[network.id])
                  } else {
                    dispatch(setOriginNetwork(network.id))
                  }
                  sourceChangeRef.current = true
                } else {
                  dispatch(setTargetNetwork(network.id))
                  dispatch(setServiceFee(-1))
                }
              }}
            >
              {<network.icon />}
              <p>{network.label}</p>
            </div>
          ))}
          {useFIAT ? (
            <div
              className='network-menu-item'
              onClick={() => {
                dispatch(setBankPopup(true))
              }}
            >
              <BankIcon />
              <p>pay with FIAT</p>
            </div>
          ) : null}
        </div>
      </div>
    )
  }
)

export default NetworkDropdown
