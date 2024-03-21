declare function useIsWalletReady(): {
    isReady: boolean;
    statusMessage: string;
    walletAddress?: string;
    forceNetworkSwitch: () => void;
};
export default useIsWalletReady;
