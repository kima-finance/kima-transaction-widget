import react, { ReactNode } from 'react';
import { Web3Provider } from '@ethersproject/providers';

interface KimaProviderProps {
    walletConnectProjectId: string;
    children: ReactNode;
}
declare const KimaProvider: react.FC<KimaProviderProps>;

declare enum ChainName {
    ETHEREUM = "ETH",
    POLYGON = "POL",
    AVALANCHE = "AVX",
    SOLANA = "SOL",
    BSC = "BSC",
    ARBITRUM = "ARB",
    OPTIMISM = "OPT",
    POLYGON_ZKEVM = "ZKE",
    TRON = "TRX",
    FIAT = "FIAT",
    BTC = "BTC"
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
    KEYSIGNED = "KeySigned"
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
    id: string;
    label: string;
}
interface TransactionOption {
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
    sourceSymbol: string;
    targetSymbol: string;
    amount: number;
    kimaTxHash: string;
    failReason: string;
}
interface Web3ModalAccountInfo {
    address?: string | undefined;
    isConnected?: boolean | undefined;
    chainId?: number | undefined;
}
interface NetworkFee {
    chain: string;
    feeType: string;
    amount: number;
}
interface ServiceFee {
    totalFeeUsd: number;
    sourceNetworkFee?: NetworkFee;
    targetNetworkFee?: NetworkFee;
}

interface Props {
    theme: ThemeOptions;
    mode: ModeOptions;
    txId?: number;
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
declare const KimaTransactionWidget: ({ mode, txId, autoSwitchChain, networkOption, provider, dAppOption, theme, titleOption, paymentTitleOption, helpURL, compliantOption, transactionOption, kimaBackendUrl, kimaNodeProviderQuery, kimaExplorer, feeURL, kimaGraphqlProviderQuery, errorHandler, closeHandler, successHandler, switchChainHandler, keplrHandler }: Props) => react.JSX.Element;

export { CHAIN_NAMES_TO_STRING, CHAIN_STRING_TO_NAME, ColorModeOptions, type CompliantOption, CurrencyOptions, DAppOptions, KimaProvider, KimaTransactionWidget, ModeOptions, type NetworkFee, NetworkOptions, type Option, type PaymentTitleOption, type ServiceFee, ChainName as SupportNetworks, type ThemeOptions, type TitleOption, type TransactionData, type TransactionOption, type Web3ModalAccountInfo };
