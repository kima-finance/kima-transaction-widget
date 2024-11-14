import React from 'react';
interface Props {
    sourceChain: string;
    targetChain: string;
}
declare const NetworkLabel: ({ sourceChain, targetChain }: Props) => React.JSX.Element;
export default NetworkLabel;
