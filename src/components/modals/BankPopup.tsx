import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBankPopup, setKYCStatus } from '../../store/optionSlice'
import {
  selectBackendUrl,
  selectBankPopup,
  selectTheme,
  selectUuid
} from '../../store/selectors'
import { CrossIcon } from '../../assets/icons'
import { fetchWrapper } from '../../helpers/fetch-wrapper'
import { toast } from 'react-hot-toast'

type KYCResult = {
  id: string
  status: string
  name: string
  surname: string
  external_uuid: string
  account_id: string
  created_at: number
}

const BankPopup = ({
  setVerifying,
  isVerifying
}: {
  setVerifying?: any
  isVerifying?: boolean
}) => {
  const dispatch = useDispatch()
  const uuid = useSelector(selectUuid)
  const theme = useSelector(selectTheme)
  const bankPopup = useSelector(selectBankPopup)
  const kimaBackendUrl = useSelector(selectBackendUrl)

  useEffect(() => {
    if (!kimaBackendUrl || !uuid || !isVerifying) return
    const timerId = setInterval(async () => {
      try {
        const res: any = await fetchWrapper.post(
          `${kimaBackendUrl}/kyc`,
          JSON.stringify({
            uuid
          })
        )
        const kycResult: Array<KYCResult> = res.data
        console.log(kycResult)

        if (!kycResult.length) {
          console.log('failed to check kyc status')
          toast.error('failed to check kyc status')
        } else if (kycResult[0].status === 'approved') {
          setVerifying(false)
          dispatch(setKYCStatus('approved'))
          toast.success('KYC is verified')
        }
      } catch (e) {
        console.log('failed to check kyc status')
        toast.error('failed to check kyc status')
      }
    }, 3000)

    return () => {
      clearInterval(timerId)
    }
  }, [kimaBackendUrl, uuid, isVerifying])

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

export default BankPopup
