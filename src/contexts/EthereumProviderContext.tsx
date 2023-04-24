import { Web3Provider } from '@ethersproject/providers'
import detectEthereumProvider from '@metamask/detect-provider'
import { BigNumber, ethers } from 'ethers'
import React, {
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'
import { useSelector } from 'react-redux'
import {
  selectDappOption,
  selectErrorHandler,
  selectProvider,
  selectWalletAutoConnect
} from '../store/selectors'
import { DAppOptions } from '../interface'

export type Provider = ethers.providers.Web3Provider | undefined
export type Signer = ethers.Signer | undefined

interface IEthereumProviderContext {
  connect(): void
  disconnect(): void
  provider: Provider
  chainId: number | undefined
  signer: Signer
  signerAddress: string | undefined
  providerError: string | null
}

const EthereumProviderContext = React.createContext<IEthereumProviderContext>({
  connect: () => {},
  disconnect: () => {},
  provider: undefined,
  chainId: undefined,
  signer: undefined,
  signerAddress: undefined,
  providerError: null
})
export const EthereumProvider = ({ children }: { children: ReactNode }) => {
  const dAppOption = useSelector(selectDappOption)
  const errorHandler = useSelector(selectErrorHandler)
  const autoConnect = useSelector(selectWalletAutoConnect)
  const [providerError, setProviderError] = useState<string | null>(null)
  const [provider, setProvider] = useState<Provider>(undefined)
  const [chainId, setChainId] = useState<number | undefined>(undefined)
  const [signer, setSigner] = useState<Signer>(undefined)
  const [signerAddress, setSignerAddress] = useState<string | undefined>(
    undefined
  )
  const ethereumProvider = useSelector(selectProvider)

  const connect = useCallback(() => {
    setProviderError(null)

    const handleProvider = (
      web3Provider: Web3Provider,
      detectedProvider: any
    ) => {
      web3Provider
        .send('eth_requestAccounts', [])
        .then(() => {
          setProviderError(null)
          setProvider(web3Provider)
          web3Provider
            .getNetwork()
            .then((network) => {
              setChainId(network.chainId)
            })
            .catch((e) => {
              errorHandler(e)
              setProviderError('An error occurred while getting the network')
            })
          const signer = web3Provider.getSigner()
          setSigner(signer)
          signer
            .getAddress()
            .then((address) => {
              setSignerAddress(address)
            })
            .catch((e) => {
              errorHandler(e)
              setProviderError(
                'An error occurred while getting the signer address'
              )
            })
          // TODO: try using ethers directly
          // @ts-ignore
          if (detectedProvider && detectedProvider.on) {
            // @ts-ignore
            detectedProvider.on('chainChanged', (chainId) => {
              try {
                setChainId(BigNumber.from(chainId).toNumber())
              } catch (e) {
                errorHandler(e)
              }
            })
            // @ts-ignore
            detectedProvider.on('accountsChanged', (accounts) => {
              try {
                const signer = web3Provider.getSigner()
                setSigner(signer)
                signer
                  .getAddress()
                  .then((address) => {
                    setSignerAddress(address)
                  })
                  .catch((e) => {
                    errorHandler(e)
                    setProviderError(
                      'An error occurred while getting the signer address'
                    )
                  })
              } catch (e) {
                errorHandler(e)
              }
            })
          }
        })
        .catch((e) => {
          errorHandler(e)
          setProviderError('An error occurred while requesting eth accounts')
        })
    }

    if (ethereumProvider) {
      handleProvider(ethereumProvider, ethereumProvider)
    } else if (autoConnect && dAppOption !== DAppOptions.LightDemo) {
      detectEthereumProvider()
        .then((detectedProvider) => {
          console.log(detectedProvider)
          if (detectedProvider) {
            const provider = new ethers.providers.Web3Provider(
              // @ts-ignore
              detectedProvider,
              'any'
            )

            handleProvider(provider, detectedProvider)
          } else {
            setProviderError('Please install MetaMask')
          }
        })
        .catch((e) => {
          errorHandler(e)
          setProviderError('Please install MetaMask')
        })
    }
  }, [ethereumProvider, autoConnect, dAppOption])

  const disconnect = useCallback(() => {
    setProviderError(null)
    setProvider(undefined)
    setChainId(undefined)
    setSigner(undefined)
    setSignerAddress(undefined)
  }, [])
  const contextValue = useMemo(
    () => ({
      connect,
      disconnect,
      provider,
      chainId,
      signer,
      signerAddress,
      providerError
    }),
    [
      connect,
      disconnect,
      provider,
      chainId,
      signer,
      signerAddress,
      providerError
    ]
  )
  return (
    <EthereumProviderContext.Provider value={contextValue}>
      {children}
    </EthereumProviderContext.Provider>
  )
}
export const useEthereumProvider = () => {
  return useContext(EthereumProviderContext)
}
