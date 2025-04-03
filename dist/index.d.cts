import * as react from 'react';
import react__default, { ReactNode } from 'react';
import { Connection, Transaction, VersionedTransaction, PublicKey } from '@solana/web3.js';
import { TronWeb } from 'tronweb';
import { SignedTransaction } from '@tronweb3/tronwallet-abstract-adapter';
import { BrowserProvider, JsonRpcSigner } from 'ethers';

declare enum ChainName {
    ETHEREUM = "ETH",
    POLYGON = "POL",
    AVALANCHE = "AVX",
    SOLANA = "SOL",
    BASE = "BASE",
    BSC = "BSC",
    ARBITRUM = "ARB",
    OPTIMISM = "OPT",
    POLYGON_ZKEVM = "ZKE",
    TRON = "TRX",
    FIAT = "FIAT",
    BTC = "BTC",
    BERA = "BERA"
}
declare const CHAIN_NAMES_TO_STRING: {
    [chainName: string]: string;
};
declare const CHAIN_STRING_TO_NAME: {
    [chainName: string]: ChainName;
};
declare enum TransactionStatus {
    AVAILABLE = "Available",
    CONFIRMED = "Pull_Confirmed",
    PULLED = "Pulled",
    PAID = "Paid",
    COMPLETED = "Completed",
    FAILEDTOPAY = "FailedToPay",
    FAILEDTOPULL = "FailedToPull",
    UNAVAILABLE = "UnAvailable",
    REFUNDSTART = "RefundStart",
    REFUNDFAILED = "RefundFailed",
    REFUNDCOMPLETED = "RefundCompleted"
}

declare enum NetworkOptions {
    testnet = "testnet",
    mainnet = "mainnet"
}
declare enum ModeOptions {
    payment = "payment",
    bridge = "bridge",
    status = "status"
}
declare enum CurrencyOptions {
    USDK = "USDK",
    USDC = "USDC",
    USDT = "USDT",
    WBTC = "WBTC",
    G$ = "GDOLLAR"
}
declare enum ColorModeOptions {
    light = "light",
    dark = "dark"
}
declare enum DAppOptions {
    None = "none",
    LPAdd = "LPAdd",
    LPDrain = "LPDrain"
}
interface Option {
    id: ChainName | string;
    label: string;
}
interface TransactionOption {
    sourceChain?: ChainName;
    targetChain: ChainName;
    targetAddress: string;
    amount: number;
    currency: string;
}
interface TitleOption {
    initialTitle?: string;
    confirmTitle?: string;
}
interface PaymentTitleOption {
    title?: string;
    style?: object;
}
interface CompliantOption {
    checkCompliant: boolean;
    xploriskBaseUrl?: string;
    xploriskApiKey?: string;
}
interface ThemeOptions {
    colorMode?: ColorModeOptions;
    backgroundColorLight?: string;
    backgroundColorDark?: string;
}
interface TransactionData {
    status: TransactionStatus;
    sourceChain: string;
    targetChain: string;
    tssPullHash: string;
    tssReleaseHash: string;
    tssRefundHash: string;
    sourceSymbol: string;
    targetSymbol: string;
    amount: number | string;
    kimaTxHash: string;
    failReason: string;
}
interface Web3ModalAccountInfo {
    address?: string | undefined;
    isConnected?: boolean | undefined;
    chainId?: number | undefined;
}
interface ServiceFee {
    allowanceAmount: string;
    submitAmount: string;
    sourceFee: string;
    targetFee: string;
    kimaFee: string;
    totalFee: string;
    decimals: number;
    feeId: string;
}
interface TronProvider {
    tronWeb: TronWeb;
    signTransaction: (transaction: Transaction, privateKey?: string) => Promise<SignedTransaction>;
}
interface SolProvider {
    connection: Connection;
    signTransaction: <T extends Transaction | VersionedTransaction>(transaction: T) => Promise<T>;
}
interface ExternalProvider {
    type: 'evm' | 'solana' | 'tron';
    provider: BrowserProvider | SolProvider | TronProvider;
    signer: JsonRpcSigner | PublicKey | string;
}

interface KimaProviderProps {
    walletConnectProjectId: string;
    externalProvider?: ExternalProvider;
    kimaBackendUrl: string;
    children: ReactNode;
    errorHandler?: (e: any) => void;
    closeHandler?: (e: any) => void;
    successHandler?: (e: any) => void;
    keplrHandler?: (e: any) => void;
    switchChainHandler?: (e: any) => void;
}
declare const KimaProvider: ({ walletConnectProjectId, children, externalProvider, kimaBackendUrl, keplrHandler, successHandler, closeHandler, errorHandler, switchChainHandler }: KimaProviderProps) => react.JSX.Element;

interface Props {
    theme: ThemeOptions;
    mode: ModeOptions;
    txId?: number | string;
    dAppOption?: DAppOptions;
    titleOption?: TitleOption;
    compliantOption?: boolean;
    helpURL?: string;
    transactionOption?: TransactionOption;
    paymentTitleOption?: PaymentTitleOption;
    excludedSourceNetworks?: Array<ChainName>;
    excludedTargetNetworks?: Array<ChainName>;
}
declare const KimaTransactionWidget: ({ mode, txId, dAppOption, theme, titleOption, paymentTitleOption, helpURL, compliantOption, transactionOption, excludedSourceNetworks, excludedTargetNetworks }: Props) => react__default.JSX.Element;

export { CHAIN_NAMES_TO_STRING, CHAIN_STRING_TO_NAME, ColorModeOptions, type CompliantOption, CurrencyOptions, DAppOptions, type ExternalProvider, KimaProvider, KimaTransactionWidget, ModeOptions, NetworkOptions, type Option, type PaymentTitleOption, type ServiceFee, type SolProvider, ChainName as SupportNetworks, type ThemeOptions, type TitleOption, type TransactionData, type TransactionOption, type TronProvider, type Web3ModalAccountInfo };
