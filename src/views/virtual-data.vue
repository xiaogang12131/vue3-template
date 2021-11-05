<template>
  <div class="virtual">
    <virtual-list :list-data="listData" :item-size="20"></virtual-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import VirtualList from '@/components/VirtualList.vue'

export default defineComponent({
  name: 'VirtualData',
  components: {
    VirtualList
  },
  setup() {
    const listData = ref<any>([])

    onMounted(() => {
      for (let i = 0; i < 10000; i++) {
        const num = i + 1
        listData.value.push({ name: '我是第' + num + '个' })
      }
    })

    return {
      listData
    }
  }
})
</script>

<style lang="scss" scoped>
.virtual {
  height: 200px;
}
</style>
