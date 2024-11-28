// plugins/fiat/index.tsx
import { store } from '@store/index'
import { registerPlugin } from '@store/pluginSlice'

const FiatPlugin = {
  id: 'fiat'
}

store.dispatch(registerPlugin(FiatPlugin))

export default FiatPlugin
