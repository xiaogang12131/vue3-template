<template>
  <ScrollComponent :on-reach-top="handleReachTop">
    <Card
      dis-hover
      v-for="(item, index) in list"
      :key="index"
      style="margin: 32px 0"
    >
      Content {{ item }}
    </Card>
  </ScrollComponent>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ScrollComponent from 'view-ui-plus/src/components/scroll'

const list = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

const handleReachTop = () => {
  console.log('滚动')

  return new Promise(resolve => {
    setTimeout(() => {
      const first = list.value[0]
      for (let i = 1; i < 11; i++) {
        list.value.unshift(first - i)
      }
      resolve('')
    }, 500)
  })
}
</script>

<style lang="less" scoped></style>
