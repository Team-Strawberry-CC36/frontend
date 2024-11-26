<script setup lang="ts">
//import { ref } from 'vue'
import PlaceComponent from './HomeComponents/PlaceComponent.vue';
import { usePlaceStore } from '@/stores/PlaceStore';

//const apiURL = import.meta.env.BACKEND_URL;

const place = usePlaceStore();

//Below function was intended to fetch information from data cache
// const handleMapClick = async () => {
//   const response = await fetch(`${apiURL}/description`);
//   const details = response.json();
//   placeDetails.value = details;
// }
</script>

<template>
  <main class="flex flex-col items-center h-fit w-full bg-mist">
    <PlaceComponent
      :placeDetails="place"
    />
  </main>
</template>
