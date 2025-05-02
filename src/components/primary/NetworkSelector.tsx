import React, { useState, useMemo, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectExcludedSourceNetworks,
  selectExcludedTargetNetworks,
  selectMode,
  selectNetworks,
  selectSourceChain,
  selectTargetChain,
  selectTheme
} from '@store/selectors'
import {
  setSourceChain,
  setTargetAddress,
  setTargetChain
} from '@store/optionSlice'
import Arrow from '@assets/icons/Arrow'
import ChainIcon from '../reusable/ChainIcon'
import {
  ChainName,
  lightDemoAccounts,
  lightDemoNetworks
} from '@utils/constants'
import { useKimaContext } from 'src/KimaProvider'
import { ChainCompatibility, ChainData } from '@plugins/pluginTypes'
import { ModeOptions } from '@interface'

interface NetworkSelectorProps {
  type: 'source' | 'target' // Determines if this is a source or target selector
  initialSelection: boolean,
  setInitialSelection: React.Dispatch<React.SetStateAction<boolean>>
}

type DemoChainKey = keyof typeof lightDemoAccounts

const NetworkSelector: React.FC<NetworkSelectorProps> = ({ type, initialSelection, setInitialSelection }) => {
  const [collapsed, setCollapsed] = useState(true)
  const ref = useRef<HTMLDivElement | null>(null)

  const dispatch = useDispatch()
  const mode = useSelector(selectMode)
  const theme = useSelector(selectTheme)
  const networkOptions = useSelector(selectNetworks)
  const sourceNetwork = useSelector(selectSourceChain)
  const targetNetwork = useSelector(selectTargetChain)
  const excludedSourceNetworks = useSelector(selectExcludedSourceNetworks)
  const excludedTargetNetworks = useSelector(selectExcludedTargetNetworks)
  const { switchChainHandler } = useKimaContext()

  const isSourceSelector = type === 'source'

  // Filter networks based on the type (source/target)
  const networks = useMemo(() => {
    let filteredNetworks = networkOptions

    if (mode === ModeOptions.light) {
      filteredNetworks = filteredNetworks.filter((network) =>
        lightDemoNetworks.includes(network.shortName)
      )
    }

    if (isSourceSelector) {
      return filteredNetworks.filter(
        (network: ChainData) =>
          !excludedSourceNetworks.includes(network.shortName as ChainName) &&
          network.shortName !== 'BERA' // temporarily disabled
      )
    }

    return filteredNetworks.filter(
      (network: ChainData) =>
        network.shortName !== sourceNetwork.shortName &&
        !excludedTargetNetworks.includes(network.shortName as ChainName)
    )
  }, [
    networkOptions,
    mode,
    sourceNetwork,
    isSourceSelector,
    excludedSourceNetworks,
    excludedTargetNetworks
  ])

  const selectedNetwork = useMemo(() => {
    if (initialSelection && mode === ModeOptions.light) {
      return {
        shortName: '',
        name: isSourceSelector
          ? 'Select Source Network'
          : 'Select Target Network'
      }
    }

    const selected = isSourceSelector ? sourceNetwork : targetNetwork
    return (
      networks.find((network: ChainData) => network.id === selected.id) || {
        shortName: '',
        name: isSourceSelector
          ? 'Select Source Network'
          : 'Select Target Network'
      }
    )
  }, [
    networks,
    sourceNetwork,
    targetNetwork,
    isSourceSelector,
    initialSelection
  ])

  useEffect(() => {
    if (!networks.length || selectedNetwork.shortName) return

    // Fallback to the first available network if none is selected
    const fallbackNetwork = networks[0]
    if (isSourceSelector) {
      dispatch(setSourceChain(fallbackNetwork))
    } else {
      dispatch(setTargetChain(fallbackNetwork))
    }
  }, [networks, selectedNetwork, isSourceSelector, dispatch])

  const handleNetworkChange = (chain: ChainData) => {
    if (isSourceSelector) {
      if (chain.id !== sourceNetwork.id) {
        dispatch(setSourceChain(chain))
        switchChainHandler && switchChainHandler(chain)
      }
    } else {
      if (chain.shortName !== targetNetwork.shortName) {
        dispatch(setTargetChain(chain))
        const chainCompatibility: DemoChainKey =
          chain.compatibility === ChainCompatibility.EVM
            ? 'EVM'
            : (chain.shortName as DemoChainKey)

        if (mode === ModeOptions.light)
          dispatch(setTargetAddress(lightDemoAccounts[chainCompatibility]))
      }
    }
    setInitialSelection(false)
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
              className={`network-menu-item ${theme?.colorMode ?? ''}`}
              onClick={(e) => {
                e.stopPropagation() // Prevent the dropdown toggle click
                handleNetworkChange(network)
              }}
            >
              <ChainIcon symbol={network.shortName} />
              <p>{network.name}</p>
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
