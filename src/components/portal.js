import { h } from "vue";

let _id = 1;

export default {
    name: "portal",
    props: {
        disabled: {
            type: Boolean,
        },
        name: {
            type: String,
            default: () => String(_id++),
        },
        order: {
            type: Number,
            default: 0,
        },
        slotProps: {
            type: Object,
            default: () => ({}),
        },
        tag: {
            type: String,
            default: "DIV",
        },
        to: {
            type: String,
            default: () => String(Math.round(Math.random() * 10000000)),
        },
    },
    mounted() {
        if (!this.disabled) this.sendUpdate();
    },

    updated() {
        if (!this.disabled) this.sendUpdate();
    },

    beforeUnmount() {
        this.clear();
    },
    watch: {
        to(newValue, oldValue) {
            oldValue && oldValue !== newValue && this.clear(oldValue);
            this.sendUpdate();
        },
    },

    methods: {
        clear(target) {
            const closer = {
                from: this.name,
                to: target || this.to,
            };
            this.$wormhole.close(closer);
        },
        normalizeSlots() {
            return this.$slots.default();
        },
        normalizeOwnChildren(children) {
            return typeof children === "function" ? children(this.slotProps) : children;
        },
        sendUpdate() {
            const slotContent = this.normalizeSlots();
            if (slotContent) {
                const transport = {
                    from: this.name,
                    to: this.to,
                    passengers: slotContent,
                    order: this.order,
                };
                this.$wormhole.open(transport);
            } else {
                this.clear();
            }
        },
    },

    render() {
        const children = this.$slots.default() || [];
        const Tag = this.tag;
        if (children && this.disabled) {
            return children.length <= 1 ? (
                this.normalizeOwnChildren(children)[0]
            ) : (
                <Tag>{this.normalizeOwnChildren(children)}</Tag>
            );
        } else {
            return h(Tag, {
                class: { "v-portal": true },
                style: { display: "none" },
                key: "v-portal-placeholder",
            });
        }
    },
};
