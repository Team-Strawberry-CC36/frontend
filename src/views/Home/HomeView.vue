<script setup lang="ts">
//import { ref } from 'vue'
import PlaceComponent from './HomeComponents/PlaceComponent.vue';
import MapComponent from './HomeComponents/MapComponent.vue';

//const apiURL = import.meta.env.BACKEND_URL;

// const place = usePlaceStore();

//Below function was intended to fetch information from data cache
// const handleMapClick = async () => {
//   const response = await fetch(`${apiURL}/description`);
//   const details = response.json();
//   placeDetails.value = details;
// }
</script>

<template>
  <main class="flex flex-col lg:flex-row p-4 w-full lg:w-screen bg-mist ">
    <MapComponent />
    <PlaceComponent />
  </main>
</template>
