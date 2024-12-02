import { initializePlugins } from '../src/pluginRegistry'
import evmPlugin from '@plugins/evm'
import solanaPlugin from '@plugins/solana'
import tronPlugin from '@plugins/tron'

export * from './pluginTypes'

initializePlugins([evmPlugin, solanaPlugin, tronPlugin])
