import { reactive } from "vue";
import Portal from "./components/portal";
import PortalTarget from "./components/portal-target";
import wormhole from "./utils/wormhole";

const portalPlugin = {
    ...wormhole,
    install: (app, options = {}) => {
        app.component(options.portalName || "Portal", Portal);
        app.component(options.portalTargetName || "PortalTarget", PortalTarget);
        app.config.globalProperties.$wormhole = reactive(portalPlugin);
    },
};

export default portalPlugin;

export { Portal, PortalTarget };
