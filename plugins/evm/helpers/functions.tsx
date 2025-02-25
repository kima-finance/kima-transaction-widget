import { ChainData } from '@plugins/pluginTypes'
import { AppKitNetwork } from '@reown/appkit/networks'
import { Chain } from 'viem'

export const formatterInt = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0
})

export const formatterFloat = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 9
})

export function isEmptyObject(arg) {
  return typeof arg === 'object' && Object.keys(arg).length === 0
}

export const sleep = (delay) =>
  new Promise((resolve) => setTimeout(resolve, delay))

export const chainToAppkitNetwork = (chain: Chain | ChainData) => {
  return {
    id: chain.id,
    chainNamespace: 'eip155',
    caipNetworkId: `eip155:${chain.id}`
  }
}
