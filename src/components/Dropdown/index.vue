<template>
  <div class="dropdown" ref="dropdownRef">
    <button @click="handleOpen">{{ title }}</button>
    <ul v-show="isOpen" class="dropdown-menu">
      <dropdown-item
        v-for="(item, index) in data"
        :key="index"
        :data="item"
      ></dropdown-item>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watch } from 'vue'
import DropdownItem from '@/components/Dropdown/Item.vue'
import { DropdownData } from '@/components/Dropdown/type'
import useClickOutside from '@/hooks/useClickOutside'

export default defineComponent({
  name: 'Dropdown',
  components: {
    DropdownItem
  },
  props: {
    title: {
      type: String,
      required: true
    },
    data: {
      type: Array as PropType<DropdownData[]>,
      default: () => []
    }
  },
  setup() {
    const isOpen = ref(false)
    const dropdownRef = ref<HTMLElement | null>(null)
    const handleOpen = () => {
      isOpen.value = !isOpen.value
    }
    const { isClickOutside } = useClickOutside(dropdownRef)
    watch(isClickOutside, () => {
      if (isOpen.value && isClickOutside.value) {
        isOpen.value = false
      }
    })

    return {
      isOpen,
      dropdownRef,
      handleOpen
    }
  }
})
</script>

<style lang="scss" scoped>
.dropdown {
  position: relative;
  &-menu {
    position: absolute;
    top: 40px;
  }
}
</style>
