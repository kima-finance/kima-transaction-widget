import { ethers } from 'ethers';
import React, { ReactNode } from 'react';
export declare type Provider = ethers.providers.Web3Provider | undefined;
export declare type Signer = ethers.Signer | undefined;
interface IEthereumProviderContext {
    connect(): void;
    disconnect(): void;
    provider: Provider;
    chainId: number | undefined;
    signer: Signer;
    signerAddress: string | undefined;
    providerError: string | null;
}
export declare const EthereumProvider: ({ children }: {
    children: ReactNode;
}) => React.JSX.Element;
export declare const useEthereumProvider: () => IEthereumProviderContext;
export {};
