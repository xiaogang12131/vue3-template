<template>
  <div class="home">
    <h1>This is an home page</h1>
    <svg-icon icon="star" @click="handleClick" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'store'

export default defineComponent({
  name: 'Home',
  setup() {
    const store = useStore()

    let num = 1

    const handleClick = () => {
      store.commit('user/SET_TOKEN', num++)
    }
    return {
      handleClick
    }
  }
})
</script>
