import { createContext, useContext } from 'react'
import { AppKit } from '@reown/appkit/react'

export const ModalContext = createContext<AppKit | null>(null)

export const useModal = () => {
  const context = useContext(ModalContext)
  // If the provider is not ready yet, context will be null.
  // Instead of throwing, just return null and let the calling component handle it.
  return context
}
