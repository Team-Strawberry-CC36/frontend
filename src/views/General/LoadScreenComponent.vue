<script setup lang="ts">
import { useLoadingStore } from '@/stores/LoadingStore';

const load = useLoadingStore();
</script>

<template>
  <!-- Loading Overlay -->
  <div
    v-if="load.loading"
    class="absolute w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="flex flex-col items-center">
      <!-- Spinner -->
      <div
        class="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"
      ></div>
      <p class="mt-4 text-white">Loading, please wait...</p>
    </div>
  </div>
</template>
