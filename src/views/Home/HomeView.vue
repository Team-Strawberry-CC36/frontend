<script setup lang="ts">
//import { ref } from 'vue'
import PlaceComponent from './HomeComponents/PlaceComponent.vue';
import { usePlaceStore } from '@/stores/selectedPlace';

//const apiURL = import.meta.env.BACKEND_URL;

// const placeDetails = ref<Place>({
//   id: 0,
//   name: '',
//   address: '',
//   generalInfo: '',
//   placeType: 'onsen',
//   location: {
//     latitude: 0,
//     longitude: 0,
//   },
//   etiquettes: [],
//   experiences: [],
//   photos: [],
//   metadata: {
//     createdAt: new Date,
//     updatedAt: new Date,
//   }
// });

const place = usePlaceStore();

//Below function was intended to fetch information from data cache
// const handleMapClick = async () => {
//   const response = await fetch(`${apiURL}/description`);
//   const details = response.json();
//   placeDetails.value = details;
// }
</script>

<template>
  <main class="flex flex-col items-center h-screen w-full bg-roseQuartz">
    <PlaceComponent
      :placeDetails="place"
    />
  </main>
</template>
