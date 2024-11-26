<script setup lang="ts">
//import type Place from '@/utils/interfaces/Place';
import { usePlaceStore } from '@/stores/PlaceStore';

const place = usePlaceStore();

//use mock state data
place.useMock();

</script>

<template>
  <div class="sm:w-1/2 sm:h-fit overflow-hidden sm:m-3 sm:rounded-xl shadow-2xl bg-frostWhite">
    <section class="h-80">
      <!-- Cover Photo -->
       <div class="h-full w-full">
        <img class="w-full h-full object-cover"  :src='place.details.photos[0].fileData' alt="place_photo" />
       </div>
    </section>
    <div class="flex flex-col p-5 items-center">
      <section class="text-center w-full pb-5 border-b border-charcoal">
        <!-- Name of the place -->
        <h1 class="text-3xl">{{ place.details.name }}</h1>
      </section>
      <section class="m-5 w-full pb-5 border-b border-charcoal">
        <!-- General information -->
        <ul class="list-disc list-inside">
          <li>Address: {{ place.details.address }}</li>
          <li>{{ place.details.generalInfo }}</li>
        </ul>
      </section>
      <section class="w-full text-center pb-5 border-b border-charcoal">
        <h2>First time visiting a Japanese {{ place.details.placeType }}?</h2>
        <RouterLink v-if="place.details.placeType === 'onsen'" to="/onsenguide">Onsen Guide</RouterLink>
        <RouterLink v-if="place.details.placeType === 'shrine'" to="/shrineguide">Shrine Guide</RouterLink>
        <RouterLink v-if="place.details.placeType === 'restaurant'" to="/restaurantguide">Restaurant Guide</RouterLink>
      </section>
      <section class="m-5 w-full pb-5 border-b border-charcoal">
        <h2 class="text-center">Etiquette</h2>
        <ul class="list-disc list-inside">
          <li v-for="item in place.details.etiquettes" :key="item.id">
            {{ item.label }}
          </li>
        </ul>
      </section>
      <section class="m-5">
        Check out what other tourists are saying!
        <RouterLink to="/experiences">Experiences</RouterLink>
      </section>
    </div>
  </div>
</template>
