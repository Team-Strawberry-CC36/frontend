<script setup lang="ts">
import { usePlaceStore } from '@/stores/PlaceStore';
import { Carousel, Slide, Navigation, Pagination } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

const placeStore = usePlaceStore();

</script>

<template>
  <div>
    <div v-if="placeStore.details.photos?.length" class="m-auto overflow-hidden w-full">
      <Carousel
        :wrapAround="true"
        :itemsToShow="1"
        :autoplay="10000"
        :pauseAutoplayOnHover="true"
      >
        <Slide v-for="(url, key) in placeStore.details.photos" :key="key">
          <img :src="url" alt="Place Photo" class="w-full h-[20vh] object-cover" />
        </Slide>
        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>
    </div>
    <div v-else>
      <p>No photos available</p>
    </div>
  </div>
</template>
