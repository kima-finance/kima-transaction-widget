import { initializePlugins } from '../src/pluginRegistry'
import evmPlugin from './evm'
import solanaPlugin from './solana'
import tronPlugin from './tron'
import creditCardPlugin from './credit-card'

export * from './pluginTypes'

initializePlugins([evmPlugin, solanaPlugin, tronPlugin, creditCardPlugin])
