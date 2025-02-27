import React from 'react'

const HONEY = ({ width = 30, height = 30, ...rest }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 40 40'
      fill='none'
      {...rest}
    >
      <rect
        width='40'
        height='40'
        rx='10'
        fill='url(#paint0_radial_6594_45)'
      ></rect>
      <rect
        width='40'
        height='40'
        rx='10'
        fill='url(#paint1_radial_6594_45)'
      ></rect>
      <g filter='url(#filter0_dd_6594_45)'>
        <path
          d='M14.2918 29.3374H11.2243C10.6889 29.3374 10.2114 29.2175 9.7629 28.9777C9.31436 28.738 8.9671 28.405 8.69219 27.9787L7.05717 25.3147C6.79673 24.9151 6.6665 24.4889 6.6665 24.0094C6.6665 23.5299 6.79673 23.1169 7.05717 22.7173L8.72112 20.0134L7.05717 17.3227C6.79673 16.9231 6.6665 16.4836 6.6665 16.0174C6.6665 15.5512 6.79673 15.1116 7.05717 14.712L8.69219 12.048C8.95263 11.6218 9.31436 11.2888 9.7629 11.049C10.2114 10.8092 10.7034 10.676 11.2243 10.676H14.2918L15.9123 8.03868C16.1727 7.61244 16.5345 7.27944 16.983 7.03968C17.4316 6.79992 17.9235 6.66672 18.4444 6.66672H21.5553C22.0906 6.66672 22.5681 6.7866 23.0167 7.03968C23.4652 7.27944 23.8125 7.61244 24.0874 8.03868L25.7224 10.676H28.7899C29.3252 10.676 29.8027 10.7959 30.2512 11.049C30.6998 11.2888 31.047 11.6218 31.322 12.048L32.9425 14.712C33.2029 15.1116 33.3332 15.5378 33.3332 16.0174C33.3332 16.4969 33.2029 16.9231 32.9425 17.3227L31.2786 20.0134L32.9425 22.7173C33.2029 23.1169 33.3332 23.5432 33.3332 24.0094C33.3332 24.4756 33.2029 24.9151 32.9425 25.3147L31.322 27.9787C31.0615 28.405 30.6998 28.738 30.2512 28.9777C29.8027 29.2175 29.3107 29.3374 28.7899 29.3374H25.7224L24.0874 31.9747C23.8269 32.401 23.4652 32.734 23.0167 32.9737C22.5681 33.2135 22.0762 33.3334 21.5553 33.3334H18.4444C17.909 33.3334 17.4316 33.2135 16.983 32.9737C16.5345 32.734 16.1872 32.401 15.9123 31.9747L14.2918 29.3374ZM25.7224 18.6814H28.8333L30.4249 16.0174L28.8333 13.3534H25.7224L24.0874 16.0174L25.7224 18.6814ZM18.4878 22.6774H21.5263L23.1469 20.0134L21.5263 17.3494H18.4878L16.8673 20.0134L18.4878 22.6774ZM18.4878 14.6854H21.5263L23.1903 11.9814L21.5697 9.35736H18.4589L16.8383 11.9814L18.5023 14.6854H18.4878ZM15.9268 16.0174L14.3062 13.3534H11.2388L9.61821 16.0174L11.2388 18.6814H14.3062L15.9268 16.0174ZM15.9268 24.0094L14.3062 21.3454H11.1954L9.60374 24.0094L11.2243 26.6734H14.2918L15.9123 24.0094H15.9268ZM18.4878 25.3414L16.8239 28.032L18.4444 30.6694H21.5553L23.1758 28.032L21.5119 25.3414H18.4733H18.4878ZM25.7224 26.6734H28.7899L30.4104 24.0094L28.7899 21.3454H25.7224L24.0874 24.0094L25.7224 26.6734Z'
          fill='#EEE1D2'
        ></path>
      </g>
      <defs>
        <filter
          id='filter0_dd_6594_45'
          x='5.6665'
          y='6.16672'
          width='28.6666'
          height='28.6667'
          filterUnits='userSpaceOnUse'
          color-interpolation-filters='sRGB'
        >
          <feFlood flood-opacity='0' result='BackgroundImageFix'></feFlood>
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          ></feColorMatrix>
          <feOffset dy='0.5'></feOffset>
          <feGaussianBlur stdDeviation='0.5'></feGaussianBlur>
          <feComposite in2='hardAlpha' operator='out'></feComposite>
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.45 0'
          ></feColorMatrix>
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_6594_45'
          ></feBlend>
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          ></feColorMatrix>
          <feOffset dy='0.5'></feOffset>
          <feGaussianBlur stdDeviation='0.5'></feGaussianBlur>
          <feComposite in2='hardAlpha' operator='out'></feComposite>
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0.909804 0 0 0 0 0.490196 0 0 0 0 0.247059 0 0 0 0.75 0'
          ></feColorMatrix>
          <feBlend
            mode='normal'
            in2='effect1_dropShadow_6594_45'
            result='effect2_dropShadow_6594_45'
          ></feBlend>
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect2_dropShadow_6594_45'
            result='shape'
          ></feBlend>
        </filter>
        <radialGradient
          id='paint0_radial_6594_45'
          cx='0'
          cy='0'
          r='1'
          gradientUnits='userSpaceOnUse'
          gradientTransform='translate(20 20) rotate(90) scale(20)'
        >
          <stop stop-color='#E9D0B4'></stop>
          <stop offset='1' stop-color='#DA9713'></stop>
        </radialGradient>
        <radialGradient
          id='paint1_radial_6594_45'
          cx='0'
          cy='0'
          r='1'
          gradientUnits='userSpaceOnUse'
          gradientTransform='translate(20 20) rotate(90) scale(20)'
        >
          <stop stop-color='#E9D0B4'></stop>
          <stop offset='1' stop-color='#EC8A19'></stop>
        </radialGradient>
      </defs>
    </svg>
  )
}

export default HONEY
