import { TronWeb } from 'tronweb'
import { TRON_USDK_OWNER_ADDRESS } from './utils/constants'

export const tronWebTestnet: any = new TronWeb({
  fullHost: 'https://api.nileex.io'
})
export const tronWebMainnet: any = new TronWeb({
  fullHost: 'https://api.trongrid.io'
})
tronWebTestnet.setAddress(TRON_USDK_OWNER_ADDRESS)
tronWebMainnet.setAddress(TRON_USDK_OWNER_ADDRESS)
