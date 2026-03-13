import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import type { ReactNode, RefObject } from 'react'
import { useToasterStore } from 'react-hot-toast'

export type ToastHistoryItem = {
  id: string
  message: string
  time: number
}

type ToastHistoryContextValue = {
  history: ToastHistoryItem[]
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  panelRef: RefObject<HTMLDivElement | null>
  formatTime: (timestamp: number) => string
}

const ToastHistoryContext = createContext<ToastHistoryContextValue | null>(null)

const toToastMessage = (message: unknown): string => {
  if (typeof message === 'string') return message
  if (
    typeof message === 'object' &&
    message !== null &&
    typeof (message as { props?: { children?: unknown } }).props?.children ===
      'string'
  ) {
    return (message as { props: { children: string } }).props.children
  }

  return 'Notification'
}

const useToastHistoryState = (): ToastHistoryContextValue => {
  const { toasts } = useToasterStore()
  const [isOpen, setIsOpen] = useState(false)
  const [history, setHistory] = useState<ToastHistoryItem[]>([])
  const panelRef = useRef<HTMLDivElement>(null)
  const toastIds = useRef(new Set<string>())

  useEffect(() => {
    if (!toasts?.length) return

    const nextItems: ToastHistoryItem[] = []
    toasts.forEach((item) => {
      if (toastIds.current.has(item.id)) return
      toastIds.current.add(item.id)
      nextItems.push({
        id: item.id,
        message: toToastMessage(item.message),
        time: item.createdAt ?? Date.now()
      })
    })

    if (nextItems.length) {
      setHistory((prev) => [...nextItems, ...prev])
    }
  }, [toasts])

  useEffect(() => {
    if (!isOpen) return

    const handler = (event: MouseEvent) => {
      const target = event.target as Node
      if (panelRef.current && !panelRef.current.contains(target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
    }
  }, [isOpen])

  const formatTime = useCallback((timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })
  }, [])

  return {
    history,
    isOpen,
    setIsOpen,
    panelRef,
    formatTime
  }
}

export const ToastHistoryProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const value = useToastHistoryState()
  const memoizedValue = useMemo(
    () => value,
    [value.history, value.isOpen, value.formatTime]
  )

  return (
    <ToastHistoryContext.Provider value={memoizedValue}>
      {children}
    </ToastHistoryContext.Provider>
  )
}

export const useToastHistory = () => {
  const context = useContext(ToastHistoryContext)

  if (!context) {
    throw new Error('useToastHistory must be used within ToastHistoryProvider')
  }

  return context
}
