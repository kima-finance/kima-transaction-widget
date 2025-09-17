import React, { useEffect } from 'react'
import { NetworkOptions } from '@kima-widget/shared/types'
import { setupAppKit } from '@kima-widget/features/connect-wallet/evm/setupAppkit'

type Props = {
  children: React.ReactNode
  networkOption?: NetworkOptions
  projectId?: string // EVM-only
  isLoading?: boolean
}

export const EvmWalletProvider: React.FC<Props> = ({
  children,
  networkOption,
  projectId,
  isLoading
}) => {
  useEffect(() => {
    if (!isLoading && networkOption && projectId) {
      // Initialize Reown AppKit only if a projectId is provided
      setupAppKit(projectId, networkOption)
    }
  }, [isLoading, networkOption, projectId])

  return <>{children}</>
}
