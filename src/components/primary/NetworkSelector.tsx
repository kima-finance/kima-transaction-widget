import React, { useState, useMemo, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectNetworks,
  selectSourceChain,
  selectTargetChain,
  selectTheme
} from '@store/selectors'
import { setSourceChain, setTargetChain } from '@store/optionSlice'
import Arrow from '@assets/icons/Arrow'
import ChainIcon from '../reusable/ChainIcon'
import { useKimaContext } from 'src/KimaProvider'
import { ChainData, ChainLocation } from '@plugins/pluginTypes'

interface NetworkSelectorProps {
  type: ChainLocation // Determines if this is a source or target selector
}

const NetworkSelector: React.FC<NetworkSelectorProps> = ({ type }) => {
  const [collapsed, setCollapsed] = useState(true)
  const ref = useRef<HTMLDivElement | null>(null)

  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const networkOptions = useSelector(selectNetworks)
  const sourceNetwork = useSelector(selectSourceChain)
  const targetNetwork = useSelector(selectTargetChain)
  const { switchChainHandler } = useKimaContext()

  const isOriginSelector = type === 'origin'

  // Filter networks based on the type (source/target)
  const networks = useMemo(() => {
    return networkOptions.filter((network: ChainData) =>
      network.supportedLocations.includes(type)
    )
  }, [networkOptions, type])

  const selectedNetwork = useMemo(() => {
    const selected = isOriginSelector ? sourceNetwork : targetNetwork
    return (
      networks.find((network: ChainData) => network.id === selected.id) || {
        shortName: '',
        name: isOriginSelector
          ? 'Select Source Network'
          : 'Select Target Network'
      }
    )
  }, [networks, sourceNetwork, targetNetwork, isOriginSelector])

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
    if (isOriginSelector) {
      if (chain.id !== sourceNetwork.id) {
        dispatch(setSourceChain(chain))
        switchChainHandler && switchChainHandler(chain)
      }
    } else {
      if (chain.shortName !== targetNetwork.shortName) {
        dispatch(setTargetChain(chain))
      }
    }
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
