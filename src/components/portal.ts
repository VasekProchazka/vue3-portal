import { Wormhole } from '@/model/Wormhole'
import { defineComponent, useSlots, onMounted, onUpdated, onBeforeUnmount, watch, h, VNode, inject } from 'vue'

let _id = 1

export default defineComponent({
  name: `Portal`,
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
      type: Object as () => Record<string, unknown>,
      default: () => ({}),
    },
    tag: {
      type: String,
      default: `DIV`,
    },
    to: {
      type: String,
      default: () => String(Math.round(Math.random() * 10000000)),
    },
  },
  setup(props) {
    const wormhole = inject(`wormhole`) as Wormhole
    const slots = useSlots()

    const clear = (target?: string) => {
      const closer = {
        from: props.name,
        to: target || props.to,
      }
      // Assume that $wormhole is available on the component
      wormhole?.close(closer)
    }

    const normalizeSlots = () => {
      // Assume that $slots is available on the component

      // @ts-ignore
      return slots.default()
    }

    const normalizeOwnChildren = (children: VNode[]|CallableFunction) => {
      return typeof children === `function` ? children(props.slotProps) : children
    }

    const sendUpdate = () => {
      const slotContent = normalizeSlots()
      if (slotContent) {
        const transport = {
          from: props.name,
          to: props.to,
          passengers: slotContent,
          order: props.order,
        }
        // Assume that $wormhole is available on the component
        wormhole?.open(transport)
      } else {
        clear()
      }
    }

    onMounted(() => {
      if (!props.disabled) {
        sendUpdate()
      }
    })

    onUpdated(() => {
      if (!props.disabled) {
        sendUpdate()
      }
    })

    onBeforeUnmount(() => {
      clear()
    })

    watch(() => props.to, (newValue, oldValue) => {
      if (oldValue && oldValue !== newValue) {
        clear(oldValue)
      }
      sendUpdate()
    })

    return () => {
      // @ts-ignore
      const children = slots.default() || []
      const Tag: string = props.tag as string
      if (children && props.disabled) {
        return children.length <= 1
          ? normalizeOwnChildren(children)[0]
          : h(Tag, null, normalizeOwnChildren(children))
      } else {
        return h(Tag, {
          class: { 'v-portal': true },
          style: { display: `none` },
          key: `v-portal-placeholder`,
        })
      }
    }
  },
})