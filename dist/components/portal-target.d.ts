declare const _default: import("vue").DefineComponent<{
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    name: {
        type: StringConstructor;
        required: true;
    };
    slim: {
        type: BooleanConstructor;
        default: boolean;
    };
    slotProps: {
        type: ObjectConstructor;
        default: () => {};
    };
    tag: {
        type: StringConstructor;
        default: string;
    };
    transition: {
        type: (StringConstructor | ObjectConstructor | FunctionConstructor)[];
    };
}, {
    transports: import("vue").Ref<Record<string, import("../model/Transport").Transport[]>>;
    firstRender: import("vue").Ref<boolean>;
    ownTransports: () => import("../model/Transport").Transport[];
    passengers: () => never[];
    children: () => import("vue").Slot<any> | never[];
    noWrapper: () => boolean;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    name: {
        type: StringConstructor;
        required: true;
    };
    slim: {
        type: BooleanConstructor;
        default: boolean;
    };
    slotProps: {
        type: ObjectConstructor;
        default: () => {};
    };
    tag: {
        type: StringConstructor;
        default: string;
    };
    transition: {
        type: (StringConstructor | ObjectConstructor | FunctionConstructor)[];
    };
}>>, {
    slotProps: Record<string, any>;
    tag: string;
    multiple: boolean;
    slim: boolean;
}, {}>;
export default _default;
