// plugins/evm/index.tsx
import { store } from '../../store'
import { registerPlugin } from '../../store/pluginSlice'
import { setupAppKitModal } from './config/modalConfig'

const EVMPlugin = {
  id: 'evm',
  initialize: (walletConnectProjectId) =>
    setupAppKitModal(walletConnectProjectId)
}

store.dispatch(registerPlugin(EVMPlugin))

export default EVMPlugin
