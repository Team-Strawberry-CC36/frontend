<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavigationBarComponent from './views/General/NavigationBarComponent.vue';
</script>

<template>
  <div class="flex flex-col min-h-screen">
  <NavigationBarComponent />

  <main class="flex flex-grow">
    <RouterView />
  </main>
</div>
</template>
