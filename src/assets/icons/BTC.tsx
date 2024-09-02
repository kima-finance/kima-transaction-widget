import React from 'react'

const BTC = ({ width = 59, height = 58, ...rest }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 21 20'
      xmlns='http://www.w3.org/2000/svg'
      {...rest}
    >
      <circle cx='10.5' cy='10' r='10' fill='#F7931A' />
      <mask
        id='path-2-outside-1_72_686'
        maskUnits='userSpaceOnUse'
        x='3.59804'
        y='2.52942'
        width='13'
        height='15'
        fill='black'
      >
        <rect fill='white' x='3.59804' y='2.52942' width='13' height='15' />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M10.4059 3.54536C10.4019 3.55333 10.2964 3.96177 10.1749 4.45589L9.94981 5.35248C9.51363 5.25087 9.33638 5.20903 9.27663 5.19309C9.23326 5.18152 9.02514 5.12901 8.76348 5.06299C8.66466 5.03806 8.5582 5.01119 8.45009 4.98388C8.05574 4.88626 7.72513 4.80457 7.71318 4.80457C7.70123 4.80457 7.62754 5.07155 7.54787 5.39631C7.4682 5.72307 7.40447 5.99005 7.40845 5.99205C7.41244 5.99205 7.59766 6.03787 7.82272 6.09366C8.04778 6.14945 8.2808 6.21321 8.34055 6.23512C8.4003 6.25903 8.48992 6.31083 8.53971 6.35467C8.5915 6.3985 8.64726 6.47222 8.67316 6.53C8.69706 6.5838 8.72096 6.67146 8.72693 6.72725C8.73888 6.81292 8.65523 7.16558 8.10752 9.36919C7.52198 11.7222 7.47019 11.9175 7.41244 11.9892C7.37858 12.0331 7.32082 12.0869 7.28298 12.1128C7.2312 12.1466 7.18738 12.1566 7.09576 12.1566C7.02008 12.1566 6.8249 12.1167 6.56399 12.051L6.15172 11.9474L5.59804 13.2225C7.31883 13.6549 7.82471 13.7864 7.83467 13.7963C7.84463 13.8043 7.75102 14.2108 7.62754 14.7029C7.52892 15.0943 7.44174 15.4375 7.40859 15.5679C7.40024 15.6008 7.39531 15.6202 7.39451 15.6234C7.38655 15.6473 7.49409 15.6812 7.93823 15.7888C8.24097 15.8645 8.4959 15.9183 8.50187 15.9083C8.50785 15.9003 8.6154 15.4879 8.73689 14.9958L8.96195 14.0992C9.63513 14.2685 9.83628 14.3223 9.84027 14.3283C9.84624 14.3343 9.75064 14.7467 9.62517 15.2448C9.49969 15.7429 9.40011 16.1534 9.4021 16.1554C9.40385 16.1571 9.59671 16.2063 9.8494 16.2707C9.88512 16.2798 9.92203 16.2892 9.95977 16.2988C10.2625 16.3765 10.5154 16.4343 10.5194 16.4243C10.5227 16.4178 10.5937 16.1334 10.6889 15.7524C10.7091 15.6713 10.7304 15.5859 10.7524 15.4979L10.9795 14.5834C11.031 14.591 11.0999 14.6014 11.1782 14.6132C11.2635 14.626 11.3599 14.6405 11.4575 14.6551C11.6447 14.683 11.9435 14.7168 12.1247 14.7268C12.3637 14.7427 12.529 14.7427 12.7322 14.7268C12.8855 14.7149 13.0827 14.6909 13.1703 14.673C13.2579 14.6571 13.3974 14.6212 13.479 14.5933C13.5607 14.5654 13.6822 14.5176 13.7479 14.4877C13.8136 14.4558 13.9351 14.3861 14.0168 14.3323C14.0984 14.2765 14.2239 14.1749 14.2936 14.1052C14.3633 14.0354 14.4749 13.9079 14.5406 13.8203C14.6063 13.7326 14.7059 13.5612 14.7656 13.4417C14.8234 13.3222 14.907 13.1149 14.9509 12.9834C14.9947 12.8519 15.0445 12.6686 15.0624 12.575C15.0803 12.4814 15.1002 12.306 15.1062 12.1865C15.1142 12.0271 15.1082 11.9155 15.0843 11.778C15.0644 11.6744 15.0226 11.521 14.9907 11.4393C14.9568 11.3576 14.8831 11.2182 14.8234 11.1305C14.7656 11.0428 14.6481 10.9034 14.5625 10.8217C14.4749 10.738 14.3374 10.6264 14.2558 10.5706C14.1741 10.5148 14.0626 10.4451 14.0068 10.4152L13.9072 10.3574C14.2 10.2618 14.3573 10.1941 14.443 10.1442C14.5286 10.0944 14.6621 9.99681 14.7397 9.92508C14.8154 9.85335 14.917 9.74178 14.9628 9.67603C15.0106 9.61028 15.0743 9.50269 15.1082 9.43694C15.1401 9.37119 15.1918 9.24567 15.2197 9.158C15.2496 9.07033 15.2914 8.89102 15.3153 8.75952C15.3472 8.57223 15.3532 8.47261 15.3452 8.30126C15.3392 8.17972 15.3153 8.01037 15.2914 7.9227C15.2695 7.83503 15.2257 7.70951 15.1958 7.64376C15.164 7.57801 15.1002 7.46644 15.0524 7.39471C15.0046 7.32298 14.9031 7.19945 14.8254 7.11776C14.7477 7.03807 14.6123 6.91852 14.5246 6.85277C14.437 6.78702 14.2797 6.68142 14.1761 6.62165C14.0725 6.55989 13.8754 6.46027 13.7379 6.3985C13.6005 6.33674 13.3974 6.25106 13.2838 6.20723C13.1305 6.14945 13.0827 6.12155 13.0887 6.09964C13.0946 6.0837 13.1982 5.67127 13.3197 5.18313C13.4412 4.69498 13.5368 4.2965 13.5348 4.29451C13.5322 4.29324 13.4308 4.26765 13.2802 4.22963C13.1947 4.20804 13.0933 4.18246 12.9851 4.15504C12.6366 4.06737 12.4374 4.02553 12.4274 4.03749C12.4175 4.04745 12.3159 4.44992 12.1984 4.9281C12.0809 5.40827 11.9753 5.80078 11.9654 5.80078C11.9554 5.80078 11.7542 5.75495 11.5232 5.69916C11.2902 5.64537 11.095 5.59556 11.089 5.58958C11.0831 5.58559 11.1807 5.17914 11.3041 4.68901C11.4276 4.19887 11.5252 3.7964 11.5232 3.79441C11.5192 3.79242 11.2822 3.73265 10.9954 3.66092C10.7066 3.58919 10.4577 3.52942 10.4417 3.52942C10.4278 3.52942 10.4099 3.5354 10.4059 3.54337V3.54536ZM10.7824 6.93276C10.7764 6.94073 10.651 7.43286 10.5036 8.0266C10.3542 8.62233 10.2327 9.12044 10.2327 9.13239C10.2327 9.14833 10.3702 9.19216 10.6052 9.25194C10.8123 9.30374 11.0792 9.3655 11.1987 9.38742C11.3182 9.40934 11.5253 9.43524 11.6568 9.4452C11.7962 9.45516 11.9814 9.45516 12.0989 9.4452C12.2124 9.43524 12.3718 9.40535 12.4574 9.37746C12.543 9.35156 12.6526 9.30374 12.7024 9.27186C12.7522 9.24197 12.8259 9.1822 12.8657 9.14235C12.9075 9.10251 12.9633 9.03277 12.9912 8.98894C13.0191 8.9451 13.0649 8.83951 13.0927 8.75383C13.1306 8.63827 13.1445 8.55858 13.1465 8.43106C13.1465 8.30355 13.1346 8.22783 13.1007 8.12224C13.0748 8.04453 13.0151 7.93296 12.9713 7.87318C12.9254 7.81341 12.8518 7.72973 12.8059 7.68789C12.7601 7.64804 12.6566 7.57233 12.5769 7.52053C12.4992 7.46872 12.3479 7.38903 12.2443 7.3432C12.1407 7.29738 11.9436 7.22366 11.8061 7.17982C11.6687 7.13599 11.3959 7.06426 11.1987 7.01844C11.0015 6.97261 10.8282 6.93077 10.8143 6.92679C10.8003 6.9228 10.7864 6.92479 10.7824 6.93276ZM9.63523 11.5133C9.46992 12.1908 9.33648 12.7466 9.34046 12.7486C9.34445 12.7506 9.50378 12.7925 9.69498 12.8423C9.88618 12.8921 10.1511 12.9558 10.2825 12.9817C10.414 13.0096 10.6191 13.0475 10.7406 13.0674C10.9019 13.0933 11.0672 13.1033 11.368 13.1033C11.6986 13.1033 11.8041 13.0953 11.9256 13.0654C12.0073 13.0455 12.1467 12.9957 12.2343 12.9538C12.3399 12.904 12.4295 12.8423 12.5012 12.7725C12.561 12.7128 12.6287 12.6291 12.6546 12.5853C12.6805 12.5414 12.7203 12.4518 12.7422 12.386C12.7661 12.3203 12.79 12.1908 12.796 12.0971C12.802 12.0015 12.798 11.8799 12.784 11.8182C12.7721 11.7584 12.7342 11.6508 12.6984 11.5791C12.6606 11.5014 12.5789 11.3918 12.4933 11.3021C12.4176 11.2224 12.2821 11.1089 12.1945 11.0511C12.1069 10.9913 11.9416 10.8997 11.8261 10.8439C11.7105 10.7901 11.4994 10.7044 11.358 10.6566C11.2166 10.6068 10.9955 10.541 10.8701 10.5072C10.7446 10.4733 10.4837 10.4095 10.2925 10.3637C10.1013 10.3199 9.94195 10.284 9.93995 10.284C9.93796 10.284 9.80054 10.8379 9.63523 11.5133Z'
        />
      </mask>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M10.4059 3.54536C10.4019 3.55333 10.2964 3.96177 10.1749 4.45589L9.94981 5.35248C9.51363 5.25087 9.33638 5.20903 9.27663 5.19309C9.23326 5.18152 9.02514 5.12901 8.76348 5.06299C8.66466 5.03806 8.5582 5.01119 8.45009 4.98388C8.05574 4.88626 7.72513 4.80457 7.71318 4.80457C7.70123 4.80457 7.62754 5.07155 7.54787 5.39631C7.4682 5.72307 7.40447 5.99005 7.40845 5.99205C7.41244 5.99205 7.59766 6.03787 7.82272 6.09366C8.04778 6.14945 8.2808 6.21321 8.34055 6.23512C8.4003 6.25903 8.48992 6.31083 8.53971 6.35467C8.5915 6.3985 8.64726 6.47222 8.67316 6.53C8.69706 6.5838 8.72096 6.67146 8.72693 6.72725C8.73888 6.81292 8.65523 7.16558 8.10752 9.36919C7.52198 11.7222 7.47019 11.9175 7.41244 11.9892C7.37858 12.0331 7.32082 12.0869 7.28298 12.1128C7.2312 12.1466 7.18738 12.1566 7.09576 12.1566C7.02008 12.1566 6.8249 12.1167 6.56399 12.051L6.15172 11.9474L5.59804 13.2225C7.31883 13.6549 7.82471 13.7864 7.83467 13.7963C7.84463 13.8043 7.75102 14.2108 7.62754 14.7029C7.52892 15.0943 7.44174 15.4375 7.40859 15.5679C7.40024 15.6008 7.39531 15.6202 7.39451 15.6234C7.38655 15.6473 7.49409 15.6812 7.93823 15.7888C8.24097 15.8645 8.4959 15.9183 8.50187 15.9083C8.50785 15.9003 8.6154 15.4879 8.73689 14.9958L8.96195 14.0992C9.63513 14.2685 9.83628 14.3223 9.84027 14.3283C9.84624 14.3343 9.75064 14.7467 9.62517 15.2448C9.49969 15.7429 9.40011 16.1534 9.4021 16.1554C9.40385 16.1571 9.59671 16.2063 9.8494 16.2707C9.88512 16.2798 9.92203 16.2892 9.95977 16.2988C10.2625 16.3765 10.5154 16.4343 10.5194 16.4243C10.5227 16.4178 10.5937 16.1334 10.6889 15.7524C10.7091 15.6713 10.7304 15.5859 10.7524 15.4979L10.9795 14.5834C11.031 14.591 11.0999 14.6014 11.1782 14.6132C11.2635 14.626 11.3599 14.6405 11.4575 14.6551C11.6447 14.683 11.9435 14.7168 12.1247 14.7268C12.3637 14.7427 12.529 14.7427 12.7322 14.7268C12.8855 14.7149 13.0827 14.6909 13.1703 14.673C13.2579 14.6571 13.3974 14.6212 13.479 14.5933C13.5607 14.5654 13.6822 14.5176 13.7479 14.4877C13.8136 14.4558 13.9351 14.3861 14.0168 14.3323C14.0984 14.2765 14.2239 14.1749 14.2936 14.1052C14.3633 14.0354 14.4749 13.9079 14.5406 13.8203C14.6063 13.7326 14.7059 13.5612 14.7656 13.4417C14.8234 13.3222 14.907 13.1149 14.9509 12.9834C14.9947 12.8519 15.0445 12.6686 15.0624 12.575C15.0803 12.4814 15.1002 12.306 15.1062 12.1865C15.1142 12.0271 15.1082 11.9155 15.0843 11.778C15.0644 11.6744 15.0226 11.521 14.9907 11.4393C14.9568 11.3576 14.8831 11.2182 14.8234 11.1305C14.7656 11.0428 14.6481 10.9034 14.5625 10.8217C14.4749 10.738 14.3374 10.6264 14.2558 10.5706C14.1741 10.5148 14.0626 10.4451 14.0068 10.4152L13.9072 10.3574C14.2 10.2618 14.3573 10.1941 14.443 10.1442C14.5286 10.0944 14.6621 9.99681 14.7397 9.92508C14.8154 9.85335 14.917 9.74178 14.9628 9.67603C15.0106 9.61028 15.0743 9.50269 15.1082 9.43694C15.1401 9.37119 15.1918 9.24567 15.2197 9.158C15.2496 9.07033 15.2914 8.89102 15.3153 8.75952C15.3472 8.57223 15.3532 8.47261 15.3452 8.30126C15.3392 8.17972 15.3153 8.01037 15.2914 7.9227C15.2695 7.83503 15.2257 7.70951 15.1958 7.64376C15.164 7.57801 15.1002 7.46644 15.0524 7.39471C15.0046 7.32298 14.9031 7.19945 14.8254 7.11776C14.7477 7.03807 14.6123 6.91852 14.5246 6.85277C14.437 6.78702 14.2797 6.68142 14.1761 6.62165C14.0725 6.55989 13.8754 6.46027 13.7379 6.3985C13.6005 6.33674 13.3974 6.25106 13.2838 6.20723C13.1305 6.14945 13.0827 6.12155 13.0887 6.09964C13.0946 6.0837 13.1982 5.67127 13.3197 5.18313C13.4412 4.69498 13.5368 4.2965 13.5348 4.29451C13.5322 4.29324 13.4308 4.26765 13.2802 4.22963C13.1947 4.20804 13.0933 4.18246 12.9851 4.15504C12.6366 4.06737 12.4374 4.02553 12.4274 4.03749C12.4175 4.04745 12.3159 4.44992 12.1984 4.9281C12.0809 5.40827 11.9753 5.80078 11.9654 5.80078C11.9554 5.80078 11.7542 5.75495 11.5232 5.69916C11.2902 5.64537 11.095 5.59556 11.089 5.58958C11.0831 5.58559 11.1807 5.17914 11.3041 4.68901C11.4276 4.19887 11.5252 3.7964 11.5232 3.79441C11.5192 3.79242 11.2822 3.73265 10.9954 3.66092C10.7066 3.58919 10.4577 3.52942 10.4417 3.52942C10.4278 3.52942 10.4099 3.5354 10.4059 3.54337V3.54536ZM10.7824 6.93276C10.7764 6.94073 10.651 7.43286 10.5036 8.0266C10.3542 8.62233 10.2327 9.12044 10.2327 9.13239C10.2327 9.14833 10.3702 9.19216 10.6052 9.25194C10.8123 9.30374 11.0792 9.3655 11.1987 9.38742C11.3182 9.40934 11.5253 9.43524 11.6568 9.4452C11.7962 9.45516 11.9814 9.45516 12.0989 9.4452C12.2124 9.43524 12.3718 9.40535 12.4574 9.37746C12.543 9.35156 12.6526 9.30374 12.7024 9.27186C12.7522 9.24197 12.8259 9.1822 12.8657 9.14235C12.9075 9.10251 12.9633 9.03277 12.9912 8.98894C13.0191 8.9451 13.0649 8.83951 13.0927 8.75383C13.1306 8.63827 13.1445 8.55858 13.1465 8.43106C13.1465 8.30355 13.1346 8.22783 13.1007 8.12224C13.0748 8.04453 13.0151 7.93296 12.9713 7.87318C12.9254 7.81341 12.8518 7.72973 12.8059 7.68789C12.7601 7.64804 12.6566 7.57233 12.5769 7.52053C12.4992 7.46872 12.3479 7.38903 12.2443 7.3432C12.1407 7.29738 11.9436 7.22366 11.8061 7.17982C11.6687 7.13599 11.3959 7.06426 11.1987 7.01844C11.0015 6.97261 10.8282 6.93077 10.8143 6.92679C10.8003 6.9228 10.7864 6.92479 10.7824 6.93276ZM9.63523 11.5133C9.46992 12.1908 9.33648 12.7466 9.34046 12.7486C9.34445 12.7506 9.50378 12.7925 9.69498 12.8423C9.88618 12.8921 10.1511 12.9558 10.2825 12.9817C10.414 13.0096 10.6191 13.0475 10.7406 13.0674C10.9019 13.0933 11.0672 13.1033 11.368 13.1033C11.6986 13.1033 11.8041 13.0953 11.9256 13.0654C12.0073 13.0455 12.1467 12.9957 12.2343 12.9538C12.3399 12.904 12.4295 12.8423 12.5012 12.7725C12.561 12.7128 12.6287 12.6291 12.6546 12.5853C12.6805 12.5414 12.7203 12.4518 12.7422 12.386C12.7661 12.3203 12.79 12.1908 12.796 12.0971C12.802 12.0015 12.798 11.8799 12.784 11.8182C12.7721 11.7584 12.7342 11.6508 12.6984 11.5791C12.6606 11.5014 12.5789 11.3918 12.4933 11.3021C12.4176 11.2224 12.2821 11.1089 12.1945 11.0511C12.1069 10.9913 11.9416 10.8997 11.8261 10.8439C11.7105 10.7901 11.4994 10.7044 11.358 10.6566C11.2166 10.6068 10.9955 10.541 10.8701 10.5072C10.7446 10.4733 10.4837 10.4095 10.2925 10.3637C10.1013 10.3199 9.94195 10.284 9.93995 10.284C9.93796 10.284 9.80054 10.8379 9.63523 11.5133Z'
        fill='#F7931A'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M10.4059 3.54536C10.4019 3.55333 10.2964 3.96177 10.1749 4.45589L9.94981 5.35248C9.51363 5.25087 9.33638 5.20903 9.27663 5.19309C9.23326 5.18152 9.02514 5.12901 8.76348 5.06299C8.66466 5.03806 8.5582 5.01119 8.45009 4.98388C8.05574 4.88626 7.72513 4.80457 7.71318 4.80457C7.70123 4.80457 7.62754 5.07155 7.54787 5.39631C7.4682 5.72307 7.40447 5.99005 7.40845 5.99205C7.41244 5.99205 7.59766 6.03787 7.82272 6.09366C8.04778 6.14945 8.2808 6.21321 8.34055 6.23512C8.4003 6.25903 8.48992 6.31083 8.53971 6.35467C8.5915 6.3985 8.64726 6.47222 8.67316 6.53C8.69706 6.5838 8.72096 6.67146 8.72693 6.72725C8.73888 6.81292 8.65523 7.16558 8.10752 9.36919C7.52198 11.7222 7.47019 11.9175 7.41244 11.9892C7.37858 12.0331 7.32082 12.0869 7.28298 12.1128C7.2312 12.1466 7.18738 12.1566 7.09576 12.1566C7.02008 12.1566 6.8249 12.1167 6.56399 12.051L6.15172 11.9474L5.59804 13.2225C7.31883 13.6549 7.82471 13.7864 7.83467 13.7963C7.84463 13.8043 7.75102 14.2108 7.62754 14.7029C7.52892 15.0943 7.44174 15.4375 7.40859 15.5679C7.40024 15.6008 7.39531 15.6202 7.39451 15.6234C7.38655 15.6473 7.49409 15.6812 7.93823 15.7888C8.24097 15.8645 8.4959 15.9183 8.50187 15.9083C8.50785 15.9003 8.6154 15.4879 8.73689 14.9958L8.96195 14.0992C9.63513 14.2685 9.83628 14.3223 9.84027 14.3283C9.84624 14.3343 9.75064 14.7467 9.62517 15.2448C9.49969 15.7429 9.40011 16.1534 9.4021 16.1554C9.40385 16.1571 9.59671 16.2063 9.8494 16.2707C9.88512 16.2798 9.92203 16.2892 9.95977 16.2988C10.2625 16.3765 10.5154 16.4343 10.5194 16.4243C10.5227 16.4178 10.5937 16.1334 10.6889 15.7524C10.7091 15.6713 10.7304 15.5859 10.7524 15.4979L10.9795 14.5834C11.031 14.591 11.0999 14.6014 11.1782 14.6132C11.2635 14.626 11.3599 14.6405 11.4575 14.6551C11.6447 14.683 11.9435 14.7168 12.1247 14.7268C12.3637 14.7427 12.529 14.7427 12.7322 14.7268C12.8855 14.7149 13.0827 14.6909 13.1703 14.673C13.2579 14.6571 13.3974 14.6212 13.479 14.5933C13.5607 14.5654 13.6822 14.5176 13.7479 14.4877C13.8136 14.4558 13.9351 14.3861 14.0168 14.3323C14.0984 14.2765 14.2239 14.1749 14.2936 14.1052C14.3633 14.0354 14.4749 13.9079 14.5406 13.8203C14.6063 13.7326 14.7059 13.5612 14.7656 13.4417C14.8234 13.3222 14.907 13.1149 14.9509 12.9834C14.9947 12.8519 15.0445 12.6686 15.0624 12.575C15.0803 12.4814 15.1002 12.306 15.1062 12.1865C15.1142 12.0271 15.1082 11.9155 15.0843 11.778C15.0644 11.6744 15.0226 11.521 14.9907 11.4393C14.9568 11.3576 14.8831 11.2182 14.8234 11.1305C14.7656 11.0428 14.6481 10.9034 14.5625 10.8217C14.4749 10.738 14.3374 10.6264 14.2558 10.5706C14.1741 10.5148 14.0626 10.4451 14.0068 10.4152L13.9072 10.3574C14.2 10.2618 14.3573 10.1941 14.443 10.1442C14.5286 10.0944 14.6621 9.99681 14.7397 9.92508C14.8154 9.85335 14.917 9.74178 14.9628 9.67603C15.0106 9.61028 15.0743 9.50269 15.1082 9.43694C15.1401 9.37119 15.1918 9.24567 15.2197 9.158C15.2496 9.07033 15.2914 8.89102 15.3153 8.75952C15.3472 8.57223 15.3532 8.47261 15.3452 8.30126C15.3392 8.17972 15.3153 8.01037 15.2914 7.9227C15.2695 7.83503 15.2257 7.70951 15.1958 7.64376C15.164 7.57801 15.1002 7.46644 15.0524 7.39471C15.0046 7.32298 14.9031 7.19945 14.8254 7.11776C14.7477 7.03807 14.6123 6.91852 14.5246 6.85277C14.437 6.78702 14.2797 6.68142 14.1761 6.62165C14.0725 6.55989 13.8754 6.46027 13.7379 6.3985C13.6005 6.33674 13.3974 6.25106 13.2838 6.20723C13.1305 6.14945 13.0827 6.12155 13.0887 6.09964C13.0946 6.0837 13.1982 5.67127 13.3197 5.18313C13.4412 4.69498 13.5368 4.2965 13.5348 4.29451C13.5322 4.29324 13.4308 4.26765 13.2802 4.22963C13.1947 4.20804 13.0933 4.18246 12.9851 4.15504C12.6366 4.06737 12.4374 4.02553 12.4274 4.03749C12.4175 4.04745 12.3159 4.44992 12.1984 4.9281C12.0809 5.40827 11.9753 5.80078 11.9654 5.80078C11.9554 5.80078 11.7542 5.75495 11.5232 5.69916C11.2902 5.64537 11.095 5.59556 11.089 5.58958C11.0831 5.58559 11.1807 5.17914 11.3041 4.68901C11.4276 4.19887 11.5252 3.7964 11.5232 3.79441C11.5192 3.79242 11.2822 3.73265 10.9954 3.66092C10.7066 3.58919 10.4577 3.52942 10.4417 3.52942C10.4278 3.52942 10.4099 3.5354 10.4059 3.54337V3.54536ZM10.7824 6.93276C10.7764 6.94073 10.651 7.43286 10.5036 8.0266C10.3542 8.62233 10.2327 9.12044 10.2327 9.13239C10.2327 9.14833 10.3702 9.19216 10.6052 9.25194C10.8123 9.30374 11.0792 9.3655 11.1987 9.38742C11.3182 9.40934 11.5253 9.43524 11.6568 9.4452C11.7962 9.45516 11.9814 9.45516 12.0989 9.4452C12.2124 9.43524 12.3718 9.40535 12.4574 9.37746C12.543 9.35156 12.6526 9.30374 12.7024 9.27186C12.7522 9.24197 12.8259 9.1822 12.8657 9.14235C12.9075 9.10251 12.9633 9.03277 12.9912 8.98894C13.0191 8.9451 13.0649 8.83951 13.0927 8.75383C13.1306 8.63827 13.1445 8.55858 13.1465 8.43106C13.1465 8.30355 13.1346 8.22783 13.1007 8.12224C13.0748 8.04453 13.0151 7.93296 12.9713 7.87318C12.9254 7.81341 12.8518 7.72973 12.8059 7.68789C12.7601 7.64804 12.6566 7.57233 12.5769 7.52053C12.4992 7.46872 12.3479 7.38903 12.2443 7.3432C12.1407 7.29738 11.9436 7.22366 11.8061 7.17982C11.6687 7.13599 11.3959 7.06426 11.1987 7.01844C11.0015 6.97261 10.8282 6.93077 10.8143 6.92679C10.8003 6.9228 10.7864 6.92479 10.7824 6.93276ZM9.63523 11.5133C9.46992 12.1908 9.33648 12.7466 9.34046 12.7486C9.34445 12.7506 9.50378 12.7925 9.69498 12.8423C9.88618 12.8921 10.1511 12.9558 10.2825 12.9817C10.414 13.0096 10.6191 13.0475 10.7406 13.0674C10.9019 13.0933 11.0672 13.1033 11.368 13.1033C11.6986 13.1033 11.8041 13.0953 11.9256 13.0654C12.0073 13.0455 12.1467 12.9957 12.2343 12.9538C12.3399 12.904 12.4295 12.8423 12.5012 12.7725C12.561 12.7128 12.6287 12.6291 12.6546 12.5853C12.6805 12.5414 12.7203 12.4518 12.7422 12.386C12.7661 12.3203 12.79 12.1908 12.796 12.0971C12.802 12.0015 12.798 11.8799 12.784 11.8182C12.7721 11.7584 12.7342 11.6508 12.6984 11.5791C12.6606 11.5014 12.5789 11.3918 12.4933 11.3021C12.4176 11.2224 12.2821 11.1089 12.1945 11.0511C12.1069 10.9913 11.9416 10.8997 11.8261 10.8439C11.7105 10.7901 11.4994 10.7044 11.358 10.6566C11.2166 10.6068 10.9955 10.541 10.8701 10.5072C10.7446 10.4733 10.4837 10.4095 10.2925 10.3637C10.1013 10.3199 9.94195 10.284 9.93995 10.284C9.93796 10.284 9.80054 10.8379 9.63523 11.5133Z'
        stroke='black'
        strokeWidth='2'
        mask='url(#path-2-outside-1_72_686)'
      />
    </svg>
  )
}

export default BTC