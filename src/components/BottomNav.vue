<script setup>
import './bottom-nav.css'
</script>

<template>
  <nav class="bottom-nav" aria-label="Main navigation">
    <RouterLink to="/" class="nav-item active" aria-label="Home" aria-current="page"
      ><svg class="nav-item__home-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="m3 10 9-7 9 7v11h-6v-6H9v6H3V10Z" /></svg
    ></RouterLink>
    <button type="button" class="nav-item" aria-label="Search recipes">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="6" />
        <path d="m16 16 4 4" />
      </svg>
    </button>
    <button class="create-button" type="button" aria-label="Cooking">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M8 15.5a4 4 0 0 1 0-8c.7-2.1 2.1-3.2 4-3.2s3.3 1.1 4 3.2a4 4 0 0 1 0 8M8 15.5h8V20H8v-4.5ZM10 10v3M14 10v3M8 18h8"
        />
      </svg>
    </button>
    <button type="button" class="nav-item" aria-label="Notifications">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18 10a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Zm-8 10h4" />
      </svg>
    </button>
    <button type="button" class="nav-item" aria-label="Profile">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c1.6-4 4.3-6 8-6s6.4 2 8 6" />
      </svg>
    </button>
    <svg class="bottom-nav__indicator" viewBox="0 0 116 4" aria-hidden="true">
      <path d="M2 2h112" />
    </svg>
  </nav>
</template>
