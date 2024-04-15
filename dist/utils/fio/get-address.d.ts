interface FioAddress {
    address: string;
    chainCode: string;
    tokenCode: string;
}
export declare const getPubAddress: (fioHandle: string, chainCode: string, tokenCode: string, isTestnet: boolean) => Promise<any>;
export declare const getPubAddresses: (fioHandle: string, isTestnet: boolean) => Promise<FioAddress[]>;
export declare const getAddressByFio: (fioHandle: string, chainCode: string, tokenCode: string, isTestnet: boolean) => Promise<string>;
export declare const isValidFioHandle: (fioHandle: string) => any;
export {};
