<script setup lang="ts">
import PlaceComponent from './HomeComponents/PlaceComponent.vue';
import SearchbarComponent from './HomeComponents/SearchbarComponent.vue';
import { ref } from 'vue';
import type IPlace from '@/utils/interfaces/Place';
import HomeMap from '../testing-components/features/HomeMap.vue';

const placeData = ref<IPlace[]>([]);
const clickedItem = ref<IPlace | null>(null);

// Handlers
const handleSearchResults = (event: { event: string, data: IPlace[] }) => {
  placeData.value = event.data;
}

const handleMarkerClicked = (event: { event: string, data: IPlace }) => {
  clickedItem.value = event.data;
}

</script>

<template>
  <main class="flex flex-col">
    <div class="">
      <SearchbarComponent @search="handleSearchResults"/>
    </div>
    <div class="flex flex-col lg:flex-row p-4 w-full lg:w-screen bg-mist">
      <HomeMap :data="placeData" @map-marker-clicked="handleMarkerClicked"/>
      <div v-if="clickedItem">
        <PlaceComponent :data="clickedItem"/>
      </div>
    </div>
  </main>
</template>
