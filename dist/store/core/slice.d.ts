import { PayloadAction } from '@reduxjs/toolkit';
import { DAppOptions, ModeOptions, NetworkOptions, ThemeOptions, TransactionOption } from '@interface';
export declare type AddressOption = {
    [key: string]: string;
};
export declare type TokenOptions = {
    [key: string]: AddressOption;
};
interface CoreState {
    theme: ThemeOptions;
    mode: ModeOptions;
    sourceChain: string;
    targetChain: string;
    targetAddress: string;
    tokenOptions: TokenOptions;
    helpPopup: boolean;
    hashPopup: boolean;
    dAppOption: DAppOptions;
    submitted: boolean;
    amount: string;
    feeDeduct: boolean;
    transactionOption?: TransactionOption;
    errorHandler: Function;
    closeHandler: Function;
    successHandler: Function;
    switchChainHandler: Function;
    initChainFromProvider: boolean;
    serviceFee: number;
    backendUrl: string;
    nodeProviderQuery: string;
    graphqlProviderQuery: string;
    kimaExplorerUrl: string;
    txId: number;
    sourceCurrency: string;
    targetCurrency: string;
    compliantOption: boolean;
    sourceCompliant: string;
    targetCompliant: string;
    targetNetworkFetching: boolean;
    networkOption: NetworkOptions;
}
export declare const coreSlice: import("@reduxjs/toolkit").Slice<CoreState, {
    initialize: (state: {
        theme: {
            colorMode?: import("../../interface").ColorModeOptions | undefined;
            backgroundColorLight?: string | undefined;
            backgroundColorDark?: string | undefined;
        };
        mode: ModeOptions;
        sourceChain: string;
        targetChain: string;
        targetAddress: string;
        tokenOptions: {
            [x: string]: {
                [x: string]: string;
            };
        };
        helpPopup: boolean;
        hashPopup: boolean;
        dAppOption: DAppOptions;
        submitted: boolean;
        amount: string;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
            currency: string;
        } | undefined;
        errorHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        graphqlProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        sourceCurrency: string;
        targetCurrency: string;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        targetNetworkFetching: boolean;
        networkOption: NetworkOptions;
    }) => void;
    setNetworkOption: (state: {
        theme: {
            colorMode?: import("../../interface").ColorModeOptions | undefined;
            backgroundColorLight?: string | undefined;
            backgroundColorDark?: string | undefined;
        };
        mode: ModeOptions;
        sourceChain: string;
        targetChain: string;
        targetAddress: string;
        tokenOptions: {
            [x: string]: {
                [x: string]: string;
            };
        };
        helpPopup: boolean;
        hashPopup: boolean;
        dAppOption: DAppOptions;
        submitted: boolean;
        amount: string;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
            currency: string;
        } | undefined;
        errorHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        graphqlProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        sourceCurrency: string;
        targetCurrency: string;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        targetNetworkFetching: boolean;
        networkOption: NetworkOptions;
    }, action: PayloadAction<NetworkOptions>) => void;
    setTokenOptions: (state: {
        theme: {
            colorMode?: import("../../interface").ColorModeOptions | undefined;
            backgroundColorLight?: string | undefined;
            backgroundColorDark?: string | undefined;
        };
        mode: ModeOptions;
        sourceChain: string;
        targetChain: string;
        targetAddress: string;
        tokenOptions: {
            [x: string]: {
                [x: string]: string;
            };
        };
        helpPopup: boolean;
        hashPopup: boolean;
        dAppOption: DAppOptions;
        submitted: boolean;
        amount: string;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
            currency: string;
        } | undefined;
        errorHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        graphqlProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        sourceCurrency: string;
        targetCurrency: string;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        targetNetworkFetching: boolean;
        networkOption: NetworkOptions;
    }, action: PayloadAction<TokenOptions>) => void;
    setTheme: (state: {
        theme: {
            colorMode?: import("../../interface").ColorModeOptions | undefined;
            backgroundColorLight?: string | undefined;
            backgroundColorDark?: string | undefined;
        };
        mode: ModeOptions;
        sourceChain: string;
        targetChain: string;
        targetAddress: string;
        tokenOptions: {
            [x: string]: {
                [x: string]: string;
            };
        };
        helpPopup: boolean;
        hashPopup: boolean;
        dAppOption: DAppOptions;
        submitted: boolean;
        amount: string;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
            currency: string;
        } | undefined;
        errorHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        graphqlProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        sourceCurrency: string;
        targetCurrency: string;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        targetNetworkFetching: boolean;
        networkOption: NetworkOptions;
    }, action: PayloadAction<ThemeOptions>) => void;
    setKimaExplorer: (state: {
        theme: {
            colorMode?: import("../../interface").ColorModeOptions | undefined;
            backgroundColorLight?: string | undefined;
            backgroundColorDark?: string | undefined;
        };
        mode: ModeOptions;
        sourceChain: string;
        targetChain: string;
        targetAddress: string;
        tokenOptions: {
            [x: string]: {
                [x: string]: string;
            };
        };
        helpPopup: boolean;
        hashPopup: boolean;
        dAppOption: DAppOptions;
        submitted: boolean;
        amount: string;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
            currency: string;
        } | undefined;
        errorHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        graphqlProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        sourceCurrency: string;
        targetCurrency: string;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        targetNetworkFetching: boolean;
        networkOption: NetworkOptions;
    }, action: PayloadAction<string>) => void;
    setSourceChain: (state: {
        theme: {
            colorMode?: import("../../interface").ColorModeOptions | undefined;
            backgroundColorLight?: string | undefined;
            backgroundColorDark?: string | undefined;
        };
        mode: ModeOptions;
        sourceChain: string;
        targetChain: string;
        targetAddress: string;
        tokenOptions: {
            [x: string]: {
                [x: string]: string;
            };
        };
        helpPopup: boolean;
        hashPopup: boolean;
        dAppOption: DAppOptions;
        submitted: boolean;
        amount: string;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
            currency: string;
        } | undefined;
        errorHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        graphqlProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        sourceCurrency: string;
        targetCurrency: string;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        targetNetworkFetching: boolean;
        networkOption: NetworkOptions;
    }, action: PayloadAction<string>) => void;
    setTargetChain: (state: {
        theme: {
            colorMode?: import("../../interface").ColorModeOptions | undefined;
            backgroundColorLight?: string | undefined;
            backgroundColorDark?: string | undefined;
        };
        mode: ModeOptions;
        sourceChain: string;
        targetChain: string;
        targetAddress: string;
        tokenOptions: {
            [x: string]: {
                [x: string]: string;
            };
        };
        helpPopup: boolean;
        hashPopup: boolean;
        dAppOption: DAppOptions;
        submitted: boolean;
        amount: string;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
            currency: string;
        } | undefined;
        errorHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        graphqlProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        sourceCurrency: string;
        targetCurrency: string;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        targetNetworkFetching: boolean;
        networkOption: NetworkOptions;
    }, action: PayloadAction<string>) => void;
    setTargetAddress: (state: {
        theme: {
            colorMode?: import("../../interface").ColorModeOptions | undefined;
            backgroundColorLight?: string | undefined;
            backgroundColorDark?: string | undefined;
        };
        mode: ModeOptions;
        sourceChain: string;
        targetChain: string;
        targetAddress: string;
        tokenOptions: {
            [x: string]: {
                [x: string]: string;
            };
        };
        helpPopup: boolean;
        hashPopup: boolean;
        dAppOption: DAppOptions;
        submitted: boolean;
        amount: string;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
            currency: string;
        } | undefined;
        errorHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        graphqlProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        sourceCurrency: string;
        targetCurrency: string;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        targetNetworkFetching: boolean;
        networkOption: NetworkOptions;
    }, action: PayloadAction<string>) => void;
    setHelpPopup: (state: {
        theme: {
            colorMode?: import("../../interface").ColorModeOptions | undefined;
            backgroundColorLight?: string | undefined;
            backgroundColorDark?: string | undefined;
        };
        mode: ModeOptions;
        sourceChain: string;
        targetChain: string;
        targetAddress: string;
        tokenOptions: {
            [x: string]: {
                [x: string]: string;
            };
        };
        helpPopup: boolean;
        hashPopup: boolean;
        dAppOption: DAppOptions;
        submitted: boolean;
        amount: string;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
            currency: string;
        } | undefined;
        errorHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        graphqlProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        sourceCurrency: string;
        targetCurrency: string;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        targetNetworkFetching: boolean;
        networkOption: NetworkOptions;
    }, action: PayloadAction<boolean>) => void;
    setHashPopup: (state: {
        theme: {
            colorMode?: import("../../interface").ColorModeOptions | undefined;
            backgroundColorLight?: string | undefined;
            backgroundColorDark?: string | undefined;
        };
        mode: ModeOptions;
        sourceChain: string;
        targetChain: string;
        targetAddress: string;
        tokenOptions: {
            [x: string]: {
                [x: string]: string;
            };
        };
        helpPopup: boolean;
        hashPopup: boolean;
        dAppOption: DAppOptions;
        submitted: boolean;
        amount: string;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
            currency: string;
        } | undefined;
        errorHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        graphqlProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        sourceCurrency: string;
        targetCurrency: string;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        targetNetworkFetching: boolean;
        networkOption: NetworkOptions;
    }, action: PayloadAction<boolean>) => void;
    setDappOption: (state: {
        theme: {
            colorMode?: import("../../interface").ColorModeOptions | undefined;
            backgroundColorLight?: string | undefined;
            backgroundColorDark?: string | undefined;
        };
        mode: ModeOptions;
        sourceChain: string;
        targetChain: string;
        targetAddress: string;
        tokenOptions: {
            [x: string]: {
                [x: string]: string;
            };
        };
        helpPopup: boolean;
        hashPopup: boolean;
        dAppOption: DAppOptions;
        submitted: boolean;
        amount: string;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
            currency: string;
        } | undefined;
        errorHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        graphqlProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        sourceCurrency: string;
        targetCurrency: string;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        targetNetworkFetching: boolean;
        networkOption: NetworkOptions;
    }, action: PayloadAction<DAppOptions>) => void;
    setSubmitted: (state: {
        theme: {
            colorMode?: import("../../interface").ColorModeOptions | undefined;
            backgroundColorLight?: string | undefined;
            backgroundColorDark?: string | undefined;
        };
        mode: ModeOptions;
        sourceChain: string;
        targetChain: string;
        targetAddress: string;
        tokenOptions: {
            [x: string]: {
                [x: string]: string;
            };
        };
        helpPopup: boolean;
        hashPopup: boolean;
        dAppOption: DAppOptions;
        submitted: boolean;
        amount: string;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
            currency: string;
        } | undefined;
        errorHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        graphqlProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        sourceCurrency: string;
        targetCurrency: string;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        targetNetworkFetching: boolean;
        networkOption: NetworkOptions;
    }, action: PayloadAction<boolean>) => void;
    setTransactionOption: (state: {
        theme: {
            colorMode?: import("../../interface").ColorModeOptions | undefined;
            backgroundColorLight?: string | undefined;
            backgroundColorDark?: string | undefined;
        };
        mode: ModeOptions;
        sourceChain: string;
        targetChain: string;
        targetAddress: string;
        tokenOptions: {
            [x: string]: {
                [x: string]: string;
            };
        };
        helpPopup: boolean;
        hashPopup: boolean;
        dAppOption: DAppOptions;
        submitted: boolean;
        amount: string;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
            currency: string;
        } | undefined;
        errorHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        graphqlProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        sourceCurrency: string;
        targetCurrency: string;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        targetNetworkFetching: boolean;
        networkOption: NetworkOptions;
    }, action: PayloadAction<TransactionOption>) => void;
    setAmount: (state: {
        theme: {
            colorMode?: import("../../interface").ColorModeOptions | undefined;
            backgroundColorLight?: string | undefined;
            backgroundColorDark?: string | undefined;
        };
        mode: ModeOptions;
        sourceChain: string;
        targetChain: string;
        targetAddress: string;
        tokenOptions: {
            [x: string]: {
                [x: string]: string;
            };
        };
        helpPopup: boolean;
        hashPopup: boolean;
        dAppOption: DAppOptions;
        submitted: boolean;
        amount: string;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
            currency: string;
        } | undefined;
        errorHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        graphqlProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        sourceCurrency: string;
        targetCurrency: string;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        targetNetworkFetching: boolean;
        networkOption: NetworkOptions;
    }, action: PayloadAction<string>) => void;
    setErrorHandler: (state: {
        theme: {
            colorMode?: import("../../interface").ColorModeOptions | undefined;
            backgroundColorLight?: string | undefined;
            backgroundColorDark?: string | undefined;
        };
        mode: ModeOptions;
        sourceChain: string;
        targetChain: string;
        targetAddress: string;
        tokenOptions: {
            [x: string]: {
                [x: string]: string;
            };
        };
        helpPopup: boolean;
        hashPopup: boolean;
        dAppOption: DAppOptions;
        submitted: boolean;
        amount: string;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
            currency: string;
        } | undefined;
        errorHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        graphqlProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        sourceCurrency: string;
        targetCurrency: string;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        targetNetworkFetching: boolean;
        networkOption: NetworkOptions;
    }, action: PayloadAction<Function>) => void;
    setCloseHandler: (state: {
        theme: {
            colorMode?: import("../../interface").ColorModeOptions | undefined;
            backgroundColorLight?: string | undefined;
            backgroundColorDark?: string | undefined;
        };
        mode: ModeOptions;
        sourceChain: string;
        targetChain: string;
        targetAddress: string;
        tokenOptions: {
            [x: string]: {
                [x: string]: string;
            };
        };
        helpPopup: boolean;
        hashPopup: boolean;
        dAppOption: DAppOptions;
        submitted: boolean;
        amount: string;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
            currency: string;
        } | undefined;
        errorHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        graphqlProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        sourceCurrency: string;
        targetCurrency: string;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        targetNetworkFetching: boolean;
        networkOption: NetworkOptions;
    }, action: PayloadAction<Function>) => void;
    setSuccessHandler: (state: {
        theme: {
            colorMode?: import("../../interface").ColorModeOptions | undefined;
            backgroundColorLight?: string | undefined;
            backgroundColorDark?: string | undefined;
        };
        mode: ModeOptions;
        sourceChain: string;
        targetChain: string;
        targetAddress: string;
        tokenOptions: {
            [x: string]: {
                [x: string]: string;
            };
        };
        helpPopup: boolean;
        hashPopup: boolean;
        dAppOption: DAppOptions;
        submitted: boolean;
        amount: string;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
            currency: string;
        } | undefined;
        errorHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        graphqlProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        sourceCurrency: string;
        targetCurrency: string;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        targetNetworkFetching: boolean;
        networkOption: NetworkOptions;
    }, action: PayloadAction<Function>) => void;
    setSwitchChainHandler: (state: {
        theme: {
            colorMode?: import("../../interface").ColorModeOptions | undefined;
            backgroundColorLight?: string | undefined;
            backgroundColorDark?: string | undefined;
        };
        mode: ModeOptions;
        sourceChain: string;
        targetChain: string;
        targetAddress: string;
        tokenOptions: {
            [x: string]: {
                [x: string]: string;
            };
        };
        helpPopup: boolean;
        hashPopup: boolean;
        dAppOption: DAppOptions;
        submitted: boolean;
        amount: string;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
            currency: string;
        } | undefined;
        errorHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        graphqlProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        sourceCurrency: string;
        targetCurrency: string;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        targetNetworkFetching: boolean;
        networkOption: NetworkOptions;
    }, action: PayloadAction<Function>) => void;
    setInitChainFromProvider: (state: {
        theme: {
            colorMode?: import("../../interface").ColorModeOptions | undefined;
            backgroundColorLight?: string | undefined;
            backgroundColorDark?: string | undefined;
        };
        mode: ModeOptions;
        sourceChain: string;
        targetChain: string;
        targetAddress: string;
        tokenOptions: {
            [x: string]: {
                [x: string]: string;
            };
        };
        helpPopup: boolean;
        hashPopup: boolean;
        dAppOption: DAppOptions;
        submitted: boolean;
        amount: string;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
            currency: string;
        } | undefined;
        errorHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        graphqlProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        sourceCurrency: string;
        targetCurrency: string;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        targetNetworkFetching: boolean;
        networkOption: NetworkOptions;
    }, action: PayloadAction<boolean>) => void;
    setServiceFee: (state: {
        theme: {
            colorMode?: import("../../interface").ColorModeOptions | undefined;
            backgroundColorLight?: string | undefined;
            backgroundColorDark?: string | undefined;
        };
        mode: ModeOptions;
        sourceChain: string;
        targetChain: string;
        targetAddress: string;
        tokenOptions: {
            [x: string]: {
                [x: string]: string;
            };
        };
        helpPopup: boolean;
        hashPopup: boolean;
        dAppOption: DAppOptions;
        submitted: boolean;
        amount: string;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
            currency: string;
        } | undefined;
        errorHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        graphqlProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        sourceCurrency: string;
        targetCurrency: string;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        targetNetworkFetching: boolean;
        networkOption: NetworkOptions;
    }, action: PayloadAction<number>) => void;
    setMode: (state: {
        theme: {
            colorMode?: import("../../interface").ColorModeOptions | undefined;
            backgroundColorLight?: string | undefined;
            backgroundColorDark?: string | undefined;
        };
        mode: ModeOptions;
        sourceChain: string;
        targetChain: string;
        targetAddress: string;
        tokenOptions: {
            [x: string]: {
                [x: string]: string;
            };
        };
        helpPopup: boolean;
        hashPopup: boolean;
        dAppOption: DAppOptions;
        submitted: boolean;
        amount: string;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
            currency: string;
        } | undefined;
        errorHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        graphqlProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        sourceCurrency: string;
        targetCurrency: string;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        targetNetworkFetching: boolean;
        networkOption: NetworkOptions;
    }, action: PayloadAction<ModeOptions>) => void;
    setFeeDeduct: (state: {
        theme: {
            colorMode?: import("../../interface").ColorModeOptions | undefined;
            backgroundColorLight?: string | undefined;
            backgroundColorDark?: string | undefined;
        };
        mode: ModeOptions;
        sourceChain: string;
        targetChain: string;
        targetAddress: string;
        tokenOptions: {
            [x: string]: {
                [x: string]: string;
            };
        };
        helpPopup: boolean;
        hashPopup: boolean;
        dAppOption: DAppOptions;
        submitted: boolean;
        amount: string;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
            currency: string;
        } | undefined;
        errorHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        graphqlProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        sourceCurrency: string;
        targetCurrency: string;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        targetNetworkFetching: boolean;
        networkOption: NetworkOptions;
    }, action: PayloadAction<boolean>) => void;
    setBackendUrl: (state: {
        theme: {
            colorMode?: import("../../interface").ColorModeOptions | undefined;
            backgroundColorLight?: string | undefined;
            backgroundColorDark?: string | undefined;
        };
        mode: ModeOptions;
        sourceChain: string;
        targetChain: string;
        targetAddress: string;
        tokenOptions: {
            [x: string]: {
                [x: string]: string;
            };
        };
        helpPopup: boolean;
        hashPopup: boolean;
        dAppOption: DAppOptions;
        submitted: boolean;
        amount: string;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
            currency: string;
        } | undefined;
        errorHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        graphqlProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        sourceCurrency: string;
        targetCurrency: string;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        targetNetworkFetching: boolean;
        networkOption: NetworkOptions;
    }, action: PayloadAction<string>) => void;
    setNodeProviderQuery: (state: {
        theme: {
            colorMode?: import("../../interface").ColorModeOptions | undefined;
            backgroundColorLight?: string | undefined;
            backgroundColorDark?: string | undefined;
        };
        mode: ModeOptions;
        sourceChain: string;
        targetChain: string;
        targetAddress: string;
        tokenOptions: {
            [x: string]: {
                [x: string]: string;
            };
        };
        helpPopup: boolean;
        hashPopup: boolean;
        dAppOption: DAppOptions;
        submitted: boolean;
        amount: string;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
            currency: string;
        } | undefined;
        errorHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        graphqlProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        sourceCurrency: string;
        targetCurrency: string;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        targetNetworkFetching: boolean;
        networkOption: NetworkOptions;
    }, action: PayloadAction<string>) => void;
    setGraphqlProviderQuery: (state: {
        theme: {
            colorMode?: import("../../interface").ColorModeOptions | undefined;
            backgroundColorLight?: string | undefined;
            backgroundColorDark?: string | undefined;
        };
        mode: ModeOptions;
        sourceChain: string;
        targetChain: string;
        targetAddress: string;
        tokenOptions: {
            [x: string]: {
                [x: string]: string;
            };
        };
        helpPopup: boolean;
        hashPopup: boolean;
        dAppOption: DAppOptions;
        submitted: boolean;
        amount: string;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
            currency: string;
        } | undefined;
        errorHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        graphqlProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        sourceCurrency: string;
        targetCurrency: string;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        targetNetworkFetching: boolean;
        networkOption: NetworkOptions;
    }, action: PayloadAction<string>) => void;
    setTxId: (state: {
        theme: {
            colorMode?: import("../../interface").ColorModeOptions | undefined;
            backgroundColorLight?: string | undefined;
            backgroundColorDark?: string | undefined;
        };
        mode: ModeOptions;
        sourceChain: string;
        targetChain: string;
        targetAddress: string;
        tokenOptions: {
            [x: string]: {
                [x: string]: string;
            };
        };
        helpPopup: boolean;
        hashPopup: boolean;
        dAppOption: DAppOptions;
        submitted: boolean;
        amount: string;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
            currency: string;
        } | undefined;
        errorHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        graphqlProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        sourceCurrency: string;
        targetCurrency: string;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        targetNetworkFetching: boolean;
        networkOption: NetworkOptions;
    }, action: PayloadAction<number>) => void;
    setSourceCurrency: (state: {
        theme: {
            colorMode?: import("../../interface").ColorModeOptions | undefined;
            backgroundColorLight?: string | undefined;
            backgroundColorDark?: string | undefined;
        };
        mode: ModeOptions;
        sourceChain: string;
        targetChain: string;
        targetAddress: string;
        tokenOptions: {
            [x: string]: {
                [x: string]: string;
            };
        };
        helpPopup: boolean;
        hashPopup: boolean;
        dAppOption: DAppOptions;
        submitted: boolean;
        amount: string;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
            currency: string;
        } | undefined;
        errorHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        graphqlProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        sourceCurrency: string;
        targetCurrency: string;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        targetNetworkFetching: boolean;
        networkOption: NetworkOptions;
    }, action: PayloadAction<string>) => void;
    setTargetCurrency: (state: {
        theme: {
            colorMode?: import("../../interface").ColorModeOptions | undefined;
            backgroundColorLight?: string | undefined;
            backgroundColorDark?: string | undefined;
        };
        mode: ModeOptions;
        sourceChain: string;
        targetChain: string;
        targetAddress: string;
        tokenOptions: {
            [x: string]: {
                [x: string]: string;
            };
        };
        helpPopup: boolean;
        hashPopup: boolean;
        dAppOption: DAppOptions;
        submitted: boolean;
        amount: string;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
            currency: string;
        } | undefined;
        errorHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        graphqlProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        sourceCurrency: string;
        targetCurrency: string;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        targetNetworkFetching: boolean;
        networkOption: NetworkOptions;
    }, action: PayloadAction<string>) => void;
    setCompliantOption: (state: {
        theme: {
            colorMode?: import("../../interface").ColorModeOptions | undefined;
            backgroundColorLight?: string | undefined;
            backgroundColorDark?: string | undefined;
        };
        mode: ModeOptions;
        sourceChain: string;
        targetChain: string;
        targetAddress: string;
        tokenOptions: {
            [x: string]: {
                [x: string]: string;
            };
        };
        helpPopup: boolean;
        hashPopup: boolean;
        dAppOption: DAppOptions;
        submitted: boolean;
        amount: string;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
            currency: string;
        } | undefined;
        errorHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        graphqlProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        sourceCurrency: string;
        targetCurrency: string;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        targetNetworkFetching: boolean;
        networkOption: NetworkOptions;
    }, action: PayloadAction<boolean>) => void;
    setSourceCompliant: (state: {
        theme: {
            colorMode?: import("../../interface").ColorModeOptions | undefined;
            backgroundColorLight?: string | undefined;
            backgroundColorDark?: string | undefined;
        };
        mode: ModeOptions;
        sourceChain: string;
        targetChain: string;
        targetAddress: string;
        tokenOptions: {
            [x: string]: {
                [x: string]: string;
            };
        };
        helpPopup: boolean;
        hashPopup: boolean;
        dAppOption: DAppOptions;
        submitted: boolean;
        amount: string;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
            currency: string;
        } | undefined;
        errorHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        graphqlProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        sourceCurrency: string;
        targetCurrency: string;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        targetNetworkFetching: boolean;
        networkOption: NetworkOptions;
    }, action: PayloadAction<string>) => void;
    setTargetCompliant: (state: {
        theme: {
            colorMode?: import("../../interface").ColorModeOptions | undefined;
            backgroundColorLight?: string | undefined;
            backgroundColorDark?: string | undefined;
        };
        mode: ModeOptions;
        sourceChain: string;
        targetChain: string;
        targetAddress: string;
        tokenOptions: {
            [x: string]: {
                [x: string]: string;
            };
        };
        helpPopup: boolean;
        hashPopup: boolean;
        dAppOption: DAppOptions;
        submitted: boolean;
        amount: string;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
            currency: string;
        } | undefined;
        errorHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        graphqlProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        sourceCurrency: string;
        targetCurrency: string;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        targetNetworkFetching: boolean;
        networkOption: NetworkOptions;
    }, action: PayloadAction<string>) => void;
    setTargetChainFetching: (state: {
        theme: {
            colorMode?: import("../../interface").ColorModeOptions | undefined;
            backgroundColorLight?: string | undefined;
            backgroundColorDark?: string | undefined;
        };
        mode: ModeOptions;
        sourceChain: string;
        targetChain: string;
        targetAddress: string;
        tokenOptions: {
            [x: string]: {
                [x: string]: string;
            };
        };
        helpPopup: boolean;
        hashPopup: boolean;
        dAppOption: DAppOptions;
        submitted: boolean;
        amount: string;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
            currency: string;
        } | undefined;
        errorHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        graphqlProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        sourceCurrency: string;
        targetCurrency: string;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        targetNetworkFetching: boolean;
        networkOption: NetworkOptions;
    }, action: PayloadAction<boolean>) => void;
}, "core", "core", import("@reduxjs/toolkit").SliceSelectors<CoreState>>;
export declare const initialize: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<any>, setNetworkOption: import("@reduxjs/toolkit").ActionCreatorWithPayload<NetworkOptions, any>, setTokenOptions: import("@reduxjs/toolkit").ActionCreatorWithPayload<TokenOptions, any>, setTheme: import("@reduxjs/toolkit").ActionCreatorWithPayload<ThemeOptions, any>, setKimaExplorer: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, any>, setSourceChain: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, any>, setTargetChain: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, any>, setTargetAddress: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, any>, setHelpPopup: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, any>, setHashPopup: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, any>, setDappOption: import("@reduxjs/toolkit").ActionCreatorWithPayload<DAppOptions, any>, setSubmitted: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, any>, setTransactionOption: import("@reduxjs/toolkit").ActionCreatorWithPayload<TransactionOption, any>, setAmount: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, any>, setErrorHandler: import("@reduxjs/toolkit").ActionCreatorWithPayload<Function, any>, setCloseHandler: import("@reduxjs/toolkit").ActionCreatorWithPayload<Function, any>, setSuccessHandler: import("@reduxjs/toolkit").ActionCreatorWithPayload<Function, any>, setSwitchChainHandler: import("@reduxjs/toolkit").ActionCreatorWithPayload<Function, any>, setInitChainFromProvider: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, any>, setServiceFee: import("@reduxjs/toolkit").ActionCreatorWithPayload<number, any>, setMode: import("@reduxjs/toolkit").ActionCreatorWithPayload<ModeOptions, any>, setFeeDeduct: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, any>, setBackendUrl: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, any>, setNodeProviderQuery: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, any>, setGraphqlProviderQuery: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, any>, setTxId: import("@reduxjs/toolkit").ActionCreatorWithPayload<number, any>, setSourceCurrency: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, any>, setTargetCurrency: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, any>, setCompliantOption: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, any>, setSourceCompliant: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, any>, setTargetCompliant: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, any>, setTargetChainFetching: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, any>;
declare const _default;
export default _default;
