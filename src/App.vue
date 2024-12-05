<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavigationBarComponent from './views/General/NavigationBarComponent.vue';
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <NavigationBarComponent class="z-50" />

    <main class="flex flex-grow bg-mist">
      <RouterView class="w-full" />
    </main>
  </div>
</template>
