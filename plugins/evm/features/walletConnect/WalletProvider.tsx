import React, { ReactNode, useEffect, useState } from 'react'
import { setupAppKit } from '../../config/modalConfig'
import { NetworkOptions } from '@interface'

export interface WalletProviderProps {
  children: ReactNode
  walletConnectProjectId: string
  networkOption: NetworkOptions
  isLoading: boolean
}

const WalletProvider = ({
  children,
  networkOption,
  walletConnectProjectId,
  isLoading
}: WalletProviderProps) => {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (!isLoading && networkOption) {
      setupAppKit(walletConnectProjectId, networkOption)
      setIsReady(true)
    }
  }, [networkOption, isLoading, walletConnectProjectId])

  if (!isReady) {
    return <></>
  }

  return <>{children}</>
}

export default WalletProvider
