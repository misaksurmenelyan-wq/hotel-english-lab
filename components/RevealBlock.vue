<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    as?: string
    threshold?: number
  }>(),
  {
    as: 'div',
    threshold: 0.18,
  },
)

const root = ref<HTMLElement | null>(null)
const isVisible = ref(false)

let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!root.value || typeof IntersectionObserver === 'undefined') {
    isVisible.value = true
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries

      if (!entry?.isIntersecting) {
        return
      }

      isVisible.value = true
      observer?.disconnect()
      observer = null
    },
    {
      threshold: props.threshold,
    },
  )

  observer.observe(root.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <component :is="as" ref="root" class="reveal-block" :class="{ 'is-visible': isVisible }">
    <slot />
  </component>
</template>
