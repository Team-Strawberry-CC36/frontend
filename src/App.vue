<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="h-16">
    <div class="h-full w-full flex items-center bg-tiffanyBlue">
      <h1 class="basis-1/4 text-3xl">Japuri!</h1>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <main>
    <RouterView />
  </main>
</template>
