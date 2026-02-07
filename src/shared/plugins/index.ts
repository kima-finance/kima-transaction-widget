import evmPlugin from './evm/adapter'
import solanaPlugin from './solana/adapter'
import tronPlugin from './tron/adapter'
import creditCardPlugin from './credit-card/adapter'
import bankPlugin from './bank/adapter'
import btcPlugin from './btc/adapter'
import { initializePlugins } from './registry'


initializePlugins([
  evmPlugin,
  solanaPlugin,
  tronPlugin,
  creditCardPlugin,
  bankPlugin,
  btcPlugin
])
