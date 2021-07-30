<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { getTableData } from '@/api/table'

export default defineComponent({
  setup() {
    const laodTableData = async () => {
      const res = await getTableData()
      console.log(res)
    }
    onMounted(() => {
      laodTableData()
    })
  }
})
</script>
