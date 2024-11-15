// plugins/evm/index.tsx
import { store } from '../../store'
import { registerPlugin } from '../../store/pluginSlice'
import { setupWeb3Modal } from './config/modalConfig'

const EVMPlugin = {
  id: 'evm',
  initialize: (walletConnectProjectId) => setupWeb3Modal(walletConnectProjectId)
}

store.dispatch(registerPlugin(EVMPlugin))

export default EVMPlugin
