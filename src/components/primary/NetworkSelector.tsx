import React, { useState, useMemo, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import log from '@kima-widget/shared/logger'
import {
  ChainCompatibility,
  ChainData,
  Location,
  DAppOptions,
  lightDemoAccounts,
  lightDemoNetworks,
  ModeOptions
} from '@kima-widget/shared/types'
import {
  selectDappOption,
  selectMode,
  selectNetworks,
  selectSourceChain,
  selectSourceCurrency,
  selectTargetChain,
  selectTheme,
  selectTransactionOption,
  selectSourceAddress,
  selectTargetAddress
} from '@kima-widget/shared/store/selectors'
import {
  setSourceChain,
  setSourceCurrency,
  setTargetAddress,
  setTargetChain,
  setSourceAddress,
  setTargetCurrency
} from '@kima-widget/shared/store/optionSlice'
import {
  isBtc,
  isEVMChain,
  isSolana,
  isTron
} from '@kima-widget/shared/lib/addresses'
import ChainIcon from '../reusable/ChainIcon'
import { ArrowIcon, WarningIcon } from '@kima-widget/assets/icons'
import { useKimaContext } from '@kima-widget/app/providers'

interface NetworkSelectorProps {
  type: Location // 'origin' | 'destination'
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

  // current addresses for guard dispatching (light mode)
  const currentSourceAddr = useSelector(selectSourceAddress)
  const currentTargetAddr = useSelector(selectTargetAddress)

  const { switchChainHandler } = useKimaContext()

  const isOriginSelector = type === 'origin'

  // LOG MOUNT
  useEffect(() => {
    log.info('[NetworkSelector] mount', {
      type,
      mode,
      dAppOption,
      sourceShort: sourceNetwork?.shortName,
      targetShort: targetNetwork?.shortName
    })
  }, []) // eslint-disable-line

  // FILTER AVAILABLE NETWORKS
  const networks = useMemo(() => {
    const result = networkOptions.filter((network: ChainData) => {
      if (dAppOption !== DAppOptions.None && network.shortName === 'CC')
        return false

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

    log.debug('[NetworkSelector] networks (filtered)', {
      type,
      count: result.length,
      mode,
      dAppOption
    })

    return result
  }, [
    networkOptions,
    sourceNetwork,
    sourceSymbol,
    type,
    mode,
    dAppOption,
    isOriginSelector
  ])

  const shouldLockSourceNetwork =
    isOriginSelector &&
    mode === ModeOptions.payment &&
    dAppOption !== DAppOptions.None &&
    !!transactionOption?.targetChain

  // WHAT TO DISPLAY
  const selectedNetwork = useMemo(() => {
    if (shouldLockSourceNetwork) {
      const forced = networks.find(
        (n) => n.shortName === transactionOption.targetChain
      )
      const value =
        forced ?? ({ shortName: '', name: 'Invalid Source Network' } as any)
      log.debug('[NetworkSelector] selected (locked to dApp target)', {
        type,
        value
      })
      return value
    }

    const selected = isOriginSelector ? sourceNetwork : targetNetwork

    if (initialSelection && !selected?.shortName) {
      const value = {
        shortName: '',
        name: isOriginSelector
          ? 'Select Source Network'
          : 'Select Target Network'
      }
      log.debug('[NetworkSelector] selected (initial placeholder)', {
        type,
        value
      })
      return value as any
    }

    const value =
      networks.find((n) => n.shortName === selected?.shortName) ??
      ({
        shortName: '',
        name: isOriginSelector
          ? 'Select Source Network'
          : 'Select Target Network'
      } as any)

    log.debug('[NetworkSelector] selected', { type, value })
    return value
  }, [
    networks,
    sourceNetwork,
    targetNetwork,
    isOriginSelector,
    initialSelection,
    shouldLockSourceNetwork,
    transactionOption?.targetChain
  ])

  // A) Lock origin to dApp targetChain (idempotent)
  const lastForcedShort = useRef<string | undefined>()
  useEffect(() => {
    if (
      !shouldLockSourceNetwork ||
      !isOriginSelector ||
      !transactionOption?.targetChain
    )
      return

    const forcedNetwork = networks.find(
      (n) => n.shortName === transactionOption.targetChain
    )
    if (!forcedNetwork) return
    if (forcedNetwork.shortName === sourceNetwork.shortName) return
    if (lastForcedShort.current === forcedNetwork.shortName) return

    log.info('[NetworkSelector] FORCING origin to dApp targetChain', {
      forced: forcedNetwork.shortName
    })
    dispatch(setSourceChain(forcedNetwork))
    setInitialSelection((prev) => {
      const next = { ...prev, sourceSelection: false } // DO NOT touch targetSelection
      log.info('[NetworkSelector] setInitialSelection (forced origin)', {
        prev,
        next
      })
      return next
    })
    switchChainHandler && switchChainHandler(forcedNetwork)
    lastForcedShort.current = forcedNetwork.shortName
  }, [
    shouldLockSourceNetwork,
    isOriginSelector,
    transactionOption?.targetChain,
    networks,
    sourceNetwork.shortName,
    dispatch,
    switchChainHandler,
    setInitialSelection
  ])

  // HANDLE CHANGE
  const handleNetworkChange = (chain: ChainData) => {
    log.info('[NetworkSelector] change', {
      type,
      newChain: chain.shortName,
      oldSource: sourceNetwork.shortName,
      oldTarget: targetNetwork.shortName
    })

    const location: Location = isOriginSelector ? 'origin' : 'target'
    const isTokenAllowedHere = (t: ChainData['supportedTokens'][number]) => {
      const allowed = t.supportedLocations ?? ['origin', 'target']
      return allowed.includes(location)
    }
    const newCurrency =
      chain.supportedTokens.find(isTokenAllowedHere)?.symbol ?? ''

    if (isOriginSelector) {
      if (chain.shortName !== sourceNetwork.shortName) {
        log.debug('[NetworkSelector] set sourceChain + sourceCurrency', {
          chain: chain.shortName,
          currency: newCurrency
        })
        dispatch(setSourceChain(chain))
        dispatch(setSourceCurrency(newCurrency))

        if (targetNetwork?.shortName === chain.shortName) {
          dispatch(setTargetChain({ shortName: '', name: '' } as any))
          dispatch(setTargetCurrency(''))
          // (optional) if keep demo addresses for target, clear/reset here as well
          dispatch(setTargetAddress(''))
        }

        // Light mode: set DEMO SOURCE address (guarded)
        if (mode === ModeOptions.light) {
          const key: DemoChainKey =
            chain.compatibility === ChainCompatibility.EVM
              ? 'EVM'
              : (chain.shortName as DemoChainKey)
          const demoAddr = lightDemoAccounts[key]
          if (currentSourceAddr !== demoAddr) {
            log.debug('[NetworkSelector] set demo SOURCE address', {
              was: currentSourceAddr,
              now: demoAddr
            })
            dispatch(setSourceAddress(demoAddr))
          }
        }

        // Only origin switch should touch wallet/plugin
        if (switchChainHandler) {
          log.debug(
            '[NetworkSelector] switchChainHandler(origin) →',
            chain.shortName
          )
          switchChainHandler(chain)
        }
      }

      // Mark only SOURCE selection as finished
      setInitialSelection((prev) => {
        const next =
          prev.sourceSelection === false
            ? prev
            : { ...prev, sourceSelection: false }
        log.info('[NetworkSelector] setInitialSelection(origin)', {
          prev,
          next
        })
        return next
      })
    } else {
      // TARGET branch
      if (chain.shortName !== targetNetwork.shortName) {
        log.debug('[NetworkSelector] set targetChain', {
          chain: chain.shortName
        })
        dispatch(setTargetChain(chain))

        if (mode === ModeOptions.light) {
          const key: DemoChainKey =
            chain.compatibility === ChainCompatibility.EVM
              ? 'EVM'
              : (chain.shortName as DemoChainKey)
          const demoAddr = lightDemoAccounts[key]
          if (currentTargetAddr !== demoAddr) {
            log.debug('[NetworkSelector] set demo TARGET address', {
              was: currentTargetAddr,
              now: demoAddr
            })
            dispatch(setTargetAddress(demoAddr))
          }
        }
      }

      // Mark only TARGET selection as finished
      setInitialSelection((prev) => {
        const next =
          prev.targetSelection === false
            ? prev
            : { ...prev, targetSelection: false }
        log.info('[NetworkSelector] setInitialSelection(target)', {
          prev,
          next
        })
        return next
      })
    }

    setCollapsed(true)
  }

  // collapse on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setCollapsed(true)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  // keep demo addresses in sync (light mode ONLY, guarded)
  useEffect(() => {
    if (mode !== ModeOptions.light) return

    // SOURCE
    let srcDemo = ''
    if (isEVMChain(sourceNetwork.shortName)) srcDemo = lightDemoAccounts.EVM
    else if (isSolana(sourceNetwork.shortName)) srcDemo = lightDemoAccounts.SOL
    else if (isTron(sourceNetwork.shortName)) srcDemo = lightDemoAccounts.TRX
    else if (isBtc(sourceNetwork.shortName)) srcDemo = lightDemoAccounts.BTC

    if (srcDemo && currentSourceAddr !== srcDemo) {
      log.debug('[NetworkSelector] sync demo SOURCE address', {
        was: currentSourceAddr,
        now: srcDemo
      })
      dispatch(setSourceAddress(srcDemo))
    }

    // TARGET
    let tgtDemo = ''
    if (isEVMChain(targetNetwork.shortName)) tgtDemo = lightDemoAccounts.EVM
    else if (isSolana(targetNetwork.shortName)) tgtDemo = lightDemoAccounts.SOL
    else if (isTron(targetNetwork.shortName)) tgtDemo = lightDemoAccounts.TRX
    else if (isBtc(targetNetwork.shortName)) tgtDemo = lightDemoAccounts.BTC

    if (tgtDemo && currentTargetAddr !== tgtDemo) {
      log.debug('[NetworkSelector] sync demo TARGET address', {
        was: currentTargetAddr,
        now: tgtDemo
      })
      dispatch(setTargetAddress(tgtDemo))
    }
  }, [
    mode,
    sourceNetwork.shortName,
    targetNetwork.shortName,
    currentSourceAddr,
    currentTargetAddr,
    dispatch
  ])

  return (
    <div
      className={`network-dropdown ${theme?.colorMode ?? ''} ${
        collapsed ? 'collapsed' : 'toggled'
      } ${shouldLockSourceNetwork ? 'disabled' : ''}`}
      onClick={() => {
        if (!shouldLockSourceNetwork) setCollapsed((prev) => !prev)
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
              key={`${network.shortName}-${network.name}`}
              className={`network-menu-item ${theme?.colorMode ?? ''} ${network.disabled ? 'disabled has-tooltip' : 'enabled'}`}
              onClick={(e) => {
                e.stopPropagation()
                if (!network.disabled) handleNetworkChange(network)
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
          <ArrowIcon fill='none' />
        </div>
      )}
    </div>
  )
}

export default React.memo(NetworkSelector)
