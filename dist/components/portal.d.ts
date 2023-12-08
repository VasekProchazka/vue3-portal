declare const _default: import("vue").DefineComponent<{
    disabled: {
        type: BooleanConstructor;
    };
    name: {
        type: StringConstructor;
        default: () => string;
    };
    order: {
        type: NumberConstructor;
        default: number;
    };
    slotProps: {
        type: () => Record<string, unknown>;
        default: () => {};
    };
    tag: {
        type: StringConstructor;
        default: string;
    };
    to: {
        type: StringConstructor;
        default: () => string;
    };
}, () => any, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    disabled: {
        type: BooleanConstructor;
    };
    name: {
        type: StringConstructor;
        default: () => string;
    };
    order: {
        type: NumberConstructor;
        default: number;
    };
    slotProps: {
        type: () => Record<string, unknown>;
        default: () => {};
    };
    tag: {
        type: StringConstructor;
        default: string;
    };
    to: {
        type: StringConstructor;
        default: () => string;
    };
}>>, {
    name: string;
    disabled: boolean;
    order: number;
    slotProps: Record<string, unknown>;
    tag: string;
    to: string;
}, {}>;
export default _default;
