import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { useEvmAddress } from './useEvmAddress'
import { useDisconnectWallet } from './useDisconnectWallet'
import { ModeOptions, lightDemoAccounts } from '@kima-widget/shared/types'

const mockUseAppKitAccount = jest.fn()
const mockUseDisconnect = jest.fn()

jest.mock('@reown/appkit/react', () => ({
  useAppKitAccount: () => mockUseAppKitAccount(),
  useDisconnect: () => mockUseDisconnect()
}))

describe('EVM AppKit-only hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('useEvmAddress resolves the AppKit address in advanced mode', () => {
    mockUseAppKitAccount.mockReturnValue({
      address: '0xappkit'
    })

    const { result } = renderHook(() => useEvmAddress(ModeOptions.bridge))

    expect(result.current).toBe('0xappkit')
  })

  it('useEvmAddress keeps the light-mode demo account behavior', () => {
    mockUseAppKitAccount.mockReturnValue({
      address: '0xappkit'
    })

    const { result } = renderHook(() => useEvmAddress(ModeOptions.light))

    expect(result.current).toBe(lightDemoAccounts.EVM)
  })

  it('useDisconnectWallet only delegates to AppKit disconnect', async () => {
    const disconnect = jest.fn().mockResolvedValue(undefined)
    mockUseDisconnect.mockReturnValue({ disconnect })

    const { result } = renderHook(() => useDisconnectWallet())

    await result.current.disconnectWallet()

    expect(disconnect).toHaveBeenCalledTimes(1)
  })
})
