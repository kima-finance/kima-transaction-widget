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

  const sourceNetwork = useSelector(selectSourceChain)
  const targetNetwork = useSelector(selectTargetChain)

  const { chainData } = useGetChainData()

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

  // Ensure target network updates dynamically on source network changes or first render
  useEffect(() => {
    if (sourceNetwork === targetNetwork || !targetNetwork) {
      const validTarget =
        networks.find((network) => network.id !== sourceNetwork) || null

      if (validTarget) {
        dispatch(setTargetChain(validTarget.id))
      } else {
        console.warn('No valid target networks available')
      }
    }
  }, [sourceNetwork, targetNetwork, networks, dispatch])

  // Ensure there's always a fallback selected network
  const selectedNetwork = useMemo(() => {
    return (
      networks.find((network) => network.id === targetNetwork) ||
      networks.find((network) => network.id !== sourceNetwork) ||
      { label: 'Select Network', icon: null }
    )
  }, [sourceNetwork, targetNetwork, networks])

  const availableTargetNetworks = useMemo(() => {
    return networks.filter(
      (network) => network.id !== sourceNetwork
    )
  }, [networks, sourceNetwork])

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
