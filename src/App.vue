<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavigationBarComponent from './views/General/NavigationBarComponent.vue';
import LoadScreenComponent from './views/General/LoadScreenComponent.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <NavigationBarComponent class="z-50" />

    <main class="relative flex flex-grow bg-mist">
      <LoadScreenComponent />
      <RouterView class="w-full" />
    </main>
  </div>
</template>
