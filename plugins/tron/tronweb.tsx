import { TronWeb } from 'tronweb'
export const TRON_USDK_OWNER_ADDRESS = 'TBVn4bsBN4DhtZ7D3vEVpAyqkvdFn7zmpU'

export const tronWebTestnet = new TronWeb({
  fullHost: 'https://api.nileex.io'
})
export const tronWebMainnet = new TronWeb({
  fullHost: 'https://api.trongrid.io'
})
tronWebTestnet.setAddress(TRON_USDK_OWNER_ADDRESS)
tronWebMainnet.setAddress(TRON_USDK_OWNER_ADDRESS)
