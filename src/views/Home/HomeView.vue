<script setup lang="ts">
import PlaceComponent from './HomeComponents/PlaceComponent.vue';
import MapComponent from './HomeComponents/MapComponent.vue';
import SearchbarComponent from './HomeComponents/SearchbarComponent.vue';

</script>

<template>
  <main class="flex flex-col">
    <div class="">
      <SearchbarComponent />
    </div>
    <div class="flex flex-col lg:flex-row p-4 w-full lg:w-screen bg-mist ">
      <MapComponent />
      <PlaceComponent />
    </div>

  </main>
</template>
