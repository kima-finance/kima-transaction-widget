import { TronWeb } from 'tronweb'

export const tronWebTestnet: any = new TronWeb({
  fullHost: 'https://api.nileex.io'
})
export const tronWebMainnet: any = new TronWeb({
  fullHost: 'https://api.trongrid.io'
})
