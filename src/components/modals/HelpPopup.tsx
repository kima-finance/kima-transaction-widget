import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CrossIcon } from '../../assets/icons'
import { setHelpPopup } from '../../store/optionSlice'
import { selectHelpPopup, selectTheme } from '../../store/selectors'

const HelpPopup = () => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const helpPopup = useSelector(selectHelpPopup)

  return (
    <div
      className={`kima-modal help-popup ${theme.colorMode} ${
        helpPopup ? 'open' : ''
      }`}
    >
      <div
        className='modal-overlay'
        onClick={() => {
          dispatch(setHelpPopup(false))
        }}
      />
      <div className='modal-content-container'>
        <div className='kima-card-header'>
          <div className='topbar'>
            <div className='title'>
              <h3>Help</h3>
            </div>
            <div className='control-buttons'>
              <button
                className='icon-button'
                onClick={() => dispatch(setHelpPopup(false))}
              >
                <CrossIcon
                  fill={theme.colorMode === 'light' ? 'black' : 'white'}
                />
              </button>
            </div>
          </div>
        </div>
        <div className='modal-content'>
          <p>
            The SDK enables dApp developers to process Kima transactions on
            behalf of their clients. It will include visual and API components
            that communicate with the Kima RPC nodes. The developers can pick
            and choose the right level of integration, based on their usage
            scenario.
          </p>
        </div>
      </div>
    </div>
  )
}

export default HelpPopup
