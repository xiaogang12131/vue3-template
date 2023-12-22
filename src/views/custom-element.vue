<template>
  <div class="custom">
    <button class="btn">ceshi</button>
    <my-vue-element
      msg="This is a button"
      selected
      index="1000"
      @message="showMessage"
    />
  </div>
</template>

<script lang="ts">
sessionStorage.setItem('name', '<NAME>')
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CustomElement',
  setup() {
    const showMessage = (data: string) => {
      console.log(data)
    }

    return {
      showMessage
    }
  }
})
</script>

<style lang="scss">
.custom {
  text-align: center;
}
.btn {
  background: red;
}
</style>
