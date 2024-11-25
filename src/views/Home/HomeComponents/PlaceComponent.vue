<script setup lang="ts">
//import type Place from '@/utils/interfaces/Place';
import { usePlaceStore } from '@/stores/selectedPlace';

const place = usePlaceStore();

//use mock state data
place.useMock();

// defineProps<{
//   details: Place;
// }>();
</script>

<template>
  <div class="w-11/12 sm:w-1/2 h-fit sm:min-h-full mt-3 rounded-xl shadow-xl bg-peach">
    <section>
      <!-- Header Photo -->
       <div>
        <!-- <img src='details.photos[0]' alt="place_photo" /> -->
       </div>
    </section>
    <section>
      <!-- Name of the place -->
      <h1>{{ place.details.name }}</h1>
    </section>
    <section>
      <!-- General information -->
      <ul>
        <li>Address: {{ place.details.address }}</li>
      </ul>
      {{ place.details.generalInfo }}
    </section>
    <section>
      <h2>First time visiting a Japanese {{ place.details.placeType }}?</h2>
      <RouterLink v-if="place.details.placeType === 'onsen'" to="/onsenguide">Onsen Guide</RouterLink>
      <RouterLink v-if="place.details.placeType === 'shrine'" to="/shrineguide">Shrine Guide</RouterLink>
      <RouterLink v-if="place.details.placeType === 'restaurant'" to="/restaurantguide">Restaurant Guide</RouterLink>
    </section>
    <section>Etiquette

    </section>
    <section>
      Check out what other tourists are saying!
      <RouterLink to="/experiences">Experiences</RouterLink>
    </section>
  </div>
</template>
