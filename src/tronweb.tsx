import { TronWeb } from 'tronweb'
import { TRON_USDK_OWNER_ADDRESS } from './utils/config'
export const tronWeb: any = new TronWeb({
  fullHost: 'https://api.trongrid.io'
})
tronWeb.setAddress(TRON_USDK_OWNER_ADDRESS)
