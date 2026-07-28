<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goBack = () => {
  const previousRoute = window.history.state?.back
  if (previousRoute) {
    router.back()
    return
  }

  router.push({ name: 'home' })
}
</script>

<template>
  <button class="detail-icon-button" type="button" aria-label="Close recipe" @click="goBack">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  </button>
</template>
