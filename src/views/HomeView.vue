<script setup lang="ts">
import { ref } from 'vue'
import PlaceComponent from '@/components/Home/PlaceComponent.vue';

const apiURL = import.meta.env.BACKEND_URL;

const placeDetails = ref({});

const handleMapClick = async () => {
  const response = await fetch(`${apiURL}/description`);
  const details = response.json();
  placeDetails.value = details;
}
</script>

<template>
  <main class="flex flex-col items-center h-screen w-full bg-roseQuartz">
    <PlaceComponent
      :placeDetails="placeDetails"
    />
  </main>
</template>
