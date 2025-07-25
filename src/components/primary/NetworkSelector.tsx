import React, { useState, useMemo, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectDappOption,
  selectMode,
  selectNetworks,
  selectSourceChain,
  selectSourceCurrency,
  selectTargetChain,
  selectTheme,
  selectTransactionOption
} from '@widget/store/selectors'
import {
  setSourceChain,
  setSourceCurrency,
  setTargetChain,
  setTargetAddress
} from '@widget/store/optionSlice'
import Arrow from '@widget/assets/icons/Arrow'
import ChainIcon from '../reusable/ChainIcon'
import {
  isEVMChain,
  lightDemoAccounts,
  lightDemoNetworks
} from '@widget/utils/constants'
import { useKimaContext } from '../../KimaProvider'
import {
  ChainCompatibility,
  ChainData,
  ChainLocation
} from '@widget/plugins/pluginTypes'
import { DAppOptions, ModeOptions } from '@widget/interface'
import log from '@widget/utils/logger'
import { isSolana, isTron } from '../../helpers/functions'
import { WarningIcon } from '@widget/assets/icons'
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
  const transactionOption = useSelector(selectTransactionOption)
  const dAppOption = useSelector(selectDappOption)
  const mode = useSelector(selectMode)
  const sourceNetwork = useSelector(selectSourceChain)
  const sourceSymbol = useSelector(selectSourceCurrency)
  const targetNetwork = useSelector(selectTargetChain)
  const { switchChainHandler } = useKimaContext()

  const isOriginSelector = type === 'origin'

  const networks = useMemo(() => {
    return networkOptions.filter((network: ChainData) => {
      if (dAppOption !== DAppOptions.None && network.shortName === 'CC')
        return false

      const isSameAsSource = isOriginSelector
        ? false
        : network.shortName === sourceNetwork.shortName

      const isAllowedInLightMode =
        mode !== ModeOptions.light ||
        lightDemoNetworks.includes(network.shortName)

      const sourceToken = sourceNetwork.supportedTokens.find(
        (t) => t.symbol === sourceSymbol
      )
      let supportsSourceCurrency = true
      if (!isOriginSelector && !!sourceToken) {
        supportsSourceCurrency = network.supportedTokens.some(
          (token) => token.peggedTo === sourceToken?.peggedTo
        )
      }

      return (
        network.supportedLocations.includes(type) &&
        !isSameAsSource &&
        supportsSourceCurrency &&
        isAllowedInLightMode
      )
    })
  }, [networkOptions, sourceNetwork, sourceSymbol, type, mode, dAppOption])

  const shouldLockSourceNetwork =
    isOriginSelector &&
    mode === ModeOptions.payment &&
    dAppOption !== DAppOptions.None &&
    !!transactionOption?.targetChain

  const selectedNetwork = useMemo(() => {
    if (shouldLockSourceNetwork) {
      const forcedNetwork = networks.find(
        (n) => n.shortName === transactionOption.targetChain
      )
      return (
        forcedNetwork || {
          shortName: '',
          name: 'Invalid Source Network'
        }
      )
    }

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
    initialSelection,
    shouldLockSourceNetwork,
    transactionOption?.targetChain
  ])

  useEffect(() => {
    if (
      shouldLockSourceNetwork &&
      isOriginSelector &&
      transactionOption?.targetChain
    ) {
      const forcedNetwork = networks.find(
        (n) => n.shortName === transactionOption.targetChain
      )
      if (forcedNetwork && forcedNetwork.id !== sourceNetwork.id) {
        dispatch(setSourceChain(forcedNetwork))
        setInitialSelection({
          sourceSelection: false,
          targetSelection: false
        })

        // If using EVM or other handlers:
        switchChainHandler && switchChainHandler(forcedNetwork)
      }
    }
  }, [
    shouldLockSourceNetwork,
    transactionOption?.targetChain,
    sourceNetwork.id,
    isOriginSelector,
    networks,
    dispatch,
    switchChainHandler
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
      } ${shouldLockSourceNetwork ? 'disabled' : ''}`}
      onClick={() => {
        if (!shouldLockSourceNetwork) {
          setCollapsed((prev) => !prev)
        }
      }}
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
              {network.disabled && (
                <span className='tooltip'>Temporarily unavailable</span>
              )}
            </div>
          ))}
      </div>
      {!shouldLockSourceNetwork && (
        <div className={`dropdown-icon ${collapsed ? 'toggled' : 'collapsed'}`}>
          <Arrow fill='none' />
        </div>
      )}
    </div>
  )
}

export default React.memo(NetworkSelector)
