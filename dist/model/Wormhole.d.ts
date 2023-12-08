import { Transport } from '../model/Transport';
export interface Wormhole {
    transports: Record<string, Transport[]>;
    trackInstances: boolean;
    open: CallableFunction;
    close: CallableFunction;
    getTransportIndex: CallableFunction;
}
