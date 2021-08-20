<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, computed, watch, watchEffect, onMounted } from 'vue'
import { useStore } from 'store'
import { getTableData } from 'api/table'

export default defineComponent({
  setup() {
    const store = useStore()
    const token = computed(() => store.state.user.token)

    const laodTableData = async () => {
      const res = await getTableData()
      console.log(res)
    }

    watch(token, token => {
      console.log(token)
    })

    watchEffect(() => {
      console.log(token.value)
    })

    onMounted(() => {
      laodTableData()
    })
  }
})
</script>
