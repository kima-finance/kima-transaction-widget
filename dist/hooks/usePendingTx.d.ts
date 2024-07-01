import { PendingTxData } from '../utils/constants';
export default function usePendingTx({ walletAddress }: {
    walletAddress: string;
}): {
    pendingTxData: PendingTxData[];
    pendingTxs: number;
};
