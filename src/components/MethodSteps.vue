<script setup>
defineProps({ steps: { type: Array, default: () => [] } })
</script>

<template>
  <section class="detail-content-section" aria-labelledby="method-heading">
    <div class="detail-content-section__heading"><h2 id="method-heading">Instructions</h2><span>{{ steps.length }} steps</span></div>
    <ol class="method-steps"><li v-for="step in steps" :key="step">{{ step }}</li></ol>
  </section>
</template>
