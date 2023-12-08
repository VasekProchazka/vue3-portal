import { App, reactive } from "vue"
import Portal from "@/components/portal"
import PortalTarget from "@/components/portal-target"
import wormhole from "@/utils/wormhole"

interface PortalOptions {
    portalName?: string,
    portalTargetName?: string,
}

const portalPlugin = {
  ...wormhole,
  install: (app: App, options: PortalOptions = {}) => {
    app.component(options.portalName || `Portal`, Portal)
    app.component(options.portalTargetName || `PortalTarget`, PortalTarget)
    app.config.globalProperties.$wormhole = reactive(portalPlugin)
    app.provide(`wormhole`, app.config.globalProperties.$wormhole)
  },
}

export default portalPlugin

export { Portal, PortalTarget }
