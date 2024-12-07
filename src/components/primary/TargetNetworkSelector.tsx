import React, { useState, useMemo, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setTargetChain } from '@store/optionSlice'
import {
  selectNetworks,
  selectSourceChain,
  selectTargetChain,
  selectTheme
} from '@store/selectors'
import Arrow from '@assets/icons/Arrow'
import ChainIcon from '../reusable/ChainIcon'

// TODO: refactor SourceNetworkSelector and TargetNetworkSelector into
// a single component with a prop for a blacklist of networks.
//
// the blacklist will filter out the the source or target networks so
// it's not possible to select the same network as the target
const TargetNetworkSelectorComponent = () => {
  const [collapsed, setCollapsed] = useState(true)
  const ref = useRef<any>()

  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)

  const sourceNetwork = useSelector(selectSourceChain)
  const targetNetwork = useSelector(selectTargetChain)
  const networkOptions = useSelector(selectNetworks)

  const networks = useMemo(() => {
    const data = networkOptions.filter(
      (network) => network.id !== sourceNetwork
    )
    return data
  }, [networkOptions])

  // Ensure there's always a fallback selected network
  const selectedNetwork = useMemo(() => {
    return (
      networks.find((network) => network.id === targetNetwork) ||
      networks.find((network) => network.id !== sourceNetwork) || {
        id: '',
        label: 'Select Network'
      }
    )
  }, [sourceNetwork, targetNetwork, networks])

  const availableTargetNetworks = useMemo(() => {
    return networks.filter((network) => network.id !== sourceNetwork)
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
        <ChainIcon symbol={selectedNetwork.id} />
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

// Wrap the named component in React.memo for optimization
const TargetNetworkSelector = React.memo(TargetNetworkSelectorComponent)

export default TargetNetworkSelector
