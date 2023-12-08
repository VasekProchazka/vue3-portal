import { Transport } from '../model/Transport';
export declare const inBrowser: boolean;
export declare function freeze(item: Record<string, unknown>): Readonly<Record<string, unknown>>;
export declare function combinePassengers(transports: Transport[], slotProps?: {}): never[];
export declare function stableSort(array: unknown[], compareFn: CallableFunction): unknown[];
export declare function pick(obj: Record<string, unknown>, keys: string[]): {};
