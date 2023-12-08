import { freeze, inBrowser, stableSort } from "."
import { Wormhole } from "@/model/Wormhole"
import { Transport } from "@/model/Transport"

export default {
  transports: {},
  trackInstances: inBrowser,
  open(transport: Transport) {
    if (!inBrowser) {return}
    const { to, from, passengers, order = Infinity } = transport
    if (!to || !from || !passengers) {return}

    const newTransport = {
      to,
      from,
      passengers: freeze(passengers),
      order,
    }

    const keys = Object.keys(this.transports)

    if (keys.indexOf(to) === -1) { this.transports[to] = [] }

    const currentIndex = this.getTransportIndex(newTransport)
    // Copying the array here so that the PortalTarget change event will actually contain two distinct arrays
    const newTransports = this.transports[to].slice(0)
    if (currentIndex === -1) {
      newTransports.push(newTransport)
    } else {
      newTransports[currentIndex] = newTransport
    }

    this.transports[to] = stableSort(newTransports, (a: Transport, b: Transport) => a.order - b.order) as Transport[]
  },

  close(transport: Transport, force = false) {
    const { to, from } = transport
    if (!to || (!from && force === false)) {return}
    if (!this.transports[to]) {
      return
    }

    if (force) {
      this.transports[to] = []
    } else {
      const index = this.getTransportIndex(transport)
      if (index >= 0) {
        // Copying the array here so that the PortalTarget change event will actually contain two distinct arrays
        const newTransports = this.transports[to].slice(0)
        newTransports.splice(index, 1)
        this.transports[to] = newTransports
      }
    }
  },
  getTransportIndex(transport: Transport) {
    const { to, from } = transport

    for (const i in this.transports[to]) {
      if (this.transports[to][i].from === from) {
        return +i
      }
    }
    return -1
  },
} as Wormhole
