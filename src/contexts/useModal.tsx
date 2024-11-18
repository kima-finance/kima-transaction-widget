import { createContext, useContext } from 'react'
import { AppKit } from '@reown/appkit/react'

export const ModalContext = createContext<AppKit | null>(null)

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}