<script setup>
import './bottom-nav.css'
</script>

<template>
  <nav class="bottom-nav" aria-label="Main navigation">
    <RouterLink to="/" class="nav-item active" aria-label="Home" aria-current="page"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 11 8-7 8 7v9H4v-9Zm5 9v-5h6v5" /></svg></RouterLink>
    <button type="button" class="nav-item" aria-label="Search recipes"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6" /><path d="m16 16 4 4" /></svg></button>
    <button class="create-button" type="button" aria-label="Create recipe"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10h10v7a5 5 0 0 1-10 0v-7Zm2-3h6v3H9V7Zm3 10v.01M5 12H3m18 0h-2" /></svg></button>
    <button type="button" class="nav-item" aria-label="Notifications"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 10a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Zm-8 10h4" /></svg></button>
    <button type="button" class="nav-item" aria-label="Profile"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 21c1.6-4 4.3-6 8-6s6.4 2 8 6" /></svg></button>
  </nav>
</template>
