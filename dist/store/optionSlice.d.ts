import * as toolkitRaw from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { DAppOptions, ModeOptions, ThemeOptions, TransactionOption } from '../interface';
declare type BankDetails = {
    iban: string;
    recipient: string;
};
export declare type AddressOption = {
    [key: string]: string;
};
export declare type TokenOptions = {
    [key: string]: AddressOption;
};
export interface OptionState {
    theme: ThemeOptions;
    mode: ModeOptions;
    sourceChain: string;
    targetChain: string;
    targetAddress: string;
    tokenOptions: TokenOptions;
    solanaConnectModal: boolean;
    tronConnectModal: boolean;
    helpPopup: boolean;
    hashPopup: boolean;
    bankPopup: boolean;
    walletAutoConnect: boolean;
    provider: any;
    dAppOption: DAppOptions;
    solanaProvider: any;
    submitted: boolean;
    amount: number;
    feeDeduct: boolean;
    transactionOption?: TransactionOption;
    errorHandler: Function;
    keplrHandler: Function;
    closeHandler: Function;
    successHandler: Function;
    switchChainHandler: Function;
    initChainFromProvider: boolean;
    serviceFee: number;
    backendUrl: string;
    nodeProviderQuery: string;
    kimaExplorerUrl: string;
    txId: number;
    selectedToken: string;
    avilableTokenList: Array<string>;
    compliantOption: boolean;
    sourceCompliant: string;
    targetCompliant: string;
    useFIAT: boolean;
    bankDetails: BankDetails;
    targetNetworkFetching: boolean;
    signature: string;
    uuid: string;
    kycStatus: string;
}
export declare const optionSlice: toolkitRaw.Slice<OptionState, {
    initialize: (state: {
        theme: {
            colorMode?: import("../interface").ColorModeOptions | undefined;
            fontSize?: import("../interface").FontSizeOptions | undefined;
            fontFamily?: string | undefined;
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
        solanaConnectModal: boolean;
        tronConnectModal: boolean;
        helpPopup: boolean;
        hashPopup: boolean;
        bankPopup: boolean;
        walletAutoConnect: boolean;
        provider: any;
        dAppOption: DAppOptions;
        solanaProvider: any;
        submitted: boolean;
        amount: number;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
        } | undefined;
        errorHandler: Function;
        keplrHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        selectedToken: string;
        avilableTokenList: Array<string>;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        useFIAT: boolean;
        bankDetails: {
            iban: string;
            recipient: string;
        };
        targetNetworkFetching: boolean;
        signature: string;
        uuid: string;
        kycStatus: string;
    }) => void;
    setTokenOptions: (state: {
        theme: {
            colorMode?: import("../interface").ColorModeOptions | undefined;
            fontSize?: import("../interface").FontSizeOptions | undefined;
            fontFamily?: string | undefined;
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
        solanaConnectModal: boolean;
        tronConnectModal: boolean;
        helpPopup: boolean;
        hashPopup: boolean;
        bankPopup: boolean;
        walletAutoConnect: boolean;
        provider: any;
        dAppOption: DAppOptions;
        solanaProvider: any;
        submitted: boolean;
        amount: number;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
        } | undefined;
        errorHandler: Function;
        keplrHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        selectedToken: string;
        avilableTokenList: Array<string>;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        useFIAT: boolean;
        bankDetails: {
            iban: string;
            recipient: string;
        };
        targetNetworkFetching: boolean;
        signature: string;
        uuid: string;
        kycStatus: string;
    }, action: PayloadAction<TokenOptions>) => void;
    setTheme: (state: {
        theme: {
            colorMode?: import("../interface").ColorModeOptions | undefined;
            fontSize?: import("../interface").FontSizeOptions | undefined;
            fontFamily?: string | undefined;
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
        solanaConnectModal: boolean;
        tronConnectModal: boolean;
        helpPopup: boolean;
        hashPopup: boolean;
        bankPopup: boolean;
        walletAutoConnect: boolean;
        provider: any;
        dAppOption: DAppOptions;
        solanaProvider: any;
        submitted: boolean;
        amount: number;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
        } | undefined;
        errorHandler: Function;
        keplrHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        selectedToken: string;
        avilableTokenList: Array<string>;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        useFIAT: boolean;
        bankDetails: {
            iban: string;
            recipient: string;
        };
        targetNetworkFetching: boolean;
        signature: string;
        uuid: string;
        kycStatus: string;
    }, action: PayloadAction<ThemeOptions>) => void;
    setKimaExplorer: (state: {
        theme: {
            colorMode?: import("../interface").ColorModeOptions | undefined;
            fontSize?: import("../interface").FontSizeOptions | undefined;
            fontFamily?: string | undefined;
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
        solanaConnectModal: boolean;
        tronConnectModal: boolean;
        helpPopup: boolean;
        hashPopup: boolean;
        bankPopup: boolean;
        walletAutoConnect: boolean;
        provider: any;
        dAppOption: DAppOptions;
        solanaProvider: any;
        submitted: boolean;
        amount: number;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
        } | undefined;
        errorHandler: Function;
        keplrHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        selectedToken: string;
        avilableTokenList: Array<string>;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        useFIAT: boolean;
        bankDetails: {
            iban: string;
            recipient: string;
        };
        targetNetworkFetching: boolean;
        signature: string;
        uuid: string;
        kycStatus: string;
    }, action: PayloadAction<string>) => void;
    setSourceChain: (state: {
        theme: {
            colorMode?: import("../interface").ColorModeOptions | undefined;
            fontSize?: import("../interface").FontSizeOptions | undefined;
            fontFamily?: string | undefined;
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
        solanaConnectModal: boolean;
        tronConnectModal: boolean;
        helpPopup: boolean;
        hashPopup: boolean;
        bankPopup: boolean;
        walletAutoConnect: boolean;
        provider: any;
        dAppOption: DAppOptions;
        solanaProvider: any;
        submitted: boolean;
        amount: number;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
        } | undefined;
        errorHandler: Function;
        keplrHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        selectedToken: string;
        avilableTokenList: Array<string>;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        useFIAT: boolean;
        bankDetails: {
            iban: string;
            recipient: string;
        };
        targetNetworkFetching: boolean;
        signature: string;
        uuid: string;
        kycStatus: string;
    }, action: PayloadAction<string>) => void;
    setTargetChain: (state: {
        theme: {
            colorMode?: import("../interface").ColorModeOptions | undefined;
            fontSize?: import("../interface").FontSizeOptions | undefined;
            fontFamily?: string | undefined;
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
        solanaConnectModal: boolean;
        tronConnectModal: boolean;
        helpPopup: boolean;
        hashPopup: boolean;
        bankPopup: boolean;
        walletAutoConnect: boolean;
        provider: any;
        dAppOption: DAppOptions;
        solanaProvider: any;
        submitted: boolean;
        amount: number;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
        } | undefined;
        errorHandler: Function;
        keplrHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        selectedToken: string;
        avilableTokenList: Array<string>;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        useFIAT: boolean;
        bankDetails: {
            iban: string;
            recipient: string;
        };
        targetNetworkFetching: boolean;
        signature: string;
        uuid: string;
        kycStatus: string;
    }, action: PayloadAction<string>) => void;
    setTargetAddress: (state: {
        theme: {
            colorMode?: import("../interface").ColorModeOptions | undefined;
            fontSize?: import("../interface").FontSizeOptions | undefined;
            fontFamily?: string | undefined;
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
        solanaConnectModal: boolean;
        tronConnectModal: boolean;
        helpPopup: boolean;
        hashPopup: boolean;
        bankPopup: boolean;
        walletAutoConnect: boolean;
        provider: any;
        dAppOption: DAppOptions;
        solanaProvider: any;
        submitted: boolean;
        amount: number;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
        } | undefined;
        errorHandler: Function;
        keplrHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        selectedToken: string;
        avilableTokenList: Array<string>;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        useFIAT: boolean;
        bankDetails: {
            iban: string;
            recipient: string;
        };
        targetNetworkFetching: boolean;
        signature: string;
        uuid: string;
        kycStatus: string;
    }, action: PayloadAction<string>) => void;
    setSolanaConnectModal: (state: {
        theme: {
            colorMode?: import("../interface").ColorModeOptions | undefined;
            fontSize?: import("../interface").FontSizeOptions | undefined;
            fontFamily?: string | undefined;
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
        solanaConnectModal: boolean;
        tronConnectModal: boolean;
        helpPopup: boolean;
        hashPopup: boolean;
        bankPopup: boolean;
        walletAutoConnect: boolean;
        provider: any;
        dAppOption: DAppOptions;
        solanaProvider: any;
        submitted: boolean;
        amount: number;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
        } | undefined;
        errorHandler: Function;
        keplrHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        selectedToken: string;
        avilableTokenList: Array<string>;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        useFIAT: boolean;
        bankDetails: {
            iban: string;
            recipient: string;
        };
        targetNetworkFetching: boolean;
        signature: string;
        uuid: string;
        kycStatus: string;
    }, action: PayloadAction<boolean>) => void;
    setTronConnectModal: (state: {
        theme: {
            colorMode?: import("../interface").ColorModeOptions | undefined;
            fontSize?: import("../interface").FontSizeOptions | undefined;
            fontFamily?: string | undefined;
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
        solanaConnectModal: boolean;
        tronConnectModal: boolean;
        helpPopup: boolean;
        hashPopup: boolean;
        bankPopup: boolean;
        walletAutoConnect: boolean;
        provider: any;
        dAppOption: DAppOptions;
        solanaProvider: any;
        submitted: boolean;
        amount: number;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
        } | undefined;
        errorHandler: Function;
        keplrHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        selectedToken: string;
        avilableTokenList: Array<string>;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        useFIAT: boolean;
        bankDetails: {
            iban: string;
            recipient: string;
        };
        targetNetworkFetching: boolean;
        signature: string;
        uuid: string;
        kycStatus: string;
    }, action: PayloadAction<boolean>) => void;
    setHelpPopup: (state: {
        theme: {
            colorMode?: import("../interface").ColorModeOptions | undefined;
            fontSize?: import("../interface").FontSizeOptions | undefined;
            fontFamily?: string | undefined;
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
        solanaConnectModal: boolean;
        tronConnectModal: boolean;
        helpPopup: boolean;
        hashPopup: boolean;
        bankPopup: boolean;
        walletAutoConnect: boolean;
        provider: any;
        dAppOption: DAppOptions;
        solanaProvider: any;
        submitted: boolean;
        amount: number;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
        } | undefined;
        errorHandler: Function;
        keplrHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        selectedToken: string;
        avilableTokenList: Array<string>;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        useFIAT: boolean;
        bankDetails: {
            iban: string;
            recipient: string;
        };
        targetNetworkFetching: boolean;
        signature: string;
        uuid: string;
        kycStatus: string;
    }, action: PayloadAction<boolean>) => void;
    setHashPopup: (state: {
        theme: {
            colorMode?: import("../interface").ColorModeOptions | undefined;
            fontSize?: import("../interface").FontSizeOptions | undefined;
            fontFamily?: string | undefined;
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
        solanaConnectModal: boolean;
        tronConnectModal: boolean;
        helpPopup: boolean;
        hashPopup: boolean;
        bankPopup: boolean;
        walletAutoConnect: boolean;
        provider: any;
        dAppOption: DAppOptions;
        solanaProvider: any;
        submitted: boolean;
        amount: number;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
        } | undefined;
        errorHandler: Function;
        keplrHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        selectedToken: string;
        avilableTokenList: Array<string>;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        useFIAT: boolean;
        bankDetails: {
            iban: string;
            recipient: string;
        };
        targetNetworkFetching: boolean;
        signature: string;
        uuid: string;
        kycStatus: string;
    }, action: PayloadAction<boolean>) => void;
    setBankPopup: (state: {
        theme: {
            colorMode?: import("../interface").ColorModeOptions | undefined;
            fontSize?: import("../interface").FontSizeOptions | undefined;
            fontFamily?: string | undefined;
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
        solanaConnectModal: boolean;
        tronConnectModal: boolean;
        helpPopup: boolean;
        hashPopup: boolean;
        bankPopup: boolean;
        walletAutoConnect: boolean;
        provider: any;
        dAppOption: DAppOptions;
        solanaProvider: any;
        submitted: boolean;
        amount: number;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
        } | undefined;
        errorHandler: Function;
        keplrHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        selectedToken: string;
        avilableTokenList: Array<string>;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        useFIAT: boolean;
        bankDetails: {
            iban: string;
            recipient: string;
        };
        targetNetworkFetching: boolean;
        signature: string;
        uuid: string;
        kycStatus: string;
    }, action: PayloadAction<boolean>) => void;
    setProvider: (state: {
        theme: {
            colorMode?: import("../interface").ColorModeOptions | undefined;
            fontSize?: import("../interface").FontSizeOptions | undefined;
            fontFamily?: string | undefined;
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
        solanaConnectModal: boolean;
        tronConnectModal: boolean;
        helpPopup: boolean;
        hashPopup: boolean;
        bankPopup: boolean;
        walletAutoConnect: boolean;
        provider: any;
        dAppOption: DAppOptions;
        solanaProvider: any;
        submitted: boolean;
        amount: number;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
        } | undefined;
        errorHandler: Function;
        keplrHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        selectedToken: string;
        avilableTokenList: Array<string>;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        useFIAT: boolean;
        bankDetails: {
            iban: string;
            recipient: string;
        };
        targetNetworkFetching: boolean;
        signature: string;
        uuid: string;
        kycStatus: string;
    }, action: PayloadAction<any>) => void;
    setDappOption: (state: {
        theme: {
            colorMode?: import("../interface").ColorModeOptions | undefined;
            fontSize?: import("../interface").FontSizeOptions | undefined;
            fontFamily?: string | undefined;
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
        solanaConnectModal: boolean;
        tronConnectModal: boolean;
        helpPopup: boolean;
        hashPopup: boolean;
        bankPopup: boolean;
        walletAutoConnect: boolean;
        provider: any;
        dAppOption: DAppOptions;
        solanaProvider: any;
        submitted: boolean;
        amount: number;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
        } | undefined;
        errorHandler: Function;
        keplrHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        selectedToken: string;
        avilableTokenList: Array<string>;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        useFIAT: boolean;
        bankDetails: {
            iban: string;
            recipient: string;
        };
        targetNetworkFetching: boolean;
        signature: string;
        uuid: string;
        kycStatus: string;
    }, action: PayloadAction<DAppOptions>) => void;
    setWalletAutoConnect: (state: {
        theme: {
            colorMode?: import("../interface").ColorModeOptions | undefined;
            fontSize?: import("../interface").FontSizeOptions | undefined;
            fontFamily?: string | undefined;
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
        solanaConnectModal: boolean;
        tronConnectModal: boolean;
        helpPopup: boolean;
        hashPopup: boolean;
        bankPopup: boolean;
        walletAutoConnect: boolean;
        provider: any;
        dAppOption: DAppOptions;
        solanaProvider: any;
        submitted: boolean;
        amount: number;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
        } | undefined;
        errorHandler: Function;
        keplrHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        selectedToken: string;
        avilableTokenList: Array<string>;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        useFIAT: boolean;
        bankDetails: {
            iban: string;
            recipient: string;
        };
        targetNetworkFetching: boolean;
        signature: string;
        uuid: string;
        kycStatus: string;
    }, action: PayloadAction<boolean>) => void;
    setSolanaProvider: (state: {
        theme: {
            colorMode?: import("../interface").ColorModeOptions | undefined;
            fontSize?: import("../interface").FontSizeOptions | undefined;
            fontFamily?: string | undefined;
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
        solanaConnectModal: boolean;
        tronConnectModal: boolean;
        helpPopup: boolean;
        hashPopup: boolean;
        bankPopup: boolean;
        walletAutoConnect: boolean;
        provider: any;
        dAppOption: DAppOptions;
        solanaProvider: any;
        submitted: boolean;
        amount: number;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
        } | undefined;
        errorHandler: Function;
        keplrHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        selectedToken: string;
        avilableTokenList: Array<string>;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        useFIAT: boolean;
        bankDetails: {
            iban: string;
            recipient: string;
        };
        targetNetworkFetching: boolean;
        signature: string;
        uuid: string;
        kycStatus: string;
    }, action: PayloadAction<any>) => void;
    setSubmitted: (state: {
        theme: {
            colorMode?: import("../interface").ColorModeOptions | undefined;
            fontSize?: import("../interface").FontSizeOptions | undefined;
            fontFamily?: string | undefined;
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
        solanaConnectModal: boolean;
        tronConnectModal: boolean;
        helpPopup: boolean;
        hashPopup: boolean;
        bankPopup: boolean;
        walletAutoConnect: boolean;
        provider: any;
        dAppOption: DAppOptions;
        solanaProvider: any;
        submitted: boolean;
        amount: number;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
        } | undefined;
        errorHandler: Function;
        keplrHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        selectedToken: string;
        avilableTokenList: Array<string>;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        useFIAT: boolean;
        bankDetails: {
            iban: string;
            recipient: string;
        };
        targetNetworkFetching: boolean;
        signature: string;
        uuid: string;
        kycStatus: string;
    }, action: PayloadAction<boolean>) => void;
    setTransactionOption: (state: {
        theme: {
            colorMode?: import("../interface").ColorModeOptions | undefined;
            fontSize?: import("../interface").FontSizeOptions | undefined;
            fontFamily?: string | undefined;
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
        solanaConnectModal: boolean;
        tronConnectModal: boolean;
        helpPopup: boolean;
        hashPopup: boolean;
        bankPopup: boolean;
        walletAutoConnect: boolean;
        provider: any;
        dAppOption: DAppOptions;
        solanaProvider: any;
        submitted: boolean;
        amount: number;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
        } | undefined;
        errorHandler: Function;
        keplrHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        selectedToken: string;
        avilableTokenList: Array<string>;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        useFIAT: boolean;
        bankDetails: {
            iban: string;
            recipient: string;
        };
        targetNetworkFetching: boolean;
        signature: string;
        uuid: string;
        kycStatus: string;
    }, action: PayloadAction<TransactionOption>) => void;
    setAmount: (state: {
        theme: {
            colorMode?: import("../interface").ColorModeOptions | undefined;
            fontSize?: import("../interface").FontSizeOptions | undefined;
            fontFamily?: string | undefined;
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
        solanaConnectModal: boolean;
        tronConnectModal: boolean;
        helpPopup: boolean;
        hashPopup: boolean;
        bankPopup: boolean;
        walletAutoConnect: boolean;
        provider: any;
        dAppOption: DAppOptions;
        solanaProvider: any;
        submitted: boolean;
        amount: number;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
        } | undefined;
        errorHandler: Function;
        keplrHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        selectedToken: string;
        avilableTokenList: Array<string>;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        useFIAT: boolean;
        bankDetails: {
            iban: string;
            recipient: string;
        };
        targetNetworkFetching: boolean;
        signature: string;
        uuid: string;
        kycStatus: string;
    }, action: PayloadAction<number>) => void;
    setErrorHandler: (state: {
        theme: {
            colorMode?: import("../interface").ColorModeOptions | undefined;
            fontSize?: import("../interface").FontSizeOptions | undefined;
            fontFamily?: string | undefined;
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
        solanaConnectModal: boolean;
        tronConnectModal: boolean;
        helpPopup: boolean;
        hashPopup: boolean;
        bankPopup: boolean;
        walletAutoConnect: boolean;
        provider: any;
        dAppOption: DAppOptions;
        solanaProvider: any;
        submitted: boolean;
        amount: number;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
        } | undefined;
        errorHandler: Function;
        keplrHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        selectedToken: string;
        avilableTokenList: Array<string>;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        useFIAT: boolean;
        bankDetails: {
            iban: string;
            recipient: string;
        };
        targetNetworkFetching: boolean;
        signature: string;
        uuid: string;
        kycStatus: string;
    }, action: PayloadAction<Function>) => void;
    setKeplrHandler: (state: {
        theme: {
            colorMode?: import("../interface").ColorModeOptions | undefined;
            fontSize?: import("../interface").FontSizeOptions | undefined;
            fontFamily?: string | undefined;
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
        solanaConnectModal: boolean;
        tronConnectModal: boolean;
        helpPopup: boolean;
        hashPopup: boolean;
        bankPopup: boolean;
        walletAutoConnect: boolean;
        provider: any;
        dAppOption: DAppOptions;
        solanaProvider: any;
        submitted: boolean;
        amount: number;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
        } | undefined;
        errorHandler: Function;
        keplrHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        selectedToken: string;
        avilableTokenList: Array<string>;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        useFIAT: boolean;
        bankDetails: {
            iban: string;
            recipient: string;
        };
        targetNetworkFetching: boolean;
        signature: string;
        uuid: string;
        kycStatus: string;
    }, action: PayloadAction<Function>) => void;
    setCloseHandler: (state: {
        theme: {
            colorMode?: import("../interface").ColorModeOptions | undefined;
            fontSize?: import("../interface").FontSizeOptions | undefined;
            fontFamily?: string | undefined;
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
        solanaConnectModal: boolean;
        tronConnectModal: boolean;
        helpPopup: boolean;
        hashPopup: boolean;
        bankPopup: boolean;
        walletAutoConnect: boolean;
        provider: any;
        dAppOption: DAppOptions;
        solanaProvider: any;
        submitted: boolean;
        amount: number;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
        } | undefined;
        errorHandler: Function;
        keplrHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        selectedToken: string;
        avilableTokenList: Array<string>;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        useFIAT: boolean;
        bankDetails: {
            iban: string;
            recipient: string;
        };
        targetNetworkFetching: boolean;
        signature: string;
        uuid: string;
        kycStatus: string;
    }, action: PayloadAction<Function>) => void;
    setSwitchChainHandler: (state: {
        theme: {
            colorMode?: import("../interface").ColorModeOptions | undefined;
            fontSize?: import("../interface").FontSizeOptions | undefined;
            fontFamily?: string | undefined;
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
        solanaConnectModal: boolean;
        tronConnectModal: boolean;
        helpPopup: boolean;
        hashPopup: boolean;
        bankPopup: boolean;
        walletAutoConnect: boolean;
        provider: any;
        dAppOption: DAppOptions;
        solanaProvider: any;
        submitted: boolean;
        amount: number;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
        } | undefined;
        errorHandler: Function;
        keplrHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        selectedToken: string;
        avilableTokenList: Array<string>;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        useFIAT: boolean;
        bankDetails: {
            iban: string;
            recipient: string;
        };
        targetNetworkFetching: boolean;
        signature: string;
        uuid: string;
        kycStatus: string;
    }, action: PayloadAction<Function>) => void;
    setInitChainFromProvider: (state: {
        theme: {
            colorMode?: import("../interface").ColorModeOptions | undefined;
            fontSize?: import("../interface").FontSizeOptions | undefined;
            fontFamily?: string | undefined;
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
        solanaConnectModal: boolean;
        tronConnectModal: boolean;
        helpPopup: boolean;
        hashPopup: boolean;
        bankPopup: boolean;
        walletAutoConnect: boolean;
        provider: any;
        dAppOption: DAppOptions;
        solanaProvider: any;
        submitted: boolean;
        amount: number;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
        } | undefined;
        errorHandler: Function;
        keplrHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        selectedToken: string;
        avilableTokenList: Array<string>;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        useFIAT: boolean;
        bankDetails: {
            iban: string;
            recipient: string;
        };
        targetNetworkFetching: boolean;
        signature: string;
        uuid: string;
        kycStatus: string;
    }, action: PayloadAction<boolean>) => void;
    setSuccessHandler: (state: {
        theme: {
            colorMode?: import("../interface").ColorModeOptions | undefined;
            fontSize?: import("../interface").FontSizeOptions | undefined;
            fontFamily?: string | undefined;
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
        solanaConnectModal: boolean;
        tronConnectModal: boolean;
        helpPopup: boolean;
        hashPopup: boolean;
        bankPopup: boolean;
        walletAutoConnect: boolean;
        provider: any;
        dAppOption: DAppOptions;
        solanaProvider: any;
        submitted: boolean;
        amount: number;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
        } | undefined;
        errorHandler: Function;
        keplrHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        selectedToken: string;
        avilableTokenList: Array<string>;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        useFIAT: boolean;
        bankDetails: {
            iban: string;
            recipient: string;
        };
        targetNetworkFetching: boolean;
        signature: string;
        uuid: string;
        kycStatus: string;
    }, action: PayloadAction<Function>) => void;
    setServiceFee: (state: {
        theme: {
            colorMode?: import("../interface").ColorModeOptions | undefined;
            fontSize?: import("../interface").FontSizeOptions | undefined;
            fontFamily?: string | undefined;
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
        solanaConnectModal: boolean;
        tronConnectModal: boolean;
        helpPopup: boolean;
        hashPopup: boolean;
        bankPopup: boolean;
        walletAutoConnect: boolean;
        provider: any;
        dAppOption: DAppOptions;
        solanaProvider: any;
        submitted: boolean;
        amount: number;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
        } | undefined;
        errorHandler: Function;
        keplrHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        selectedToken: string;
        avilableTokenList: Array<string>;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        useFIAT: boolean;
        bankDetails: {
            iban: string;
            recipient: string;
        };
        targetNetworkFetching: boolean;
        signature: string;
        uuid: string;
        kycStatus: string;
    }, action: PayloadAction<number>) => void;
    setMode: (state: {
        theme: {
            colorMode?: import("../interface").ColorModeOptions | undefined;
            fontSize?: import("../interface").FontSizeOptions | undefined;
            fontFamily?: string | undefined;
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
        solanaConnectModal: boolean;
        tronConnectModal: boolean;
        helpPopup: boolean;
        hashPopup: boolean;
        bankPopup: boolean;
        walletAutoConnect: boolean;
        provider: any;
        dAppOption: DAppOptions;
        solanaProvider: any;
        submitted: boolean;
        amount: number;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
        } | undefined;
        errorHandler: Function;
        keplrHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        selectedToken: string;
        avilableTokenList: Array<string>;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        useFIAT: boolean;
        bankDetails: {
            iban: string;
            recipient: string;
        };
        targetNetworkFetching: boolean;
        signature: string;
        uuid: string;
        kycStatus: string;
    }, action: PayloadAction<ModeOptions>) => void;
    setFeeDeduct: (state: {
        theme: {
            colorMode?: import("../interface").ColorModeOptions | undefined;
            fontSize?: import("../interface").FontSizeOptions | undefined;
            fontFamily?: string | undefined;
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
        solanaConnectModal: boolean;
        tronConnectModal: boolean;
        helpPopup: boolean;
        hashPopup: boolean;
        bankPopup: boolean;
        walletAutoConnect: boolean;
        provider: any;
        dAppOption: DAppOptions;
        solanaProvider: any;
        submitted: boolean;
        amount: number;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
        } | undefined;
        errorHandler: Function;
        keplrHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        selectedToken: string;
        avilableTokenList: Array<string>;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        useFIAT: boolean;
        bankDetails: {
            iban: string;
            recipient: string;
        };
        targetNetworkFetching: boolean;
        signature: string;
        uuid: string;
        kycStatus: string;
    }, action: PayloadAction<boolean>) => void;
    setBackendUrl: (state: {
        theme: {
            colorMode?: import("../interface").ColorModeOptions | undefined;
            fontSize?: import("../interface").FontSizeOptions | undefined;
            fontFamily?: string | undefined;
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
        solanaConnectModal: boolean;
        tronConnectModal: boolean;
        helpPopup: boolean;
        hashPopup: boolean;
        bankPopup: boolean;
        walletAutoConnect: boolean;
        provider: any;
        dAppOption: DAppOptions;
        solanaProvider: any;
        submitted: boolean;
        amount: number;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
        } | undefined;
        errorHandler: Function;
        keplrHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        selectedToken: string;
        avilableTokenList: Array<string>;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        useFIAT: boolean;
        bankDetails: {
            iban: string;
            recipient: string;
        };
        targetNetworkFetching: boolean;
        signature: string;
        uuid: string;
        kycStatus: string;
    }, action: PayloadAction<string>) => void;
    setNodeProviderQuery: (state: {
        theme: {
            colorMode?: import("../interface").ColorModeOptions | undefined;
            fontSize?: import("../interface").FontSizeOptions | undefined;
            fontFamily?: string | undefined;
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
        solanaConnectModal: boolean;
        tronConnectModal: boolean;
        helpPopup: boolean;
        hashPopup: boolean;
        bankPopup: boolean;
        walletAutoConnect: boolean;
        provider: any;
        dAppOption: DAppOptions;
        solanaProvider: any;
        submitted: boolean;
        amount: number;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
        } | undefined;
        errorHandler: Function;
        keplrHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        selectedToken: string;
        avilableTokenList: Array<string>;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        useFIAT: boolean;
        bankDetails: {
            iban: string;
            recipient: string;
        };
        targetNetworkFetching: boolean;
        signature: string;
        uuid: string;
        kycStatus: string;
    }, action: PayloadAction<string>) => void;
    setTxId: (state: {
        theme: {
            colorMode?: import("../interface").ColorModeOptions | undefined;
            fontSize?: import("../interface").FontSizeOptions | undefined;
            fontFamily?: string | undefined;
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
        solanaConnectModal: boolean;
        tronConnectModal: boolean;
        helpPopup: boolean;
        hashPopup: boolean;
        bankPopup: boolean;
        walletAutoConnect: boolean;
        provider: any;
        dAppOption: DAppOptions;
        solanaProvider: any;
        submitted: boolean;
        amount: number;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
        } | undefined;
        errorHandler: Function;
        keplrHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        selectedToken: string;
        avilableTokenList: Array<string>;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        useFIAT: boolean;
        bankDetails: {
            iban: string;
            recipient: string;
        };
        targetNetworkFetching: boolean;
        signature: string;
        uuid: string;
        kycStatus: string;
    }, action: PayloadAction<number>) => void;
    setSelectedToken: (state: {
        theme: {
            colorMode?: import("../interface").ColorModeOptions | undefined;
            fontSize?: import("../interface").FontSizeOptions | undefined;
            fontFamily?: string | undefined;
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
        solanaConnectModal: boolean;
        tronConnectModal: boolean;
        helpPopup: boolean;
        hashPopup: boolean;
        bankPopup: boolean;
        walletAutoConnect: boolean;
        provider: any;
        dAppOption: DAppOptions;
        solanaProvider: any;
        submitted: boolean;
        amount: number;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
        } | undefined;
        errorHandler: Function;
        keplrHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        selectedToken: string;
        avilableTokenList: Array<string>;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        useFIAT: boolean;
        bankDetails: {
            iban: string;
            recipient: string;
        };
        targetNetworkFetching: boolean;
        signature: string;
        uuid: string;
        kycStatus: string;
    }, action: PayloadAction<string>) => void;
    setAvailableTokenList: (state: {
        theme: {
            colorMode?: import("../interface").ColorModeOptions | undefined;
            fontSize?: import("../interface").FontSizeOptions | undefined;
            fontFamily?: string | undefined;
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
        solanaConnectModal: boolean;
        tronConnectModal: boolean;
        helpPopup: boolean;
        hashPopup: boolean;
        bankPopup: boolean;
        walletAutoConnect: boolean;
        provider: any;
        dAppOption: DAppOptions;
        solanaProvider: any;
        submitted: boolean;
        amount: number;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
        } | undefined;
        errorHandler: Function;
        keplrHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        selectedToken: string;
        avilableTokenList: Array<string>;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        useFIAT: boolean;
        bankDetails: {
            iban: string;
            recipient: string;
        };
        targetNetworkFetching: boolean;
        signature: string;
        uuid: string;
        kycStatus: string;
    }, action: PayloadAction<Array<string>>) => void;
    setCompliantOption: (state: {
        theme: {
            colorMode?: import("../interface").ColorModeOptions | undefined;
            fontSize?: import("../interface").FontSizeOptions | undefined;
            fontFamily?: string | undefined;
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
        solanaConnectModal: boolean;
        tronConnectModal: boolean;
        helpPopup: boolean;
        hashPopup: boolean;
        bankPopup: boolean;
        walletAutoConnect: boolean;
        provider: any;
        dAppOption: DAppOptions;
        solanaProvider: any;
        submitted: boolean;
        amount: number;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
        } | undefined;
        errorHandler: Function;
        keplrHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        selectedToken: string;
        avilableTokenList: Array<string>;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        useFIAT: boolean;
        bankDetails: {
            iban: string;
            recipient: string;
        };
        targetNetworkFetching: boolean;
        signature: string;
        uuid: string;
        kycStatus: string;
    }, action: PayloadAction<boolean>) => void;
    setSourceCompliant: (state: {
        theme: {
            colorMode?: import("../interface").ColorModeOptions | undefined;
            fontSize?: import("../interface").FontSizeOptions | undefined;
            fontFamily?: string | undefined;
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
        solanaConnectModal: boolean;
        tronConnectModal: boolean;
        helpPopup: boolean;
        hashPopup: boolean;
        bankPopup: boolean;
        walletAutoConnect: boolean;
        provider: any;
        dAppOption: DAppOptions;
        solanaProvider: any;
        submitted: boolean;
        amount: number;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
        } | undefined;
        errorHandler: Function;
        keplrHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        selectedToken: string;
        avilableTokenList: Array<string>;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        useFIAT: boolean;
        bankDetails: {
            iban: string;
            recipient: string;
        };
        targetNetworkFetching: boolean;
        signature: string;
        uuid: string;
        kycStatus: string;
    }, action: PayloadAction<string>) => void;
    setTargetCompliant: (state: {
        theme: {
            colorMode?: import("../interface").ColorModeOptions | undefined;
            fontSize?: import("../interface").FontSizeOptions | undefined;
            fontFamily?: string | undefined;
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
        solanaConnectModal: boolean;
        tronConnectModal: boolean;
        helpPopup: boolean;
        hashPopup: boolean;
        bankPopup: boolean;
        walletAutoConnect: boolean;
        provider: any;
        dAppOption: DAppOptions;
        solanaProvider: any;
        submitted: boolean;
        amount: number;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
        } | undefined;
        errorHandler: Function;
        keplrHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        selectedToken: string;
        avilableTokenList: Array<string>;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        useFIAT: boolean;
        bankDetails: {
            iban: string;
            recipient: string;
        };
        targetNetworkFetching: boolean;
        signature: string;
        uuid: string;
        kycStatus: string;
    }, action: PayloadAction<string>) => void;
    setUseFIAT: (state: {
        theme: {
            colorMode?: import("../interface").ColorModeOptions | undefined;
            fontSize?: import("../interface").FontSizeOptions | undefined;
            fontFamily?: string | undefined;
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
        solanaConnectModal: boolean;
        tronConnectModal: boolean;
        helpPopup: boolean;
        hashPopup: boolean;
        bankPopup: boolean;
        walletAutoConnect: boolean;
        provider: any;
        dAppOption: DAppOptions;
        solanaProvider: any;
        submitted: boolean;
        amount: number;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
        } | undefined;
        errorHandler: Function;
        keplrHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        selectedToken: string;
        avilableTokenList: Array<string>;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        useFIAT: boolean;
        bankDetails: {
            iban: string;
            recipient: string;
        };
        targetNetworkFetching: boolean;
        signature: string;
        uuid: string;
        kycStatus: string;
    }, action: PayloadAction<boolean>) => void;
    setBankDetails: (state: {
        theme: {
            colorMode?: import("../interface").ColorModeOptions | undefined;
            fontSize?: import("../interface").FontSizeOptions | undefined;
            fontFamily?: string | undefined;
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
        solanaConnectModal: boolean;
        tronConnectModal: boolean;
        helpPopup: boolean;
        hashPopup: boolean;
        bankPopup: boolean;
        walletAutoConnect: boolean;
        provider: any;
        dAppOption: DAppOptions;
        solanaProvider: any;
        submitted: boolean;
        amount: number;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
        } | undefined;
        errorHandler: Function;
        keplrHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        selectedToken: string;
        avilableTokenList: Array<string>;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        useFIAT: boolean;
        bankDetails: {
            iban: string;
            recipient: string;
        };
        targetNetworkFetching: boolean;
        signature: string;
        uuid: string;
        kycStatus: string;
    }, action: PayloadAction<BankDetails>) => void;
    setTargetChainFetching: (state: {
        theme: {
            colorMode?: import("../interface").ColorModeOptions | undefined;
            fontSize?: import("../interface").FontSizeOptions | undefined;
            fontFamily?: string | undefined;
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
        solanaConnectModal: boolean;
        tronConnectModal: boolean;
        helpPopup: boolean;
        hashPopup: boolean;
        bankPopup: boolean;
        walletAutoConnect: boolean;
        provider: any;
        dAppOption: DAppOptions;
        solanaProvider: any;
        submitted: boolean;
        amount: number;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
        } | undefined;
        errorHandler: Function;
        keplrHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        selectedToken: string;
        avilableTokenList: Array<string>;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        useFIAT: boolean;
        bankDetails: {
            iban: string;
            recipient: string;
        };
        targetNetworkFetching: boolean;
        signature: string;
        uuid: string;
        kycStatus: string;
    }, action: PayloadAction<boolean>) => void;
    setSignature: (state: {
        theme: {
            colorMode?: import("../interface").ColorModeOptions | undefined;
            fontSize?: import("../interface").FontSizeOptions | undefined;
            fontFamily?: string | undefined;
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
        solanaConnectModal: boolean;
        tronConnectModal: boolean;
        helpPopup: boolean;
        hashPopup: boolean;
        bankPopup: boolean;
        walletAutoConnect: boolean;
        provider: any;
        dAppOption: DAppOptions;
        solanaProvider: any;
        submitted: boolean;
        amount: number;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
        } | undefined;
        errorHandler: Function;
        keplrHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        selectedToken: string;
        avilableTokenList: Array<string>;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        useFIAT: boolean;
        bankDetails: {
            iban: string;
            recipient: string;
        };
        targetNetworkFetching: boolean;
        signature: string;
        uuid: string;
        kycStatus: string;
    }, action: PayloadAction<string>) => void;
    setUuid: (state: {
        theme: {
            colorMode?: import("../interface").ColorModeOptions | undefined;
            fontSize?: import("../interface").FontSizeOptions | undefined;
            fontFamily?: string | undefined;
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
        solanaConnectModal: boolean;
        tronConnectModal: boolean;
        helpPopup: boolean;
        hashPopup: boolean;
        bankPopup: boolean;
        walletAutoConnect: boolean;
        provider: any;
        dAppOption: DAppOptions;
        solanaProvider: any;
        submitted: boolean;
        amount: number;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
        } | undefined;
        errorHandler: Function;
        keplrHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        selectedToken: string;
        avilableTokenList: Array<string>;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        useFIAT: boolean;
        bankDetails: {
            iban: string;
            recipient: string;
        };
        targetNetworkFetching: boolean;
        signature: string;
        uuid: string;
        kycStatus: string;
    }, action: PayloadAction<string>) => void;
    setKYCStatus: (state: {
        theme: {
            colorMode?: import("../interface").ColorModeOptions | undefined;
            fontSize?: import("../interface").FontSizeOptions | undefined;
            fontFamily?: string | undefined;
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
        solanaConnectModal: boolean;
        tronConnectModal: boolean;
        helpPopup: boolean;
        hashPopup: boolean;
        bankPopup: boolean;
        walletAutoConnect: boolean;
        provider: any;
        dAppOption: DAppOptions;
        solanaProvider: any;
        submitted: boolean;
        amount: number;
        feeDeduct: boolean;
        transactionOption?: {
            targetChain: import("../interface").SupportNetworks;
            targetAddress: string;
            amount: number;
        } | undefined;
        errorHandler: Function;
        keplrHandler: Function;
        closeHandler: Function;
        successHandler: Function;
        switchChainHandler: Function;
        initChainFromProvider: boolean;
        serviceFee: number;
        backendUrl: string;
        nodeProviderQuery: string;
        kimaExplorerUrl: string;
        txId: number;
        selectedToken: string;
        avilableTokenList: Array<string>;
        compliantOption: boolean;
        sourceCompliant: string;
        targetCompliant: string;
        useFIAT: boolean;
        bankDetails: {
            iban: string;
            recipient: string;
        };
        targetNetworkFetching: boolean;
        signature: string;
        uuid: string;
        kycStatus: string;
    }, action: PayloadAction<string>) => void;
}, "option", "option", toolkitRaw.SliceSelectors<OptionState>>;
export declare const initialize: toolkitRaw.ActionCreatorWithoutPayload<any>, setTokenOptions: toolkitRaw.ActionCreatorWithPayload<TokenOptions, any>, setKimaExplorer: toolkitRaw.ActionCreatorWithPayload<string, any>, setTheme: toolkitRaw.ActionCreatorWithPayload<ThemeOptions, any>, setSourceChain: toolkitRaw.ActionCreatorWithPayload<string, any>, setTargetChain: toolkitRaw.ActionCreatorWithPayload<string, any>, setTargetAddress: toolkitRaw.ActionCreatorWithPayload<string, any>, setSolanaConnectModal: toolkitRaw.ActionCreatorWithPayload<boolean, any>, setTronConnectModal: toolkitRaw.ActionCreatorWithPayload<boolean, any>, setHelpPopup: toolkitRaw.ActionCreatorWithPayload<boolean, any>, setHashPopup: toolkitRaw.ActionCreatorWithPayload<boolean, any>, setBankPopup: toolkitRaw.ActionCreatorWithPayload<boolean, any>, setSolanaProvider: toolkitRaw.ActionCreatorWithPayload<any, any>, setProvider: toolkitRaw.ActionCreatorWithPayload<any, any>, setDappOption: toolkitRaw.ActionCreatorWithPayload<DAppOptions, any>, setWalletAutoConnect: toolkitRaw.ActionCreatorWithPayload<boolean, any>, setSubmitted: toolkitRaw.ActionCreatorWithPayload<boolean, any>, setTransactionOption: toolkitRaw.ActionCreatorWithPayload<TransactionOption, any>, setAmount: toolkitRaw.ActionCreatorWithPayload<number, any>, setErrorHandler: toolkitRaw.ActionCreatorWithPayload<Function, any>, setKeplrHandler: toolkitRaw.ActionCreatorWithPayload<Function, any>, setCloseHandler: toolkitRaw.ActionCreatorWithPayload<Function, any>, setSuccessHandler: toolkitRaw.ActionCreatorWithPayload<Function, any>, setSwitchChainHandler: toolkitRaw.ActionCreatorWithPayload<Function, any>, setInitChainFromProvider: toolkitRaw.ActionCreatorWithPayload<boolean, any>, setServiceFee: toolkitRaw.ActionCreatorWithPayload<number, any>, setMode: toolkitRaw.ActionCreatorWithPayload<ModeOptions, any>, setFeeDeduct: toolkitRaw.ActionCreatorWithPayload<boolean, any>, setBackendUrl: toolkitRaw.ActionCreatorWithPayload<string, any>, setNodeProviderQuery: toolkitRaw.ActionCreatorWithPayload<string, any>, setTxId: toolkitRaw.ActionCreatorWithPayload<number, any>, setSelectedToken: toolkitRaw.ActionCreatorWithPayload<string, any>, setAvailableTokenList: toolkitRaw.ActionCreatorWithPayload<string[], any>, setCompliantOption: toolkitRaw.ActionCreatorWithPayload<boolean, any>, setSourceCompliant: toolkitRaw.ActionCreatorWithPayload<string, any>, setTargetCompliant: toolkitRaw.ActionCreatorWithPayload<string, any>, setUseFIAT: toolkitRaw.ActionCreatorWithPayload<boolean, any>, setBankDetails: toolkitRaw.ActionCreatorWithPayload<BankDetails, any>, setTargetChainFetching: toolkitRaw.ActionCreatorWithPayload<boolean, any>, setSignature: toolkitRaw.ActionCreatorWithPayload<string, any>, setUuid: toolkitRaw.ActionCreatorWithPayload<string, any>, setKYCStatus: toolkitRaw.ActionCreatorWithPayload<string, any>;
declare const _default: toolkitRaw.Reducer<OptionState, toolkitRaw.UnknownAction, OptionState>;
export default _default;
