<template>
  <div id="editor"></div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import Quill from 'quill'

onMounted(() => {
  const quill = new Quill('#editor')
})
</script>

<style lang="less">
.ql-container {
  height: 500px;
}
</style>
