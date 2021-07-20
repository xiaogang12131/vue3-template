<template>
  <li class="dropdown-item">
    <slot> value值：{{ data.value }} key值：{{ data.key }} </slot>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { DropdownData } from '@/components/Dropdown/type'

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<DropdownData>,
      default: () => ({})
    }
  }
})
</script>
