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
    REFUNDCOMPLETED = "RefundCompleted",
    DECLINEDINVALID = "DeclinedInvalid"
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
interface BigintAmount<TBigInt extends bigint | string> {
    value: TBigInt;
    decimals: number;
}
interface FeeResult<TBigInt extends BigintAmount<bigint | string>> {
    feeId: string;
    feeOriginGasFiat: string;
    feeOriginGasBigInt: TBigInt;
    feeKimaProcessingFiat: string;
    feeKimaProcessingBigInt: TBigInt;
    feeTargetGasFiat: string;
    feeTargetGasBigInt: TBigInt;
    feeTotalFiat: string;
    feeTotalBigInt: TBigInt;
    peggedTo: string;
    expiration: string;
    transactionValues: FeeTransactionValues<TBigInt>;
}
interface FeeTransactionValues<TBigInt = BigintAmount<bigint | string>> {
    feeFromOrigin: TransactionValues<TBigInt>;
    feeFromTarget: TransactionValues<TBigInt>;
}
interface TransactionValues<TBigInt = BigintAmount<bigint | string>> {
    allowanceAmount: TBigInt;
    submitAmount: TBigInt;
    message: string;
}
type FeeResponse = FeeResult<BigintAmount<string>>;
interface ServiceFee {
    feeId: string;
    peggedTo: string;
    expiration: string;
    transactionValues: FeeTransactionValues<BigintAmount<bigint>> & {
        originChain: string;
        originAddress: string;
        originSymbol: string;
        targetChain: string;
        targetAddress: string;
        targetSymbol: string;
    };
    sourceFee: BigintAmount<bigint>;
    targetFee: BigintAmount<bigint>;
    kimaFee: BigintAmount<bigint>;
    totalFee: BigintAmount<bigint>;
}
interface TronProvider {
    tronWeb: TronWeb;
    signTransaction: (transaction: Transaction, privateKey?: string) => Promise<SignedTransaction>;
    signMessage(message: string, privateKey?: string): Promise<string>;
}
interface SolProvider {
    connection: Connection;
    signTransaction: <T extends Transaction | VersionedTransaction>(transaction: T) => Promise<T>;
    signMessage(message: Uint8Array): Promise<Uint8Array>;
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

export { type BigintAmount, CHAIN_NAMES_TO_STRING, CHAIN_STRING_TO_NAME, ColorModeOptions, type CompliantOption, CurrencyOptions, DAppOptions, type ExternalProvider, type FeeResponse, type FeeResult, type FeeTransactionValues, KimaProvider, KimaTransactionWidget, ModeOptions, NetworkOptions, type Option, type PaymentTitleOption, type ServiceFee, type SolProvider, ChainName as SupportNetworks, type ThemeOptions, type TitleOption, type TransactionData, type TransactionOption, type TransactionValues, type TronProvider, type Web3ModalAccountInfo };
