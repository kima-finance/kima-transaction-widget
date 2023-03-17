import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { setHashPopup, setHelpPopup } from '../../store/optionSlice'
import { selectTheme } from '../../store/selectors'
import ExternalLink from './ExternalLink'

interface Props {
  open: boolean
  showHashes?: boolean
}

const Dropdown = ({ open, showHashes = false }: Props) => {
  const theme = useSelector(selectTheme)
  const dispatch = useDispatch()

  return (
    <div
      className={`dropdown-menu ${theme.colorMode} ${open ? 'open' : 'closed'}`}
    >
      <div className='menu-item'>
        <div
          onClick={() => {
            dispatch(setHelpPopup(true))
          }}
        >
          Open Help
        </div>
      </div>
      {showHashes && (
        <div className='menu-item'>
          <div
            onClick={() => {
              dispatch(setHashPopup(true))
            }}
          >
            Show Hashes
          </div>
        </div>
      )}
      <div className='menu-item'>
        <ExternalLink to='https://t.me/diversifi'>
          Chat with someone
        </ExternalLink>
      </div>
    </div>
  )
}

export default Dropdown
