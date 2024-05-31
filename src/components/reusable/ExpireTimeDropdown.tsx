import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectExpireTime, selectTheme } from '../../store/selectors'
import { ExpireTimeOptions } from '../../utils/constants'
import { useDispatch } from 'react-redux'
import { setExpireTime } from '../../store/optionSlice'

const ExpireTimeDropdown = () => {
  const ref = useRef<any>()
  const dispatch = useDispatch()
  const [collapsed, setCollapsed] = useState(true)
  const expireTime = useSelector(selectExpireTime)
  const theme = useSelector(selectTheme)

  useEffect(() => {
    const bodyMouseDowntHandler = (e: any) => {
      if (ref?.current && !ref.current.contains(e.target)) {
        setCollapsed(true)
      }
    }

    document.addEventListener('mousedown', bodyMouseDowntHandler)
    return () => {
      document.removeEventListener('mousedown', bodyMouseDowntHandler)
    }
  }, [setCollapsed])

  return (
    <div
      className={`expire-time-dropdown ${theme.colorMode} ${
        collapsed ? 'collapsed' : ''
      }`}
      onClick={() => setCollapsed((prev) => !prev)}
      ref={ref}
    >
      <div className='expire-time-wrapper'>
        <p>{expireTime}</p>
      </div>
      <div
        className={`expire-time-menu ${theme.colorMode} ${collapsed ? 'collapsed' : ''}`}
      >
        {ExpireTimeOptions.map((option) => (
          <p
            className='expire-time-item'
            onClick={() => {
              dispatch(setExpireTime(option))
            }}
          >
            {option}
          </p>
        ))}
      </div>
    </div>
  )
}

export default ExpireTimeDropdown
