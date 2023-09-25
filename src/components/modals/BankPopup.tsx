import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CrossIcon } from '../../assets/icons'
import { setBankPopup } from '../../store/optionSlice'
import { selectBankPopup, selectTheme, selectUuid } from '../../store/selectors'

const HelpPopup = () => {
  const dispatch = useDispatch()
  const uuid = useSelector(selectUuid)
  const theme = useSelector(selectTheme)
  const bankPopup = useSelector(selectBankPopup)

  return (
    <div
      className={`kima-modal bank-popup ${theme.colorMode} ${
        bankPopup ? 'open' : ''
      }`}
    >
      <div
        className='modal-overlay'
        onClick={() => {
          dispatch(setBankPopup(false))
        }}
      />
      <div className='modal-content-container'>
        <div className='kima-card-header'>
          <div className='topbar'>
            <div className='title'></div>
            <div className='control-buttons'>
              <button
                className='icon-button'
                onClick={() => dispatch(setBankPopup(false))}
              >
                <CrossIcon
                  fill={theme.colorMode === 'light' ? 'black' : 'white'}
                />
              </button>
            </div>
          </div>
        </div>
        <div className='modal-content'>
          <iframe
            src={`https://sandbox.depasify.com/widgets/kyc?partner=kimastage&user_uuid=${uuid}`}
            width='100%'
            height='100%'
            frameBorder='0'
            allow='camera'
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default HelpPopup
