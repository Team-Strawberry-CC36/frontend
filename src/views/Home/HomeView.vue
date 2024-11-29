<script setup lang="ts">
import PlaceComponent from './HomeComponents/PlaceComponent.vue';
import SearchbarComponent from './HomeComponents/SearchbarComponent.vue';
import { ref } from 'vue';
import type IPlace from '@/utils/interfaces/Place';
import HomeMap from '../testing-components/features/HomeMap.vue';

const placeData = ref<IPlace[]>([]);
const displayedPlace = ref<IPlace | null>(null);

const searchQuery = ref('');

// Handlers
const handleSearchResults = (event: { event: string, data: IPlace[] }) => {
  placeData.value = event.data;
}

const handleMarkerClicked = (event: { event: string, place: IPlace }) => {
  displayedPlace.value = event.place;
}

import AddEtiquetteVote from './HomeComponents/AddEtiquetteVote.vue';

const viewEtiquetteVote = ref(false);

const toggleView = () => {
  viewEtiquetteVote.value = !viewEtiquetteVote.value;
};

</script>

<template>
  <main class="flex flex-col">
    <div class="">
      <SearchbarComponent @search="handleSearchResults"/>
    </div>
    <div class="flex flex-col lg:flex-row p-4 w-full lg:w-screen bg-mist">
      <HomeMap style="height: 600px;" :data="placeData" :search-query="searchQuery" @map-marker-clicked="handleMarkerClicked"/>
      <div v-if="displayedPlace"> <!-- v-if="displayedPlace" put back in div after testing -->
        <h1>Rendering data! {{ displayedPlace }}</h1>
        <PlaceComponent 
          :data="displayedPlace"
          v-if="!viewEtiquetteVote"
          @show-add-vote="toggleView"
        />
        <AddEtiquetteVote v-if="viewEtiquetteVote" @close-add-vote="toggleView" />
      </div>
    </div>
  </main>
</template>

