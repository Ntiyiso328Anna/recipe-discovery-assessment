<script setup>
defineProps({ message: { type: String, required: true } })
defineEmits(['retry'])
</script>

<template>
  <section class="state-message" role="alert" aria-labelledby="error-state-title">
    <h2 id="error-state-title">Something went wrong</h2>
    <p>{{ message }}</p>
    <button type="button" @click="$emit('retry')">Try again</button>
  </section>
</template>
