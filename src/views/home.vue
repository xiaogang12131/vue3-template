<template>
  <div class="home">
    <svg-icon icon="star" @click="handleClick" />
    <el-divider />
    <el-button type="primary" @click="handleMessage">打开消息提示</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'store'
import Message from '@/components/Message'

export default defineComponent({
  name: 'Home',
  setup() {
    const store = useStore()

    let num = 1

    const handleClick = () => {
      store.commit('user/SET_TOKEN', num++)
    }

    const handleMessage = () => {
      Message('提示信息')
    }

    return {
      handleClick,
      handleMessage
    }
  }
})
</script>

<style lang="scss" scoped>
.home {
  text-align: center;
}
</style>
