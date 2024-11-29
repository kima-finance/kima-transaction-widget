import React, { useState, useMemo, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setTargetChain } from '@store/optionSlice'
import {
  selectSourceChain,
  selectTargetChain,
  selectTheme
} from '@store/selectors'
import Arrow from '@assets/icons/Arrow'
import useGetChainData from '../../hooks/useGetChainData'

const TargetNetworkSelectorComponent = () => {
  const [collapsed, setCollapsed] = useState(true)
  const ref = useRef<any>()

  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)

  // get the source network to avoid rendering as a target network option
  const sourceNetwork = useSelector(selectSourceChain)

  // Get the selected target network from Redux
  const targetNetwork = useSelector(selectTargetChain)

  // Fetch dynamic chain data
  const { chainData } = useGetChainData()

  // Map chain data to the format needed by the dropdown
  const networks = useMemo(() => {
    const data =
      chainData.map((network) => ({
        id: network.symbol,
        label: network.name,
        icon: network.icon ? <network.icon /> : <div /> // Render the icon as JSX
      })) || [] // Default to an empty array if chainData is undefined
    console.info('Final data (target): ', data)
    return data
  }, [chainData])
  
  useEffect(() => {
    if (sourceNetwork === targetNetwork) {
      // Find the first available network that is not the source network
      const newTargetNetwork =
        networks.find((network) => network.id !== sourceNetwork) || null
  
      // Dispatch the new target network
      if (newTargetNetwork) {
        dispatch(setTargetChain(newTargetNetwork.id))
      } else {
        console.warn('No valid target networks available')
      }
    }
  }, [sourceNetwork, targetNetwork, networks, dispatch])


  // Ensure there's always a fallback selected network
  const selectedNetwork = useMemo(() => {
    if (targetNetwork === sourceNetwork) {
      // Find a fallback if the source and target networks conflict
      return (
        networks.find((network) => network.id !== sourceNetwork) ||
        { label: 'Select Network', icon: null }
      )
    }
  
    // Return the selected target network or a fallback
    return (
      networks.find((network) => network.id === targetNetwork) ||
      networks[0] || { label: 'Select Network', icon: null }
    )
  }, [sourceNetwork, targetNetwork, networks])

  const availableTargetNetworks = useMemo(() => {
    return networks.filter(
      (network) =>
        network.id !== sourceNetwork &&
        network.id !== targetNetwork
    )
  }, [networks, sourceNetwork, targetNetwork])

  const handleNetworkChange = (networkId: string) => {
    if (networkId === targetNetwork) return
    dispatch(setTargetChain(networkId))
    setCollapsed(false)
  }

  useEffect(() => {
    const bodyMouseDownHandler = (e: any) => {
      if (ref?.current && !ref.current.contains(e.target)) {
        setCollapsed(true)
      }
    }

    document.addEventListener('mousedown', bodyMouseDownHandler)
    return () => {
      document.removeEventListener('mousedown', bodyMouseDownHandler)
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
        <div className='icon'>{selectedNetwork.icon}</div>
        <span>{selectedNetwork.label}</span>
      </div>
      <div
        className={`network-menu custom-scrollbar ${theme?.colorMode ?? ''} ${
          collapsed ? 'collapsed' : 'toggled'
        }`}
      >
        {availableTargetNetworks.map((network) => (
          <div
            key={network.id}
            className={`network-menu-item ${theme?.colorMode ?? ''}`}
            onClick={() => handleNetworkChange(network.id)}
          >
            <div className='icon'>{network.icon}</div>
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

// Wrap the named component in React.memo for optimization
const TargetNetworkSelector = React.memo(TargetNetworkSelectorComponent)

export default TargetNetworkSelector
