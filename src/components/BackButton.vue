<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goBack = () => (window.history.length > 1 ? router.back() : router.push('/'))
</script>

<template>
  <button class="detail-icon-button" type="button" aria-label="Close recipe" @click="goBack">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  </button>
</template>
