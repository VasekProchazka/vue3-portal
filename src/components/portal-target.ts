import { h, defineComponent, ref, onMounted, watch, inject, useSlots, nextTick} from "vue"
import { combinePassengers } from "@/utils"
import { Wormhole } from "@/model/Wormhole"

export default defineComponent({
  name: `PortalTarget`,
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
      default: `div`,
    },
    transition: {
      type: [String, Object, Function],
    },
  },
  setup(props, { emit }) {
    const wormhole = inject(`wormhole`) as Wormhole
    const slots = useSlots()

    const transports = ref(wormhole.transports)
    const firstRender = ref(true)

    const ownTransports = () => {
      const transportsValue = transports.value?.[props.name] || []
      if (props.multiple) { return transportsValue }
      return transportsValue.length === 0 ? [] : [transportsValue[transportsValue.length - 1]]
    }

    const passengers = () => {
      return combinePassengers(ownTransports(), props.slotProps)
    }

    const children = () => {
      return passengers().length ? passengers() : slots.default || []
    }

    const noWrapper = () => {
      const noWrapperValue = props.slim && !props.transition
      if (noWrapperValue && children().length > 1) {
        console.warn("[portal-vue]: PortalTarget with `slim` option received more than one child element.")
      }
      return noWrapperValue
    }

    onMounted(() => {
      if (props.transition) {
        nextTick(() => {
          // only when we have a transition, because it causes a re-render
          firstRender.value = false
        })
      }
    })

    watch(ownTransports, () => {
      emit(`change`, children().length > 0)
    })

    return {
      transports,
      firstRender,
      ownTransports,
      passengers,
      children,
      noWrapper,
    }
  },
  render() {
    const noWrapperValue = this.noWrapper()
    const childrenValue = this.children()
    const Tag = this.transition || this.tag

    return noWrapperValue
    //@ts-ignore
      ? childrenValue[0]
      : this.slim && !Tag
      //@ts-ignore
        ? h()
        : h(
          Tag,
          {
            props: {
              tag: this.transition && this.tag ? this.tag : undefined,
            },
            class: { "vue-portal-target": true },
          },
          childrenValue
        )
  },
})
