<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goBack = () => window.history.length > 1 ? router.back() : router.push('/')
</script>

<template>
  <button class="detail-icon-button" type="button" aria-label="Back to recipes" @click="goBack">←</button>
</template>
