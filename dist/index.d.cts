import react, { ReactNode } from 'react';
import { Web3Provider, JsonRpcSigner } from '@ethersproject/providers';
import { Transaction, Connection, VersionedTransaction, PublicKey } from '@solana/web3.js';
import { TronWeb } from 'tronweb';
import { SignedTransaction } from '@tronweb3/tronwallet-abstract-adapter';

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
    allowanceAmount: string;
    decimals: number;
    sourceNetworkFee?: NetworkFee;
    submitAmount: string;
    targetNetworkFee?: NetworkFee;
    totalFeeUsd: number;
    totalFee: string;
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
    provider: Web3Provider | SolProvider | TronProvider;
    signer: JsonRpcSigner | PublicKey | string;
}

interface KimaProviderProps {
    networkOption?: NetworkOptions;
    walletConnectProjectId: string;
    externalProvider?: ExternalProvider;
    children: ReactNode;
}
declare const KimaProvider: react.FC<KimaProviderProps>;

interface Props {
    theme: ThemeOptions;
    mode: ModeOptions;
    txId?: number;
    dAppOption?: DAppOptions;
    titleOption?: TitleOption;
    compliantOption?: boolean;
    helpURL?: string;
    transactionOption?: TransactionOption;
    paymentTitleOption?: PaymentTitleOption;
    kimaBackendUrl: string;
    kimaExplorer?: string;
    networkOption?: NetworkOptions;
    errorHandler?: (e: any) => void;
    closeHandler?: (e: any) => void;
    successHandler?: (e: any) => void;
    switchChainHandler?: (chainId: number) => void;
    keplrHandler?: (e: any) => void;
    excludedSourceNetworks?: Array<ChainName>;
    excludedTargetNetworks?: Array<ChainName>;
}
declare const KimaTransactionWidget: ({ mode, txId, networkOption, dAppOption, theme, titleOption, paymentTitleOption, helpURL, compliantOption, transactionOption, kimaBackendUrl, kimaExplorer, errorHandler, closeHandler, successHandler, switchChainHandler, keplrHandler, excludedSourceNetworks, excludedTargetNetworks }: Props) => react.JSX.Element;

export { CHAIN_NAMES_TO_STRING, CHAIN_STRING_TO_NAME, ColorModeOptions, type CompliantOption, CurrencyOptions, DAppOptions, type ExternalProvider, KimaProvider, KimaTransactionWidget, ModeOptions, type NetworkFee, NetworkOptions, type Option, type PaymentTitleOption, type ServiceFee, type SolProvider, ChainName as SupportNetworks, type ThemeOptions, type TitleOption, type TransactionData, type TransactionOption, type TronProvider, type Web3ModalAccountInfo };
