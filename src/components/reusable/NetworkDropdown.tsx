import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ChainName } from '../../utils/constants'
import {
  selectDappOption,
  selectMode,
  selectNodeProviderQuery,
  selectSourceChain,
  selectTargetChain,
  selectTheme,
  selectUseFIAT,
  selectWalletAutoConnect
} from '../../store/selectors'
import {
  setSourceChain,
  setServiceFee,
  setTargetChain,
  setTargetChainFetching
} from '../../store/optionSlice'
import useNetworkOptions from '../../hooks/useNetworkOptions'
import { DAppOptions, ModeOptions } from '../../interface'
import { fetchWrapper } from '../../helpers/fetch-wrapper'
import toast from 'react-hot-toast'
import Arrow from '../../assets/icons/Arrow'

const NetworkDropdown = React.memo(
  ({ isSourceChain = true }: { isSourceChain?: boolean }) => {
    const [collapsed, setCollapsed] = useState(true)
    const [availableNetworks, setAvailableNetworks] = useState<
      Array<ChainName>
    >([])
    const ref = useRef<any>()
    const sourceChangeRef = useRef<boolean>(false)
    const mode = useSelector(selectMode)
    const autoSwitchChain = useSelector(selectWalletAutoConnect)
    const useFIAT = useSelector(selectUseFIAT)
    const dAppOption = useSelector(selectDappOption)
    const originNetwork = useSelector(selectSourceChain)
    const targetNetwork = useSelector(selectTargetChain)
    const nodeProviderQuery = useSelector(selectNodeProviderQuery)
    const { options: networkOptions } = useNetworkOptions()
    const selectedNetwork = useMemo(() => {
      const index = networkOptions.findIndex(
        (option) =>
          option.id === (isSourceChain ? originNetwork : targetNetwork)
      )
      if (index >= 0) return networkOptions[index]
      return networkOptions[3]
    }, [originNetwork, targetNetwork, networkOptions])

    const networks = useMemo(() => {
      if (isSourceChain && mode === ModeOptions.bridge) {
        return networkOptions
      }

      return networkOptions.filter(
        (network) =>
          availableNetworks.findIndex((id: any) => id === network.id) >= 0
      )
    }, [
      networkOptions,
      isSourceChain,
      availableNetworks,
      dAppOption,
      originNetwork
    ])
    const theme = useSelector(selectTheme)
    const dispatch = useDispatch()

    useEffect(() => {
      if (!nodeProviderQuery || mode !== ModeOptions.bridge) return
      ;(async function () {
        try {
          let chains: ChainName[] = []
          if (originNetwork === ChainName.FIAT) {
            chains = [ChainName.ETHEREUM, ChainName.POLYGON]
          } else {
            const networks: any = await fetchWrapper.get(
              `${nodeProviderQuery}/kima-finance/kima-blockchain/chains/get_available_chains/${originNetwork}`
            )

            chains = networks.Chains
            if (useFIAT) chains.push(ChainName.FIAT)
          }

          setAvailableNetworks(chains)

          if (isSourceChain && !targetNetwork) {
            dispatch(setTargetChain(chains[0]))
          }

          if (sourceChangeRef.current) {
            sourceChangeRef.current = false
            dispatch(
              setTargetChain(
                chains.findIndex((chain) => chain === targetNetwork) < 0 ||
                  targetNetwork === originNetwork
                  ? chains[0]
                  : targetNetwork
              )
            )
            dispatch(setTargetChainFetching(false))
          }
        } catch (e) {
          console.log('rpc disconnected', e)
          toast.error('rpc disconnected')
        }
      })()
    }, [
      nodeProviderQuery,
      originNetwork,
      targetNetwork,
      mode,
      isSourceChain,
      useFIAT
    ])

    useEffect(() => {
      if (!nodeProviderQuery || mode !== ModeOptions.payment) return
      ;(async function () {
        try {
          if (
            dAppOption === DAppOptions.LPAdd ||
            dAppOption === DAppOptions.LPDrain
          ) {
            setAvailableNetworks([targetNetwork as ChainName])
          } else {
            if (targetNetwork === ChainName.FIAT) {
              setAvailableNetworks([ChainName.ETHEREUM, ChainName.POLYGON])
              return
            }

            const networks: any = await fetchWrapper.get(
              `${nodeProviderQuery}/kima-finance/kima-blockchain/chains/get_available_chains/${targetNetwork}`
            )

            setAvailableNetworks(networks.Chains)
          }
        } catch (e) {
          console.log('rpc disconnected', e)
          toast.error('rpc disconnected')
        }
      })()
    }, [nodeProviderQuery, mode, targetNetwork, dAppOption])

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
          collapsed ? 'collapsed' : 'toggled'
        }`}
        onClick={() => {
          if (!autoSwitchChain && isSourceChain) return
          setCollapsed((prev) => !prev)
        }}
        ref={ref}
      >
        <div className='network-wrapper'>
          <div className='icon'>{<selectedNetwork.icon />}</div>
          <span>{selectedNetwork.label}</span>
        </div>
        <div
          className={`network-menu ${networks.length > 1 && 'custom-scrollbar'} ${theme.colorMode} ${
            collapsed ? 'collapsed' : 'toggled'
          }`}
        >
          {networks.map((network) => (
            <div
              className={`network-menu-item ${theme.colorMode}`}
              key={network.label}
              onClick={async () => {
                if (isSourceChain) {
                  dispatch(setTargetChainFetching(true))
                  dispatch(setSourceChain(network.id))
                  sourceChangeRef.current = true
                } else {
                  dispatch(setTargetChain(network.id))
                  dispatch(setServiceFee(-1))
                }
              }}
            >
              <div className='icon'>{<network.icon />}</div>
              <p>{network.label}</p>
            </div>
          ))}
          {/* {useFIAT ? (
            <div
              className='network-menu-item'
              onClick={() => {
                dispatch(setBankPopup(true))
              }}
            >
              <BankIcon />
              <p>pay with FIAT</p>
            </div>
          ) : null} */}
        </div>
        <div className={`dropdown-icon ${collapsed ? 'toggled' : 'collapsed'}`}>
          <Arrow fill='none'/>
        </div>
      </div>
    )
  }
)

export default NetworkDropdown
