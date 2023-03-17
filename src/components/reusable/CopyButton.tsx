import React, { useEffect, useState } from 'react'
import { CheckIcon, CopyIcon } from '../../assets/icons'

interface Props {
  text: string
}

const CopyButton = ({ text }: Props) => {
  const [copyClicked, setCopyClicked] = useState(false)

  useEffect(() => {
    if (!copyClicked) return

    setTimeout(() => {
      setCopyClicked(false)
    }, 2000)
  }, [copyClicked])

  return (
    <span
      className='copy-btn'
      onClick={() => {
        setCopyClicked(true)
        navigator.clipboard.writeText(text)
      }}
    >
      {copyClicked ? <CheckIcon fill='#979797' /> : <CopyIcon />}
    </span>
  )
}

export default CopyButton
