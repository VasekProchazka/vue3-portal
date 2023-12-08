import { Transport } from "@/model/Transport"

export const inBrowser = typeof window !== `undefined`

export function freeze(item: Record<string, unknown>) {
  if (Array.isArray(item) || typeof item === `object`) {
    return Object.freeze(item)
  }
  return item
}

export function combinePassengers(transports: Transport[], slotProps = {}) {
  return transports.reduce((passengers, transport) => {
    const temp = transport.passengers[0]
    const newPassengers = typeof temp === `function` ? temp(slotProps) : transport.passengers
    return passengers.concat(newPassengers)
  }, [])
}

export function stableSort(array: unknown[], compareFn: CallableFunction) {
  return array
    .map((v, idx) => {
      return [idx, v]
    })
    .sort(function (a, b) {
      // @ts-ignore
      return compareFn(a[1], b[1]) || a[0] - b[0]
    })
    .map((c) => c[1])
}

export function pick(obj: Record<string, unknown>, keys: string[]) {
  return keys.reduce((acc, key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // @ts-ignore
      acc[key] = obj[key]
    }
    return acc
  }, {})
}
