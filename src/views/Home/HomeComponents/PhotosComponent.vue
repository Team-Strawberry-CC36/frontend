<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { usePlaceStore } from '@/stores/PlaceStore';
import { Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

const placeStore = usePlaceStore();

const loading = ref(false);
const error = ref<string | null>(null);
</script>

<template>
  <div>
    <div v-if="placeStore.details.photos?.length" class="photos-carousel">
      <Carousel
        :loop="true"
        :perPage="1"
        :navigationEnabled="true"
        :paginationEnabled="true"
        class="w-[400px] h-[400px]"
      >
        <Slide v-for="(url, key) in placeStore.details.photos" :key="key">
          <img :src="url" alt="Place Photo" class="w-full h-full object-cover" />
        </Slide>
      </Carousel>
    </div>
    <div v-else>
      <p>No photos available</p>
    </div>
  </div>
</template>

<style>
.photos-carousel {
  width: 100%;
  max-width: 600px;
  height: 400px;
  margin: auto;
  overflow: hidden;
}

img {
  border-radius: 5px;
  max-height: 100%;
  max-width: 100%;
  object-fit: cover;
}

.carousel img {
  display: block;
  width: 100%;
  height: 150px;
  object-fit: cover;
}
</style>
