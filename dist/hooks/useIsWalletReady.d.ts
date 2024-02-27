declare function useIsWalletReady(enableNetworkAutoswitch?: boolean): {
    isReady: boolean;
    statusMessage: string;
    walletAddress?: string;
    forceNetworkSwitch: () => void;
};
export default useIsWalletReady;
