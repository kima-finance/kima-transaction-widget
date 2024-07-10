/// <reference types="react" />
export declare enum ChainName {
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
export declare enum SupportedChainId {
    ETHEREUM = 1,
    POLYGON = 137,
    AVALANCHE = 43114,
    BSC = 56,
    ARBITRUM = 42161,
    OPTIMISM = 10,
    POLYGON_ZKEM = 1101
}
export declare const CHAIN_NAMES_TO_IDS: {
    [chainName: string]: SupportedChainId;
};
export declare const CHAIN_NAMES_TO_STRING: {
    [chainName: string]: string;
};
export declare const CHAIN_STRING_TO_NAME: {
    [chainName: string]: ChainName;
};
export declare const CHAIN_NAMES_TO_EXPLORER: {
    [chainName: string]: string;
};
export declare const CHAIN_IDS_TO_NAMES: {
    [chainId: number]: string;
};
export declare const networkOptions: {
    id: ChainName;
    label: string;
    icon: ({ width, height, ...rest }: {
        [x: string]: any;
        width?: number | undefined;
        height?: number | undefined;
    }) => import("react").JSX.Element;
}[];
export declare const getNetworkOption: (id: string) => {
    id: ChainName;
    label: string;
    icon: ({ width, height, ...rest }: {
        [x: string]: any;
        width?: number | undefined;
        height?: number | undefined;
    }) => import("react").JSX.Element;
} | undefined;
export declare type Cluster = 'devnet' | 'testnet' | 'mainnet';
export declare const CLUSTER: Cluster;
export declare const SOLANA_HOST: string;
export declare const isEVMChain: (chainId: string) => boolean;
declare type CoinOptions = {
    [key: string]: any;
};
export declare const COIN_LIST: CoinOptions;
export declare const ExpireTimeOptions: string[];
export declare enum TransactionStatus {
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
export declare const tooltipInfo: string[][];
export declare type PendingTxData = {
    expireTime: string;
    amount: string;
    status: string;
    hash: string;
};
export {};
