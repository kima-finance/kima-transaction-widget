export declare function debounce<F extends (...args: any[]) => void>(func: F, delay: number): (this: ThisParameterType<F>, ...args: Parameters<F>) => void;
