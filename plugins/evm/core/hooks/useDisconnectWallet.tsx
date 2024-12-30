import { useDisconnect } from "@reown/appkit/react";

function useDisconnectWallet() {
    const {disconnect} = useDisconnect()

    return {disconnectWallet: disconnect}
}

export default useDisconnectWallet