import React from 'react'

const Copy = ({ width = 20, height = 20, fill = '#86B8CE', ...rest }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 14 14'
      fill='none'
      {...rest}
    >
      <path
        d='M13 4V13H4V4H13ZM13 3H4C3.73478 3 3.48043 3.10536 3.29289 3.29289C3.10536 3.48043 3 3.73478 3 4V13C3 13.2652 3.10536 13.5196 3.29289 13.7071C3.48043 13.8946 3.73478 14 4 14H13C13.2652 14 13.5196 13.8946 13.7071 13.7071C13.8946 13.5196 14 13.2652 14 13V4C14 3.73478 13.8946 3.48043 13.7071 3.29289C13.5196 3.10536 13.2652 3 13 3Z'
        fill='white'
        fill-opacity='0.8'
      />
      <path
        d='M1 8H0V1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H8V1H1V8Z'
        fill='white'
        fill-opacity='0.8'
      />
    </svg>
  )
}

export default Copy
