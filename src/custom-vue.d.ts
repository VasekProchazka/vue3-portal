import { Wormhole } from "@/model/Wormhole"

export {}
// eslint-disable-next-line quotes
declare module 'vue' {
  interface ComponentCustomProperties {
    $wormhole: Wormhole
  }
}


