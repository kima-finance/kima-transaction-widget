import React, { useState, useMemo, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSourceChain } from '@store/optionSlice'
import {
  selectTheme,
  selectSourceChain,
  selectTargetChain,
  selectNetworks
} from '@store/selectors'
import Arrow from '@assets/icons/Arrow'
import ChainIcon from '../reusable/ChainIcon'

// TODO: refactor SourceNetworkSelector and TargetNetworkSelector into
// a single component with a prop for a blacklist of networks.
//
// the blacklist will filter out the the source or target networks so
// it's not possible to select the same network as the target
const SourceNetworkSelectorComponent = () => {
  const [collapsed, setCollapsed] = useState(true)
  const ref = useRef<any>()

  const originNetwork = useSelector(selectSourceChain)
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const networkOptions = useSelector(selectNetworks)
  const targetChain = useSelector(selectTargetChain)

  // Map chain data to the format needed by the dropdown
  // should not be able to select the same network as the target
  const networks = useMemo(() => {
    const data = networkOptions.filter((network) => network.id !== targetChain)
    return data
  }, [networkOptions])

  // Ensure there's always a fallback selected network
  const selectedNetwork = useMemo(() => {
    return (
      networks.find((option) => option.id === originNetwork) ||
      networks[0] || { id: '', label: 'Loading...' } // Default to the first network if available // Provide safe fallback
    )
  }, [originNetwork, networks])

  useEffect(() => {
    console.info('Source::Final networks:', networks)
  }, [networks])

  const handleNetworkChange = (networkId: string) => {
    console.info(`networkId: ${networkId} | originNetwork:`, originNetwork)
    if (networkId === originNetwork) return
    dispatch(setSourceChain(networkId))
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
        {networks
          .filter((network) => network.id !== selectedNetwork.id)
          .map((filteredNetwork) => (
            <div
              key={filteredNetwork.id}
              className={`network-menu-item ${theme?.colorMode ?? ''}`}
              onClick={() => handleNetworkChange(filteredNetwork.id)}
            >
              <ChainIcon symbol={filteredNetwork.id} />
              <p>{filteredNetwork.label}</p>
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
const SourceNetworkSelector = React.memo(SourceNetworkSelectorComponent)

export default SourceNetworkSelector
