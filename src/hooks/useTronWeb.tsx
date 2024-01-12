import TronWeb from 'tronweb'
import { TRON_USDK_OWNER_ADDRESS } from '../utils/config'

const useTronWeb = () => {
  const tronWeb = new TronWeb({
    fullHost: 'https://nile.trongrid.io',
    headers: {
      'TRON-PRO-API-KEY': '617993c6-85f2-4754-9217-ce7735202461'
    }
  })

  tronWeb.setAddress(TRON_USDK_OWNER_ADDRESS)

  return tronWeb
}

export default useTronWeb
