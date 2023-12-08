import { defineComponent as h, inject as m, useSlots as y, onMounted as w, onUpdated as T, onBeforeUnmount as b, watch as P, h as u, ref as p, nextTick as v, reactive as S } from "vue";
let x = 1;
const j = h({
  name: "Portal",
  props: {
    disabled: {
      type: Boolean
    },
    name: {
      type: String,
      default: () => String(x++)
    },
    order: {
      type: Number,
      default: 0
    },
    slotProps: {
      type: Object,
      default: () => ({})
    },
    tag: {
      type: String,
      default: "DIV"
    },
    to: {
      type: String,
      default: () => String(Math.round(Math.random() * 1e7))
    }
  },
  setup(t) {
    const e = m("wormhole"), n = y(), s = (r) => {
      const o = {
        from: t.name,
        to: r || t.to
      };
      e == null || e.close(o);
    }, i = () => n.default(), a = (r) => typeof r == "function" ? r(t.slotProps) : r, c = () => {
      const r = i();
      if (r) {
        const o = {
          from: t.name,
          to: t.to,
          passengers: r,
          order: t.order
        };
        e == null || e.open(o);
      } else
        s();
    };
    return w(() => {
      t.disabled || c();
    }), T(() => {
      t.disabled || c();
    }), b(() => {
      s();
    }), P(() => t.to, (r, o) => {
      o && o !== r && s(o), c();
    }), () => {
      const r = n.default() || [], o = t.tag;
      return r && t.disabled ? r.length <= 1 ? a(r)[0] : u(o, null, a(r)) : u(o, {
        class: { "v-portal": !0 },
        style: { display: "none" },
        key: "v-portal-placeholder"
      });
    };
  }
}), g = typeof window < "u";
function I(t) {
  return Array.isArray(t) || typeof t == "object" ? Object.freeze(t) : t;
}
function O(t, e = {}) {
  return t.reduce((n, s) => {
    const i = s.passengers[0], a = typeof i == "function" ? i(e) : s.passengers;
    return n.concat(a);
  }, []);
}
function k(t, e) {
  return t.map((n, s) => [s, n]).sort(function(n, s) {
    return e(n[1], s[1]) || n[0] - s[0];
  }).map((n) => n[1]);
}
const B = h({
  name: "PortalTarget",
  props: {
    multiple: {
      type: Boolean,
      default: !1
    },
    name: {
      type: String,
      required: !0
    },
    slim: {
      type: Boolean,
      default: !1
    },
    slotProps: {
      type: Object,
      default: () => ({})
    },
    tag: {
      type: String,
      default: "div"
    },
    transition: {
      type: [String, Object, Function]
    }
  },
  setup(t, { emit: e }) {
    const n = m("wormhole"), s = y(), i = p(n.transports), a = p(!0), c = () => {
      var d;
      const l = (d = i.value) == null ? void 0 : d[t.name];
      return t.multiple ? l : l.length === 0 ? [] : [l[l.length - 1]];
    }, r = () => O(c(), t.slotProps), o = () => r().length ? r() : s.default || [], f = () => {
      const l = t.slim && !t.transition;
      return l && o().length > 1 && console.warn("[portal-vue]: PortalTarget with `slim` option received more than one child element."), l;
    };
    return w(() => {
      t.transition && v(() => {
        a.value = !1;
      });
    }), P(c, () => {
      e("change", o().length > 0);
    }), {
      transports: i,
      firstRender: a,
      ownTransports: c,
      passengers: r,
      children: o,
      noWrapper: f
    };
  },
  render() {
    const t = this.noWrapper(), e = this.children(), n = this.transition || this.tag;
    return t ? e[0] : this.slim && !n ? u() : u(
      n,
      {
        props: {
          tag: this.transition && this.tag ? this.tag : void 0
        },
        class: { "vue-portal-target": !0 }
      },
      e
    );
  }
}), z = {
  transports: {},
  trackInstances: g,
  open(t) {
    if (!g)
      return;
    const { to: e, from: n, passengers: s, order: i = 1 / 0 } = t;
    if (!e || !n || !s)
      return;
    const a = {
      to: e,
      from: n,
      passengers: I(s),
      order: i
    };
    Object.keys(this.transports).indexOf(e) === -1 && (this.transports[e] = []);
    const r = this.getTransportIndex(a), o = this.transports[e].slice(0);
    r === -1 ? o.push(a) : o[r] = a, this.transports[e] = k(o, (f, l) => f.order - l.order);
  },
  close(t, e = !1) {
    const { to: n, from: s } = t;
    if (!(!n || !s && e === !1) && this.transports[n])
      if (e)
        this.transports[n] = [];
      else {
        const i = this.getTransportIndex(t);
        if (i >= 0) {
          const a = this.transports[n].slice(0);
          a.splice(i, 1), this.transports[n] = a;
        }
      }
  },
  getTransportIndex(t) {
    const { to: e, from: n } = t;
    for (const s in this.transports[e])
      if (this.transports[e][s].from === n)
        return +s;
    return -1;
  }
}, W = {
  ...z,
  install: (t, e = {}) => {
    t.component(e.portalName || "Portal", j), t.component(e.portalTargetName || "PortalTarget", B), t.config.globalProperties.$wormhole = S(W), t.provide("wormhole", t.config.globalProperties.$wormhole);
  }
};
export {
  j as Portal,
  B as PortalTarget,
  W as default
};
