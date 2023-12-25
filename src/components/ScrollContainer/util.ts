import type { BarMap, BarMapItem } from './types'

export const BAR_MAP: BarMap = {
  vertical: {
    offset: 'offsetHeight',
    scroll: 'scrollTop',
    scrollSize: 'scrollHeight',
    size: 'height',
    key: 'vertical',
    axis: 'Y',
    client: 'clientY',
    direction: 'top'
  },
  horizontal: {
    offset: 'offsetWidth',
    scroll: 'scrollLeft',
    scrollSize: 'scrollWidth',
    size: 'width',
    key: 'horizontal',
    axis: 'X',
    client: 'clientX',
    direction: 'left'
  }
}

export function renderThumbStyle({
  move,
  size,
  bar
}: {
  move: number | undefined
  size: string | undefined
  bar: BarMapItem
}) {
  const style = {} as any
  const translate = `translate${bar.axis}(${move}%)`

  style[bar.size] = size
  style.transform = translate
  style.msTransform = translate
  style.webkitTransform = translate

  return style
}

// eslint-disable-next-line @typescript-eslint/ban-types
function extend<T extends object, K extends object>(to: T, _from: K): T & K {
  return Object.assign(to, _from)
}

/**
 * [
 *  { name: 'zhangsan', age: 18 },
 *  { sex: 'male', age: 20 }
 * ]
 * =>
 * { name: 'zhangsan', sex: 'male', age: 20 }
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function toObject<T extends object[]>(arr: T) {
  const res = {}
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i])
    }
  }
  return res
}
