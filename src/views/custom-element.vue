<template>
  <div class="custom">
    <my-vue-element
      msg="This is a button"
      selected
      index="1000"
      @message="showMessage"
    />
  </div>
</template>

<script lang="ts">
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

<style lang="scss" scoped>
.custom {
  text-align: center;
}
</style>
