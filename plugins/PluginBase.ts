import { updatePluginData } from '@store/pluginSlice'
import {
  Plugin,
  PluginChain,
  PluginData,
  PluginInit,
  PluginProviderProps
} from './pluginTypes'

export abstract class PluginBase implements Plugin {
  protected _store: any
  data: PluginData

  constructor(store: any, id: string) {
    this._store = store
    this.data = {
      id,
      pluginData: {
        networks: []
      }
    }
  }

  initialize = (): PluginInit => {
    // prefetch chain data but don't wait for it
    this.getData()

    return {
      data: this.data,
      provider: this.Provider
    }
  }

  protected getData = async (): Promise<void> => {
    try {
      const networks: PluginChain[] = await this.fetchChains()
      console.info(`${this.data.id} networks fetched:`, networks)

      // update store
      this.data = {
        ...this.data,
        pluginData: {
          ...this.data.pluginData,
          networks
        }
      }
      this._store.dispatch(updatePluginData(this.data))
    } catch (error) {
      console.error(`Failed to fetch ${this.data.id} networks:`, error)
    }
  }

  protected abstract fetchChains(): Promise<PluginChain[]>
  protected abstract Provider(props: PluginProviderProps): JSX.Element
}
