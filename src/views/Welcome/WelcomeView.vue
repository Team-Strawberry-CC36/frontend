<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <main class="flex flex-col items-center justify-center w-full bg-mist">
    <div class="w-1/2 text-center">
      <h1 class="text-5xl">Welcome to Japuri</h1>
      <h2 class="mt-5">Cultural appreciation begins with understanding</h2>
    </div>
    <div class="mx-auto mt-10">
      <!-- <button class="bg-blueGreen p-3 rounded-xl mx- hover:animate-pulse">Login</button> -->
      <RouterLink
        class="bg-charcoal text-frostWhite p-3 rounded-xl mx-5 hover:animate-pulse"
        to="/login"
      >
        Login
      </RouterLink>
      <RouterLink
        class="bg-charcoal text-frostWhite p-3 rounded-xl mx-5 hover:animate-pulse"
        to="/signup"
      >
        Sign Up
      </RouterLink>
    </div>
  </main>
</template>
