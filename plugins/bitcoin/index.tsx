// plugins/bitcoin/index.tsx
import { store } from '../../store'
import { registerPlugin } from '../../store/pluginSlice'

const BitcoinPlugin = {
  id: 'bitcoin'
}

store.dispatch(registerPlugin(BitcoinPlugin))

export default BitcoinPlugin
