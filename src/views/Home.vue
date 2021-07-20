<template>
  <div class="home">
    <h1>This is an home page</h1>
    <dropdown title="下拉菜单" :data="options"></dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Dropdown from '@/components/Dropdown/index.vue'
import { DropdownData } from '@/components/Dropdown/type'

const options: DropdownData[] = [
  {
    key: 1,
    value: '选项一'
  },
  {
    key: 2,
    value: '选项二'
  }
]

export default defineComponent({
  name: 'Home',
  components: {
    Dropdown
  },
  setup() {
    return {
      options
    }
  }
})
</script>
