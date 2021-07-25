import { h } from "vue";
import { combinePassengers } from "../utils";

export default {
    name: "portalTarget",
    props: {
        multiple: {
            type: Boolean,
            default: false,
        },
        name: {
            type: String,
            required: true,
        },
        slim: {
            type: Boolean,
            default: false,
        },
        slotProps: {
            type: Object,
            default: () => ({}),
        },
        tag: {
            type: String,
            default: "div",
        },
        transition: {
            type: [String, Object, Function],
        },
    },
    data() {
        return {
            transports: this.$wormhole.transports,
            firstRender: true,
        };
    },
    watch: {
        ownTransports() {
            this.$emit("change", this.children().length > 0);
        },
    },
    mounted() {
        if (this.transition) {
            this.$nextTick(() => {
                // only when we have a transition, because it causes a re-render
                this.firstRender = false;
            });
        }
    },
    computed: {
        ownTransports() {
            const transports = this.transports[this.name] || [];
            if (this.multiple) return transports;
            return transports.length === 0 ? [] : [transports[transports.length - 1]];
        },
        passengers() {
            return combinePassengers(this.ownTransports, this.slotProps);
        },
    },

    methods: {
        // can't be a computed prop because it has to "react" to $slot changes.
        children() {
            return this.passengers.length ? this.passengers : this.$slots.default || [];
        },
        // can't be a computed prop because it has to "react" to this.children().
        noWrapper() {
            const noWrapper = this.slim && !this.transition;
            if (noWrapper && this.children().length > 1) {
                console.warn("[portal-vue]: PortalTarget with `slim` option received more than one child element.");
            }
            return noWrapper;
        },
    },
    render() {
        const noWrapper = this.noWrapper();
        const children = this.children();
        const Tag = this.transition || this.tag;

        return noWrapper
            ? children[0]
            : this.slim && !Tag
            ? h()
            : h(
                  Tag,
                  {
                      props: {
                          tag: this.transition && this.tag ? this.tag : undefined,
                      },
                      class: { "vue-portal-target": true },
                  },

                  children
              );
    },
};
