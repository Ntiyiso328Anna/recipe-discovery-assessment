<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import './app-header.css'

const now = ref(new Date())
let clock

const timePeriod = computed(() => {
  const hour = now.value.getHours()
  if (hour < 12) return 'morning'
  if (hour < 18) return 'afternoon'
  return 'evening'
})
const greeting = computed(
  () =>
    ({
      morning: 'Good Morning',
      afternoon: 'Good Afternoon',
      evening: 'Good Evening'
    })[timePeriod.value]
)

onMounted(() => {
  clock = window.setInterval(() => {
    now.value = new Date()
  }, 60_000)
})

onUnmounted(() => window.clearInterval(clock))
</script>

<template>
  <header class="app-header">
    <div>
      <p class="app-header__greeting">
        <svg v-if="timePeriod === 'morning'" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 18h18M5 14h14M8 14a4 4 0 0 1 8 0M12 3v3M4.9 7.1 7 9.2M19.1 7.1 17 9.2" />
        </svg>
        <svg v-else-if="timePeriod === 'afternoon'" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="3.5" />
          <path
            d="M12 2v2.2M12 19.8V22M2 12h2.2M19.8 12H22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M19.1 4.9l-1.6 1.6M6.5 17.5l-1.6 1.6"
          />
        </svg>
        <svg v-else viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19.5 15.2A8 8 0 0 1 8.8 4.5a8 8 0 1 0 10.7 10.7Z" />
          <path d="m17.5 4 .5 1.5 1.5.5-1.5.5-.5 1.5-.5-1.5-1.5-.5 1.5-.5.5-1.5Z" />
        </svg>
        {{ greeting }}
      </p>
      <h1>Alena Sabyan</h1>
    </div>
    <button class="app-header__action" type="button" aria-label="Open shopping basket">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 4h2l2.4 11h10.8L20 7H6.2" />
        <circle cx="9" cy="20" r="1" />
        <circle cx="17" cy="20" r="1" />
      </svg>
    </button>
  </header>
</template>
