<template>
  <transition
    name="message-fade"
    @before-leave="$emit('close')"
    @after-leave="$emit('destroy')"
  >
    <div
      :id="id"
      :class="[
        'message',
        center ? 'is-center' : '',
        type ? `el-message--${type}` : ''
      ]"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
      :style="customStyle"
    >
      <p v-html="message"></p>
    </div>
  </transition>
</template>
<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'

export default defineComponent({
  name: 'Message',
  props: {
    id: {
      type: String,
      default: ''
    },
    center: {
      type: Boolean,
      default: false
    },
    offset: {
      type: Number,
      defalut: 20
    },
    duration: {
      type: Number,
      default: 2000
    },
    message: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'info'
    }
  },
  emits: ['close', 'destroy'],
  setup(props) {
    const visible = ref(false)
    let timer: any = null

    const customStyle = computed(() => {
      return {
        top: `${props.offset}px`
      }
    })

    const startTimer = () => {
      if (props.duration > 0) {
        timer = setTimeout(() => {
          if (visible.value) {
            close()
          }
        }, props.duration)
      }
    }
    const clearTimer = () => {
      clearTimeout(timer)
      timer = null
    }
    const close = () => {
      visible.value = false
    }

    onMounted(() => {
      startTimer()
      visible.value = true
    })

    return {
      visible,
      customStyle,
      startTimer,
      clearTimer
    }
  }
})
</script>

<style lang="scss" scoped>
.message {
  position: fixed;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  min-width: 300px;
  box-sizing: border-box;
  border-radius: 2px;
  background-color: #ffffff;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  transition: opacity 0.2s, transform 0.2s, top 0.2s;
  overflow: hidden;
  padding: 12px 15px;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333333;
}
.message-fade-enter-from,
.message-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -100%);
}
</style>
