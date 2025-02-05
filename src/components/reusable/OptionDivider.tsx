import React from 'react'

const OptionDivider = ({ text }: { text: string }) => {
  return (
    <div className='option-divider'>
      <span className='line'></span>
      <span className='text'>{text}</span>
      <span className='line'></span>
    </div>
  )
}

export default OptionDivider
