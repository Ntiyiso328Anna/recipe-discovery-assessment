<script setup>
import RecipeMeta from './RecipeMeta.vue'

defineProps({
  recipe: { type: Object, required: true },
  compact: Boolean,
  showFavorite: Boolean
})

const imageScore = (image) => {
  const url = image.url?.toLowerCase() || ''
  const dimensions = Number(image.width || 0) * Number(image.height || 0)
  const sizeHint = url.includes('large') ? 1_000_000_000 : url.includes('small') ? -1_000_000 : 0
  const formatHint = image.mime === 'image/webp' ? 10_000 : 0
  return dimensions + sizeHint + formatHint
}

const originalCover = (recipe) =>
  [...(recipe.images || [])].sort((a, b) => imageScore(b) - imageScore(a))[0]?.url

const cover = (recipe) => {
  const url = originalCover(recipe)
  if (!url) return ''
  return url.replace(/-small(?=\.)/i, '-large').replace(/\/small\//i, '/large/')
}

const useFallbackImage = (event, recipe) => {
  if (event.currentTarget.dataset.fallbackApplied) return
  event.currentTarget.dataset.fallbackApplied = 'true'
  event.currentTarget.src = originalCover(recipe)
}
</script>

<template>
  <RouterLink
    :to="{ name: 'recipe', params: { id: String(recipe.id) } }"
    class="recipe-card"
    :class="{ compact }"
  >
    <div class="recipe-card__image">
      <img
        :src="cover(recipe)"
        :alt="recipe.title"
        loading="eager"
        decoding="async"
        @error="useFallbackImage($event, recipe)"
      />
      <span v-if="showFavorite" class="recipe-card__favorite" aria-hidden="true">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M20.8 4.7a5.5 5.5 0 0 0-7.8 0L12 5.8l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.5a5.5 5.5 0 0 0 0-7.8Z"
          />
        </svg>
      </span>
    </div>
    <div class="card-copy">
      <strong>{{ recipe.title }}</strong
      ><RecipeMeta :meta="recipe.meta" />
    </div>
  </RouterLink>
</template>
