import React from 'react'

const Arrow = ({ width = 22, height = 25, fill = 'none', ...rest }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
    >
      <path
        d='M3.3335 5.8339C3.37107 5.75069 3.39704 5.65895 3.4478 5.58548C3.5745 5.40323 3.75635 5.33301 3.97577 5.33301C6.58444 5.33504 9.1927 5.33423 11.8014 5.33423C11.8865 5.33423 11.9712 5.33382 12.0564 5.33423C12.3209 5.33504 12.5136 5.46168 12.6167 5.7032C12.717 5.93781 12.6627 6.15579 12.4904 6.34251C12.4716 6.3628 12.4524 6.38229 12.4328 6.40177C11.1103 7.74493 9.78781 9.08889 8.4633 10.4304C8.38936 10.5051 8.30343 10.579 8.20911 10.6192C8.00327 10.7064 7.80424 10.6715 7.63038 10.5234C7.59321 10.4917 7.55804 10.4572 7.52367 10.4227C6.21993 9.09863 4.917 7.77456 3.61287 6.4521C3.48937 6.32668 3.37306 6.19922 3.3335 6.019C3.3335 5.9573 3.3335 5.8956 3.3335 5.8339Z'
        fill='white'
      />
    </svg>
  )
}

export default Arrow
