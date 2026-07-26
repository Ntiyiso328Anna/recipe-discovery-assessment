<script setup>
defineProps({
  steps: { type: Array, default: () => [] },
  duration: { type: String, default: '' }
})
</script>

<template>
  <section class="detail-content-section" aria-labelledby="method-heading">
    <div class="detail-content-section__heading">
      <h2 id="method-heading">Instructions</h2>
      <span>{{ duration }}</span>
    </div>
    <div class="method-steps">
      <p v-for="step in steps" :key="step">{{ step }}</p>
    </div>
  </section>
</template>
