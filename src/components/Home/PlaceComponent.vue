<script setup lang="ts">
import type Place from '@/interfaces/Place';

defineProps<{
  placeDetails: Place;
}>();
</script>

<template>
  <div class="w-11/12 sm:w-1/2 h-fit sm:min-h-full mt-3 rounded-xl shadow-xl bg-peach">
    <section>
      <!-- Header Photo -->
       <div>
        <img src='placeDetails.photos[0]' alt="place_photo" />
       </div>
    </section>
    <section>
      <!-- Name of the place -->
      <h1>{{ placeDetails.name }}</h1>
    </section>
    <section>
      <!-- General information -->
      <ul>
        <li>AddressL: {{ placeDetails.address }}</li>
      </ul>
      {{ placeDetails.generalInfo }}
    </section>
    <section>
      <h2>First time visiting a Japanese {{ placeDetails.placeType }}?</h2>
      <RouterLink v-if="placeDetails.placeType === 'onsen'" to="/onsenguide">Onsen Guide</RouterLink>
      <RouterLink v-if="placeDetails.placeType === 'shrine'" to="/shrineguide">Shrine Guide</RouterLink>
      <RouterLink v-if="placeDetails.placeType === 'restaurant'" to="/restaurantguide">Restaurant Guide</RouterLink>
    </section>
    <section>Etiquette</section>
    <section>
      Check out what other tourists are saying!
      <RouterLink to="/experiences">Experiences</RouterLink>
    </section>
  </div>
</template>
