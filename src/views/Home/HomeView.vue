<script setup lang="ts">
import PlaceComponent from './HomeComponents/PlaceComponent.vue';
import MapComponent from './HomeComponents/MapComponent.vue';
import SearchbarComponent from './HomeComponents/SearchbarComponent.vue';
import AddEtiquetteVote from './HomeComponents/AddEtiquetteVote.vue';
import { ref } from 'vue';

const viewEtiquetteVote = ref(false);

const toggleView = () => {
  viewEtiquetteVote.value = !viewEtiquetteVote.value;
};

</script>

<template>
  <main class="flex flex-col">
    <div class="">
      <SearchbarComponent />
    </div>
    <div class="flex flex-col lg:flex-row p-4 w-full lg:w-screen bg-mist">
      <MapComponent />
      <PlaceComponent v-if="!viewEtiquetteVote" @show-add-vote="toggleView" />
      <AddEtiquetteVote v-if="viewEtiquetteVote" @close-add-vote="toggleView" />
    </div>
  </main>
</template>
