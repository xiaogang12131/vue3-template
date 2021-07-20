import { ref, onMounted, onUnmounted, Ref } from 'vue'

const useClickOutside = (elementRef: Ref<HTMLElement | null>) => {
  const isClickOutside = ref(false)
  const handleBody = (e: MouseEvent) => {
    if (elementRef.value) {
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false
      } else {
        isClickOutside.value = true
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handleBody)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handleBody)
  })
  return {
    isClickOutside
  }
}

export default useClickOutside
