import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCurrencyOptions,
  selectLightModeOption,
  selectOriginNetwork,
  selectSourceAddress,
  selectTargetAddress,
  selectTargetNetwork,
  selectTheme
} from '../../store/selectors'
import { setSourceAddress, setTargetAddress } from '../../store/optionSlice'
import useBalanceLightMode from '../../hooks/useBalanceLightMode'
import { ChainName } from '../../utils/constants'
import { formatterFloat } from '../../helpers/functions'

const AccountDropdown = React.memo(
  ({ isSourceAccount = true }: { isSourceAccount?: boolean }) => {
    const [collapsed, setCollapsed] = useState(true)
    const lightModeOption = useSelector(selectLightModeOption)
    const selectedCoin = useSelector(selectCurrencyOptions)
    const sourceAddress = useSelector(selectSourceAddress)
    const targetAddress = useSelector(selectTargetAddress)
    const sourceChain = useSelector(selectOriginNetwork)
    const targetChain = useSelector(selectTargetNetwork)
    const theme = useSelector(selectTheme)
    const { balance } = useBalanceLightMode({
      chain: (isSourceAccount ? sourceChain : targetChain) as ChainName,
      address: isSourceAccount ? sourceAddress : targetAddress
    })
    const dispatch = useDispatch()
    const ref = useRef<any>()

    const getLabel = useCallback(
      (address: string) => {
        const idx = lightModeOption
          ? lightModeOption.kimaAccounts.findIndex(
              (account) => account === address
            )
          : -1
        return idx < 0 ? 'Unknown Account' : `Kima Account ${idx + 1}`
      },
      [lightModeOption]
    )

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
      <div className='account-dropdown'>
        <div
          className={`network-dropdown ${theme.colorMode} ${
            collapsed ? 'collapsed' : ''
          }`}
          onClick={() => setCollapsed((prev) => !prev)}
          ref={ref}
        >
          <div className='network-wrapper'>
            {getLabel(isSourceAccount ? sourceAddress : targetAddress)}
          </div>
          <div
            className={`network-menu custom-scrollbar ${theme.colorMode} ${
              collapsed ? 'collapsed' : ''
            }`}
          >
            {lightModeOption?.kimaAccounts.map((account) => (
              <div
                className='network-menu-item'
                key={account}
                onClick={async () => {
                  if (isSourceAccount) {
                    dispatch(setSourceAddress(account))
                  } else {
                    dispatch(setTargetAddress(account))
                  }
                }}
              >
                <p>{getLabel(account)}</p>
              </div>
            ))}
          </div>
        </div>
        {balance !== undefined && (
          <p className='balance-info'>
            {formatterFloat.format(balance)} {selectedCoin.symbol} available
          </p>
        )}
      </div>
    )
  }
)

export default AccountDropdown
