import {
  KimaTransactionWidget,
  KimaProvider,
  ModeOptions,
  ColorModeOptions,
  NetworkOptions
} from '@kimafinance/kima-transaction-widget'
import '@kimafinance/kima-transaction-widget/index.css'

function App() {
  return (
    <KimaProvider walletConnectProjectId='e579511a495b5c312b572b036e60555a'>
      <div className='container'>
        <KimaTransactionWidget
          theme={{
            colorMode: ColorModeOptions.light
          }}
          networkOption={NetworkOptions.testnet}
          mode={ModeOptions.bridge}
          // txId={'26903'}
          kimaBackendUrl='http://localhost:3001'
          kimaExplorer='https://explorer.sardis.kima.network'
          // autoSwitchChain={false}
          // titleOption={{
          //   initialTitle: 'New Purchase'
          // }}
          paymentTitleOption={{
            title:
              'You can now purchase our NFT on Polygon, using funds from other chains.',
            style: {
              fontSize: '1.2em',
              fontWeight: '500'
            }
          }}
          // transactionOption={{
          //   targetChain: SupportNetworks.ETHEREUM,
          //   targetAddress: "0x10c033E050e10510a951a56e4A14B4CD3de6CA67",
          //   amount: 3,
          //   currency: "USDK",
          // }}
        />
      </div>
    </KimaProvider>
  )
}

export default App
