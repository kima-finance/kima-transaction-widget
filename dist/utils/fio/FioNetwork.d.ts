interface Options {
    isTestnet: boolean;
}
export declare class FioSdk {
    isTestnet: boolean;
    explorerLink: string;
    providerLink: string;
    fioSdk: any;
    constructor(options: Options);
    getPubAddress(fioHandle: string, chainCode: string, tokenCode: string): Promise<any>;
}
export {};
