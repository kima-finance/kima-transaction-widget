import React, { useEffect, useState } from 'react'
import { useKimaContext } from '@kima-widget/app/providers'
import { CrossIcon } from '@kima-widget/assets/icons'
import { useGetEnvOptions } from '@kima-widget/hooks/useGetEnvOptions'
import { WIDGET_VERSION } from '@kima-widget/shared/config/version'
import { ThemeOptions } from '@kima-widget/shared/types'

interface VersionInfoProps {
  theme: ThemeOptions
}

const VersionInfo = ({ theme }: VersionInfoProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { kimaBackendUrl } = useKimaContext()
  const { data: envOptions } = useGetEnvOptions({ kimaBackendUrl })

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const backendVersion = envOptions?.backendVersion ?? 'Unavailable'

  return (
    <>
      <div className='version-info'>
        <button
          type='button'
          className='version-info-trigger'
          aria-label='Open version information'
          onClick={() => setIsOpen(true)}
        >
          <span className='version-info-glyph' aria-hidden='true'>
            i
          </span>
        </button>
      </div>

      {isOpen && (
        <div
          className='version-info-overlay'
          role='presentation'
          onClick={() => setIsOpen(false)}
        >
          <div
            className={`version-info-modal ${theme.colorMode}`}
            role='dialog'
            aria-modal='true'
            aria-label='Version information'
            onClick={(event) => event.stopPropagation()}
          >
            <div className='version-info-modal-header'>
              <h3>Version Information</h3>
              <button
                type='button'
                className='version-info-close'
                aria-label='Close version information'
                onClick={() => setIsOpen(false)}
              >
                <CrossIcon />
              </button>
            </div>

            <div className='version-info-list'>
              <div className='version-info-row'>
                <span>Current widget version</span>
                <strong>{WIDGET_VERSION}</strong>
              </div>
              <div className='version-info-row'>
                <span>Current backend version</span>
                <strong>{backendVersion}</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default VersionInfo
