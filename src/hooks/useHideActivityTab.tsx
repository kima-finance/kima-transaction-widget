import { useEffect, useRef } from 'react'

function useHideWuiListItem(isModalOpen: boolean) {
  const observerRef = useRef<MutationObserver | null>(null)

  useEffect(() => {
    const modalSelector = 'w3m-modal'

    const hideFirstWuiListItem = (parent: Node) => {
      const stack: Node[] = [parent]

      while (stack.length) {
        const current = stack.shift()!
        // Only Elements have tagName/children
        if (current instanceof Element) {
          if (current.tagName === 'WUI-LIST-ITEM') {
            ;(current as HTMLElement).style.display = 'none'
            break
          }
          // dive into shadowRoot if present
          const sr = (current as HTMLElement & { shadowRoot?: ShadowRoot })
            .shadowRoot
          if (sr) stack.push(sr)
          stack.push(...Array.from(current.children ?? []))
        } else if (current instanceof ShadowRoot) {
          stack.push(...Array.from(current.children))
        }
      }
    }

    const observeModal = () => {
      const modal = document.querySelector(modalSelector) as
        | (HTMLElement & { shadowRoot?: ShadowRoot })
        | null

      const sr = modal?.shadowRoot
      if (!sr) return

      const wuiFlex = sr.querySelector('wui-flex')
      if (wuiFlex) hideFirstWuiListItem(wuiFlex)
    }

    const startObserver = () => {
      // clean any existing observer first
      observerRef.current?.disconnect()
      observerRef.current = new MutationObserver(() => {
        const modal = document.querySelector(modalSelector)
        if (modal) observeModal()
      })
      observerRef.current.observe(document.body, {
        childList: true,
        subtree: true
      })
    }

    if (isModalOpen) {
      startObserver()
      observeModal()
    } else {
      observerRef.current?.disconnect()
      observerRef.current = null
    }

    return () => {
      observerRef.current?.disconnect()
      observerRef.current = null
    }
  }, [isModalOpen])
}

export default useHideWuiListItem
