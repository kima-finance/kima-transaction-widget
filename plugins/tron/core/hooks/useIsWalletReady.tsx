import { useMemo } from 'react';
import { useWallet as useTronWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import { useSelector } from 'react-redux';
import {
  selectSourceChain,
  selectTargetChain,
  selectTargetChainFetching,
} from '@store/selectors';

const createWalletStatus = (
  isReady: boolean,
  statusMessage: string = '',
  walletAddress?: string
) => ({
  isReady,
  statusMessage,
  walletAddress,
});

function useIsWalletReady(): {
  isReady: boolean;
  statusMessage: string;
  walletAddress?: string;
} {
  const { address: tronAddress } = useTronWallet();

  const sourceChain = useSelector(selectSourceChain);
  const targetChain = useSelector(selectTargetChain);
  const targetNetworkFetching = useSelector(selectTargetChainFetching);
  const correctChain = useMemo(() => {
    if (sourceChain === ChainName.FIAT && !targetNetworkFetching)
      return targetChain;
    return sourceChain;
  }, [sourceChain, targetChain, targetNetworkFetching]);

  return useMemo(() => {
    if (correctChain === 'TRX') {
      if (tronAddress) {
        return createWalletStatus(true, undefined, tronAddress);
      }
      return createWalletStatus(false, 'Wallet not connected', '');
    }

    return createWalletStatus(false, '', undefined);
  }, [correctChain, tronAddress]);
}

export default useIsWalletReady;
