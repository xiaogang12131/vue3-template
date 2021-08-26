import { createVNode, render } from 'vue'
import type { VNode } from 'vue'
import type { MessageFn, MessageOptions } from './types'
import MessageConstructor from './index.vue'

let index = 1
const instances: VNode[] = []

const Message: MessageFn = function (options?: MessageOptions) {
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }

  let verticalOffset = options?.offset || 20
  instances.forEach(vm => {
    verticalOffset += (vm.el?.offsetHeight || 0) + 16
  })
  verticalOffset += 16

  const id = `message_${index++}`
  const elNode = document.createElement('div')
  const data = {
    ...options,
    id,
    offset: verticalOffset,
    onClose() {
      close(id)
    },
    onDestroy() {
      render(null, elNode)
    }
  }
  const vm = createVNode(MessageConstructor, data)
  render(vm, elNode)
  instances.push(vm)
  document.body.appendChild(elNode.firstElementChild as HTMLDivElement)
} as any

function close(id: string): void {
  const idx = instances.findIndex(vm => {
    if (vm.component) {
      const { id: _id } = vm.component.props
      return id === _id
    }
  })
  if (idx === -1) return

  const vm = instances[idx]

  const removedHeight = vm.el?.offsetHeight
  instances.splice(idx, 1)

  const len = instances.length
  if (len < 1) return
  for (let i = idx; i < len; i++) {
    const instance = instances[i]
    const pos = parseInt(instance.el?.style['top'], 10) - removedHeight - 16
    if (instance.component) {
      instance.component.props.offset = pos
    }
  }
}

;(['error'] as const).forEach(type => {
  Message[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options,
        type
      }
    }
    if (typeof options === 'object') {
      options.type = type
    }
    return Message(options)
  }
})

export default Message
