import React, { useState, useMemo, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectMode,
  selectNetworks,
  selectSourceChain,
  selectTargetChain,
  selectTheme
} from '@store/selectors'
import {
  setSourceChain,
  setSourceCurrency,
  setTargetChain,
  setTargetAddress
} from '@store/optionSlice'
import Arrow from '@assets/icons/Arrow'
import ChainIcon from '../reusable/ChainIcon'
import {
  isEVMChain,
  lightDemoAccounts,
  lightDemoNetworks
} from '@utils/constants'
import { useKimaContext } from 'src/KimaProvider'
import {
  ChainCompatibility,
  ChainData,
  ChainLocation
} from '@plugins/pluginTypes'
import { ModeOptions } from '@interface'
import log from '@utils/logger'
import { isSolana, isTron } from 'src/helpers/functions'
import { WarningIcon } from '@assets/icons'
interface NetworkSelectorProps {
  type: ChainLocation // Determines if this is a source or target selector
  initialSelection: boolean
  setInitialSelection: React.Dispatch<
    React.SetStateAction<{
      sourceSelection: boolean
      targetSelection: boolean
    }>
  >
}

type DemoChainKey = keyof typeof lightDemoAccounts

const NetworkSelector: React.FC<NetworkSelectorProps> = ({
  type,
  initialSelection,
  setInitialSelection
}) => {
  const [collapsed, setCollapsed] = useState(true)
  const ref = useRef<HTMLDivElement | null>(null)

  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const networkOptions = useSelector(selectNetworks)
  const mode = useSelector(selectMode)
  const sourceNetwork = useSelector(selectSourceChain)
  const targetNetwork = useSelector(selectTargetChain)
  const { switchChainHandler } = useKimaContext()

  const isOriginSelector = type === 'origin'

  const networks = useMemo(() => {
    return networkOptions.filter((network: ChainData) => {
      const isSameAsSource = isOriginSelector
        ? false
        : network.shortName === sourceNetwork.shortName

      const isAllowedInLightMode =
        mode !== ModeOptions.light ||
        lightDemoNetworks.includes(network.shortName)

      return (
        network.supportedLocations.includes(type) &&
        !isSameAsSource &&
        isAllowedInLightMode
      )
    })
  }, [networkOptions, sourceNetwork, type, mode])

  const selectedNetwork = useMemo(() => {
    if (initialSelection) {
      return {
        shortName: '',
        name: isOriginSelector
          ? 'Select Source Network'
          : 'Select Target Network'
      }
    }

    const selected = isOriginSelector ? sourceNetwork : targetNetwork
    return (
      networks.find((network: ChainData) => network.id === selected?.id) || {
        shortName: '',
        name: isOriginSelector
          ? 'Select Source Network'
          : 'Select Target Network'
      }
    )
  }, [
    networks,
    sourceNetwork,
    targetNetwork,
    isOriginSelector,
    initialSelection
  ])

  //
  useEffect(() => {
    if (!networks.length || selectedNetwork.shortName) return

    // Fallback to the first available network if none is selected
    const fallbackNetwork = networks[0]
    if (isOriginSelector) {
      dispatch(setSourceChain(fallbackNetwork))
    } else {
      dispatch(setTargetChain(fallbackNetwork))
    }
  }, [networks, selectedNetwork, isOriginSelector, dispatch])

  const handleNetworkChange = (chain: ChainData) => {
    log.debug('NetworkSelector: Handling network change', chain)
    const newCurrency = chain.supportedTokens[0]?.symbol ?? ''
    if (isOriginSelector) {
      if (chain.id !== sourceNetwork.id) {
        log.debug('NetworkSelector: Setting source chain and currency to:', {
          chain: chain.shortName,
          currency: newCurrency
        })
        dispatch(setSourceChain(chain))
        dispatch(setSourceCurrency(newCurrency))
        switchChainHandler && switchChainHandler(chain)
      }
    } else {
      dispatch(setTargetChain(chain))
      const chainCompatibility: DemoChainKey =
        chain.compatibility === ChainCompatibility.EVM
          ? 'EVM'
          : (chain.shortName as DemoChainKey)

      if (mode === ModeOptions.light) {
        // console.log('dispatching target address from network selector..')
        dispatch(setTargetAddress(lightDemoAccounts[chainCompatibility]))
      }
    }

    type === 'origin'
      ? setInitialSelection((prev) => ({ ...prev, sourceSelection: false }))
      : setInitialSelection((prev) => ({ ...prev, targetSelection: false }))
    setCollapsed(true) // Explicitly collapse the dropdown after selection
  }

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setCollapsed(true)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  useEffect(() => {
    if (mode !== ModeOptions.light) return

    if (isEVMChain(targetNetwork.shortName)) {
      dispatch(setTargetAddress(lightDemoAccounts.EVM))
    } else if (isSolana(targetNetwork.shortName)) {
      dispatch(setTargetAddress(lightDemoAccounts.SOL))
    } else if (isTron(targetNetwork.shortName)) {
      dispatch(setTargetAddress(lightDemoAccounts.TRX))
    }
  }, [sourceNetwork, targetNetwork, mode])

  return (
    <div
      className={`network-dropdown ${theme?.colorMode ?? ''} ${
        collapsed ? 'collapsed' : 'toggled'
      }`}
      onClick={() => setCollapsed((prev) => !prev)}
      ref={ref}
    >
      <div className='network-wrapper'>
        <ChainIcon symbol={selectedNetwork.shortName} />
        <span>{selectedNetwork.name}</span>
      </div>
      <div
        className={`network-menu custom-scrollbar ${theme?.colorMode ?? ''} ${
          collapsed ? 'collapsed' : 'toggled'
        }`}
      >
        {networks
          .filter((network) => network.shortName !== selectedNetwork.shortName)
          .map((network) => (
            <div
              key={network.id}
              className={`network-menu-item ${theme?.colorMode ?? ''} ${network.disabled ? 'disabled has-tooltip' : 'enabled'}`}
              onClick={(e) => {
                e.stopPropagation()
                if (!network.disabled) {
                  handleNetworkChange(network)
                }
              }}
            >
              {network.disabled ? (
                <WarningIcon width={25} height={25} />
              ) : (
                <ChainIcon symbol={network.shortName} />
              )}
              <p>{network.name}</p>
              {network.disabled && <span className="tooltip">Temporarily unavailable</span>}
            </div>
          ))}
      </div>
      <div className={`dropdown-icon ${collapsed ? 'toggled' : 'collapsed'}`}>
        <Arrow fill='none' />
      </div>
    </div>
  )
}

export default React.memo(NetworkSelector)
