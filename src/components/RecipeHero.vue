<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import BackButton from './BackButton.vue'

defineProps({ recipe: { type: Object, required: true } })

const scrollProgress = ref(0)
const heroStyle = computed(() => ({
  '--hero-overlay-opacity': String(scrollProgress.value * 0.94),
  '--hero-image-opacity': String(1 - scrollProgress.value * 0.35)
}))

const updateScrollProgress = () => {
  scrollProgress.value = Math.min(Math.max(window.scrollY / 230, 0), 1)
}

onMounted(() => {
  updateScrollProgress()
  window.addEventListener('scroll', updateScrollProgress, { passive: true })
})

onUnmounted(() => window.removeEventListener('scroll', updateScrollProgress))

const imageScore = (image) => {
  const url = image.url?.toLowerCase() || ''
  const dimensions = Number(image.width || 0) * Number(image.height || 0)
  const sizeHint = url.includes('large') ? 1_000_000_000 : url.includes('small') ? -1_000_000 : 0
  const formatHint = image.mime === 'image/webp' ? 10_000 : 0
  return dimensions + sizeHint + formatHint
}

const originalImageUrl = (recipe) =>
  [...(recipe.images || [])].sort((a, b) => imageScore(b) - imageScore(a))[0]?.url

const imageUrl = (recipe) => {
  const url = originalImageUrl(recipe)
  if (!url) return ''
  return url.replace(/-small(?=\.)/i, '-large').replace(/\/small\//i, '/large/')
}

const useFallbackImage = (event, recipe) => {
  if (event.currentTarget.dataset.fallbackApplied) return
  event.currentTarget.dataset.fallbackApplied = 'true'
  event.currentTarget.src = originalImageUrl(recipe)
}
</script>

<template>
  <section class="recipe-hero" :style="heroStyle" :aria-label="recipe.title">
    <img
      :src="imageUrl(recipe)"
      :alt="recipe.title"
      decoding="async"
      @error="useFallbackImage($event, recipe)"
    />
    <BackButton />
    <button
      class="detail-icon-button detail-icon-button--save"
      type="button"
      aria-label="Save recipe"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M20.8 4.7a5.5 5.5 0 0 0-7.8 0L12 5.8l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.5a5.5 5.5 0 0 0 0-7.8Z"
        />
      </svg>
    </button>
  </section>
</template>
