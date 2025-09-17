export enum NetworkOptions {
  testnet = 'testnet',
  mainnet = 'mainnet'
}

export enum ModeOptions {
  payment = 'payment',
  bridge = 'bridge',
  status = 'status',
  light = 'light'
}

export enum ColorModeOptions {
  light = 'light',
  dark = 'dark'
}

export enum DAppOptions {
  None = 'none',
  LPAdd = 'LPAdd',
  LPDrain = 'LPDrain'
}

export interface ThemeOptions {
  colorMode?: ColorModeOptions
  backgroundColorLight?: string
  backgroundColorDark?: string
}

export interface Web3ModalAccountInfo {
  address?: string
  isConnected?: boolean
  chainId?: number
}

export enum LoadingErrorTitle {
  EnvLoadingError = 'Fatal ENV Initialization Error',
  ChainLoadingError = 'Fatal Chains Initialization Error'
}

export enum LoadingErrorMessage {
  EnvLoadingError = 'There was an error loading the required environment variables from the backend. Please check that the backend is running properly and the widget points to the corresponding url.',
  ChainLoadingError = 'There was an error loading the chain data from the backend. Please check that the backend is running properly and the widget points to the corresponding url.'
}
