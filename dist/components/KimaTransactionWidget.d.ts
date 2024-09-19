import React from 'react';
import { TransactionOption, ThemeOptions, ModeOptions, TitleOption, PaymentTitleOption, DAppOptions, NetworkOptions } from '../interface';
import '../index.css';
import { Web3Provider } from '@ethersproject/providers';
interface Props {
    theme: ThemeOptions;
    mode: ModeOptions;
    txId?: number;
    useFIAT?: boolean;
    autoSwitchChain?: boolean;
    dAppOption?: DAppOptions;
    provider?: Web3Provider;
    titleOption?: TitleOption;
    compliantOption?: boolean;
    helpURL?: string;
    feeURL?: string;
    transactionOption?: TransactionOption;
    paymentTitleOption?: PaymentTitleOption;
    kimaBackendUrl: string;
    kimaNodeProviderQuery: string;
    kimaGraphqlProviderQuery: string;
    kimaExplorer?: string;
    networkOption?: NetworkOptions;
    errorHandler?: (e: any) => void;
    closeHandler?: (e: any) => void;
    successHandler?: (e: any) => void;
    switchChainHandler?: (chainId: number) => void;
    keplrHandler?: (e: any) => void;
}
export declare const KimaTransactionWidget: ({ mode, txId, autoSwitchChain, networkOption, provider, dAppOption, theme, titleOption, paymentTitleOption, useFIAT, helpURL, compliantOption, transactionOption, kimaBackendUrl, kimaNodeProviderQuery, kimaExplorer, feeURL, kimaGraphqlProviderQuery, errorHandler, closeHandler, successHandler, switchChainHandler, keplrHandler }: Props) => React.JSX.Element;
export {};
