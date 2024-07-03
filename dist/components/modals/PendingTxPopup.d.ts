import React from 'react';
import { PendingTxData } from '../../utils/constants';
declare const PendingTxPopup: ({ txData, handleHtlcContinue }: {
    txData: Array<PendingTxData>;
    handleHtlcContinue: (expireTime: any, hash: any, amount: any) => {};
}) => React.JSX.Element;
export default PendingTxPopup;
