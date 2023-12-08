import { App } from "vue";
import Portal from './components/portal';
import PortalTarget from './components/portal-target';
interface PortalOptions {
    portalName?: string;
    portalTargetName?: string;
}
declare const portalPlugin: {
    install: (app: App, options?: PortalOptions) => void;
    transports: Record<string, import("./model/Transport").Transport[]>;
    trackInstances: boolean;
    open: CallableFunction;
    close: CallableFunction;
    getTransportIndex: CallableFunction;
};
export default portalPlugin;
export { Portal, PortalTarget };
