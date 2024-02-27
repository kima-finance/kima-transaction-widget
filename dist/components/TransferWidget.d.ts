import React from 'react';
import { PaymentTitleOption, ThemeOptions, TitleOption } from '../interface';
import '../index.css';
interface Props {
    theme: ThemeOptions;
    helpURL?: string;
    titleOption?: TitleOption;
    paymentTitleOption?: PaymentTitleOption;
}
export declare const TransferWidget: ({ theme, helpURL, titleOption, paymentTitleOption }: Props) => React.JSX.Element;
export {};
