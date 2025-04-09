import { useEffect, useState } from 'react'
import log, { DEFAULT_LOG_LEVEL } from '@utils/logger'

/**
 * This hook is used to enable debug mode for the widget.
 * It listens to a sequence of keystrokes and sets the log
 * level to debug if the sequence is detected.
 *
 * Enter the sequence again to disable debug mode and restore
 * the default log level set by the environment variable
 * LOG_LEVEL or NEXT_PUBLIC_LOG_LEVEL or VITE_LOG_LEVEL.
 * (default is 'error' when not set)
 * @param sequence - The sequence of keystrokes to detect.
 * @returns A boolean indicating whether debug mode is enabled.
 */
export const useDebugCode = (sequence = ['D', 'E', 'B', 'U', 'G']) => {
  const [debugMode, setDebugMode] = useState(false)
  const [, setInputSequence] = useState<string[]>([])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      setInputSequence((prev) => {
        const next = [...prev, e.key].slice(-sequence.length) // keep last N keys
        if (JSON.stringify(next) !== JSON.stringify(sequence)) {
          return next
        }
        setDebugMode((prev) => {
          if (prev) {
            log.info('🛠️ Disabling debug mode')
            log.setLevel(DEFAULT_LOG_LEVEL)
          } else {
            log.setLevel('debug')
            log.info('🛠️ Debug Mode enabled')
          }
          return !prev
        })
        return next
      })
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [sequence])

  return debugMode
}
