import React from 'react';
import { TransactionOption, ThemeOptions, ModeOptions, TitleOption, PaymentTitleOption, DAppOptions } from '../interface';
import '../index.css';
import { Web3Provider } from '@ethersproject/providers';
interface Props {
    theme: ThemeOptions;
    mode: ModeOptions;
    txId?: number;
    useFIAT?: boolean;
    defaultToken?: string;
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
    kimaExplorer?: string;
    errorHandler?: (e: any) => void;
    closeHandler?: (e: any) => void;
    successHandler?: (e: any) => void;
    switchChainHandler?: (chainId: number) => void;
    keplrHandler?: (e: any) => void;
}
/**
 * Returns the average of two numbers.
 *
 * @remarks
 * This method is part of the {@link core-library#Statistics | Statistics subsystem}.
 *
 * @param x - The first input number
 * @param y - The second input number
 * @returns The arithmetic mean of `x` and `y`
 *
 * @beta
 */
export declare const KimaTransactionWidget: ({ mode, txId, autoSwitchChain, defaultToken, provider, dAppOption, theme, titleOption, paymentTitleOption, useFIAT, helpURL, compliantOption, transactionOption, kimaBackendUrl, kimaNodeProviderQuery, kimaExplorer, feeURL, errorHandler, closeHandler, successHandler, switchChainHandler, keplrHandler }: Props) => React.JSX.Element;
export {};
