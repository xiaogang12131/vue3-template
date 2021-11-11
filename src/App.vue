<template>
  <div class="wrapper">
    <div class="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/spread-sheet">SpreedSheet</router-link> |
      <router-link to="/virtual-data">VirtualData</router-link>
    </div>
    <div class="container">
      <router-view />
    </div>
  </div>
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
      await getTableData()
    }

    // watch | watchEffect
    watch(token, (token, prevToken) => {
      console.log(token, prevToken)
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

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  .nav {
    line-height: 40px;
  }
  .container {
    height: calc(100% - 40px);
    padding: 20px;
  }
}
</style>
