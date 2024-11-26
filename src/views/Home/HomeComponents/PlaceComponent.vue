<script setup lang="ts">
//import type Place from '@/utils/interfaces/Place';
import { usePlaceStore } from '@/stores/PlaceStore';

const place = usePlaceStore();

//use mock state data
place.useMock();

</script>

<template>
  <div class="sm:w-1/2 sm:h-fit h-full sm:border border-slate-400 overflow-hidden sm:m-3 sm:rounded-xl shadow-2xl bg-frostWhite">
    <section class="h-80">
      <!-- Cover Photo -->
       <div class="h-full w-full">
        <img class="w-full h-full object-cover border-b border-slate-400"  :src='place.details.photos[0].fileData' alt="place_photo" />
       </div>
    </section>
    <div class="flex flex-col p-5 items-center">
      <section class="text-center w-full pb-5 border-b border-slate-400">
        <!-- Name of the place -->
        <h1 class="text-3xl">{{ place.details.name }}</h1>
      </section>
      <section class="m-5 w-full pb-5 border-b border-slate-400">
        <!-- General information -->
        <ul class="list-disc list-inside">
          <li>Address: {{ place.details.address }}</li>
          <li>{{ place.details.generalInfo }}</li>
        </ul>
      </section>
      <section class="w-full pb-5 border-b border-slate-400">
        <h2 class="mb-3 text-center text-velvet">First time visiting a Japanese {{ place.details.placeType }}?</h2>
        <RouterLink v-if="place.details.placeType === 'onsen'" class="block mx-auto w-3/4 bg-velvet border border-slate-400 text-frostWhite rounded-3xl text-center p-5" to="/onsenguide">Onsen Guide →</RouterLink>
        <RouterLink v-if="place.details.placeType === 'shrine'" class="block mx-auto w-3/4 bg-velvet border border-slate-400 text-frostWhite rounded-3xl text-center p-5" to="/shrineguide">Shrine Guide →</RouterLink>
        <RouterLink v-if="place.details.placeType === 'restaurant'" class="block mx-auto w-3/4 bg-velvet border border-slate-400 text-frostWhite rounded-3xl text-center p-5" to="/restaurantguide">Restaurant Guide →</RouterLink>
      </section>
      <section class="m-5 w-full pb-5 border-b border-slate-400">
        <h2 class="text-center text-velvet text-xl">Etiquette Rules</h2>
        <ul class="list-disc list-inside">
          <li v-for="item in place.details.etiquettes" :key="item.id">
            {{ item.label }}
          </li>
        </ul>
      </section>
      <section class="w-full">
        <h2 class="mb-3 text-center text-velvet">See what other tourists are saying!</h2>
        <RouterLink class="block mx-auto w-3/4 bg-velvet border border-slate-400 text-frostWhite rounded-3xl text-center p-5" to="/experiences">Experiences →</RouterLink>
      </section>
    </div>
  </div>
</template>
