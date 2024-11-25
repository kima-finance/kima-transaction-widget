// plugins/tron/initialize.tsx
import getChainData from './utils/getChainData'

export async function initialize() {
  try {
    const networks = await getChainData()
    console.info('Tron networks fetched:', networks)
    return { networks }
  } catch (error) {
    console.error('Failed to fetch Tron networks:', error)
    return { networks: [] } // Fallback to an empty array if the fetch fails
  }
}
