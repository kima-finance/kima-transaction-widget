import React, { useState, useMemo, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSourceChain } from '@store/optionSlice'
import { selectTheme } from '@store/selectors'
import Arrow from '@assets/icons/Arrow'
import useGetChainData from '../../hooks/useGetChainData'

const SourceNetworkSelectorComponent = () => {
  const [collapsed, setCollapsed] = useState(true)
  const ref = useRef<any>()

  const originNetwork = useSelector((state) => state.option.sourceChain)
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)

  const { chainData } = useGetChainData() // Fetch dynamic chain data

  // Map chain data to the format needed by the dropdown
  const networks = useMemo(() => {
    const data =
      chainData.map((network) => ({
        id: network.symbol,
        label: network.name,
        icon: network.icon ? <network.icon /> : <div /> // Render the icon as JSX
      })) || [] // Default to an empty array if chainData is undefined
    console.info('Final data: ', data)
    return data
  }, [chainData])

  // Ensure there's always a fallback selected network
  const selectedNetwork = useMemo(() => {
    return (
      networks.find((option) => option.id === originNetwork) ||
      networks[0] || { label: 'Loading...', icon: null } // Default to the first network if available // Provide safe fallback
    )
  }, [originNetwork, networks])

  useEffect(() => {
    console.info('Final networks:', networks)
  }, [chainData])

  const handleNetworkChange = (networkId: string) => {
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
        <div className='icon'>{selectedNetwork.icon}</div>
        <span>{selectedNetwork.label}</span>
      </div>
      <div
        className={`network-menu custom-scrollbar ${theme?.colorMode ?? ''} ${
          collapsed ? 'collapsed' : 'toggled'
        }`}
      >
        {networks.map((network) => (
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
const SourceNetworkSelector = React.memo(SourceNetworkSelectorComponent)

export default SourceNetworkSelector
