import React, { useState, useMemo, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectExcludedSourceNetworks,
  selectExcludedTargetNetworks,
  selectNetworks,
  selectSourceChain,
  selectTargetChain,
  selectTheme
} from '@store/selectors'
import { setSourceChain, setTargetChain } from '@store/optionSlice'
import Arrow from '@assets/icons/Arrow'
import ChainIcon from '../reusable/ChainIcon'

interface NetworkSelectorProps {
  type: 'source' | 'target' // Determines if this is a source or target selector
}

const NetworkSelector: React.FC<NetworkSelectorProps> = ({ type }) => {
  const [collapsed, setCollapsed] = useState(true)
  const ref = useRef<HTMLDivElement | null>(null)

  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const networkOptions = useSelector(selectNetworks)
  const sourceNetwork = useSelector(selectSourceChain)
  const targetNetwork = useSelector(selectTargetChain)
  const excludedSourceNetworks = useSelector(selectExcludedSourceNetworks)
  const excludedTargetNetworks = useSelector(selectExcludedTargetNetworks)

  const isSourceSelector = type === 'source'

  // Filter networks based on the type (source/target)
  const networks = useMemo(() => {
    if (isSourceSelector) {
      return networkOptions.filter(
        (network) => !excludedSourceNetworks.includes(network.id)
      )
    }
    return networkOptions.filter(
      (network) =>
        network.id !== sourceNetwork &&
        !excludedTargetNetworks.includes(network.id)
    ) // Exclude source from target options
  }, [networkOptions, sourceNetwork, isSourceSelector, excludedSourceNetworks, excludedTargetNetworks])

  const selectedNetwork = useMemo(() => {
    const selectedId = isSourceSelector ? sourceNetwork : targetNetwork
    return (
      networks.find((network) => network.id === selectedId) || {
        id: '',
        label: isSourceSelector
          ? 'Select Source Network'
          : 'Select Target Network'
      }
    )
  }, [networks, sourceNetwork, targetNetwork, isSourceSelector])

  useEffect(() => {
    if (!networks.length || selectedNetwork.id) return

    // Fallback to the first available network if none is selected
    const fallbackNetwork = networks[0]
    if (isSourceSelector) {
      dispatch(setSourceChain(fallbackNetwork.id))
    } else {
      dispatch(setTargetChain(fallbackNetwork.id))
    }
  }, [networks, selectedNetwork, isSourceSelector, dispatch])

  const handleNetworkChange = (networkId: string) => {
    if (isSourceSelector) {
      if (networkId !== sourceNetwork) {
        dispatch(setSourceChain(networkId))
      }
    } else {
      if (networkId !== targetNetwork) {
        dispatch(setTargetChain(networkId))
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
        <ChainIcon symbol={selectedNetwork.id} />
        <span>{selectedNetwork.label}</span>
      </div>
      <div
        className={`network-menu custom-scrollbar ${theme?.colorMode ?? ''} ${
          collapsed ? 'collapsed' : 'toggled'
        }`}
      >
        {networks
          .filter((network) => network.id !== selectedNetwork.id)
          .map((network) => (
            <div
              key={network.id}
              className={`network-menu-item ${theme?.colorMode ?? ''}`}
              onClick={(e) => {
                e.stopPropagation() // Prevent the dropdown toggle click
                handleNetworkChange(network.id)
              }}
            >
              <ChainIcon symbol={network.id} />
              <p>{network.label}</p>
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
