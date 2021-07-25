import { freeze, inBrowser, stableSort } from "../utils";

export default {
    transports: {},
    targets: {},
    sources: {},
    trackInstances: inBrowser,
    open(transport) {
        if (!inBrowser) return;
        const { to, from, passengers, order = Infinity } = transport;
        if (!to || !from || !passengers) return;

        const newTransport = {
            to,
            from,
            passengers: freeze(passengers),
            order,
        };

        const keys = Object.keys(this.transports);

        if (keys.indexOf(to) === -1) this.transports[to] = [];

        const currentIndex = this.getTransportIndex(newTransport);
        // Copying the array here so that the PortalTarget change event will actually contain two distinct arrays
        const newTransports = this.transports[to].slice(0);
        if (currentIndex === -1) {
            newTransports.push(newTransport);
        } else {
            newTransports[currentIndex] = newTransport;
        }

        this.transports[to] = stableSort(newTransports, (a, b) => a.order - b.order);
    },

    close(transport, force = false) {
        const { to, from } = transport;
        if (!to || (!from && force === false)) return;
        if (!this.transports[to]) {
            return;
        }

        if (force) {
            this.transports[to] = [];
        } else {
            const index = this.getTransportIndex(transport);
            if (index >= 0) {
                // Copying the array here so that the PortalTarget change event will actually contain two distinct arrays
                const newTransports = this.transports[to].slice(0);
                newTransports.splice(index, 1);
                this.transports[to] = newTransports;
            }
        }
    },
    getTransportIndex({ to, from }) {
        for (const i in this.transports[to]) {
            if (this.transports[to][i].from === from) {
                return +i;
            }
        }
        return -1;
    },
};
