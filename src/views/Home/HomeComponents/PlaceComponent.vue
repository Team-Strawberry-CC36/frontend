<script setup lang="ts">
//import type Place from '@/utils/interfaces/Place';
import { usePlaceStore } from '@/stores/PlaceStore';
import type IPlace from '@/utils/interfaces/Place';
import type { IPlaceEtiquetteVotes } from '@/utils/interfaces/PlaceEtiquetteVotes';
import { defineProps, watch } from 'vue';
import { defineEmits } from 'vue';
const emit = defineEmits(['show-add-vote', 'show-review-vote']);

const place = usePlaceStore();
const apiUrl = import.meta.env.VITE_BACKEND_URL;

const { data, etiquetteVotesData } = defineProps<{ data: IPlace, etiquetteVotesData: IPlaceEtiquetteVotes}>()

// HOTFIX
// If the prop changes, we update details!
watch(() => data, (value) => {
  place.details = value;
})

//use mock state data
place.useMock();
</script>

<template>
  <div
    class="sm:w-full sm:h-fit mt-3 lg:m-3 sm:border border-slate-400 overflow-hidden rounded-xl shadow-2xl bg-frostWhite"
  >
    <section class="h-[20vh]">
      <!-- Cover Photo -->
      <div class="h-full w-full">
        <img
          v-if="place.details.photos?.length > 0 && place.details.photos"
          class="w-full h-full object-cover border-b border-slate-400"
          :src="place.details.photos[0].fileData"
          alt="place_photo"
        />
      </div>
    </section>
    <div class="flex flex-col p-5 items-center">
      <section class="text-center w-full pb-5 border-b border-slate-400">
        <!-- Name of the place -->
        <h1 class="text-3xl">{{ place.details.name }}</h1>
      </section>
      <section class="m-5 w-full pb-5 border-b border-slate-400">
        <!-- General information -->
        <ul class="list-disc list-inside font-light">
          <li>Address: {{ place.details.address }}</li>
        </ul>
      </section>
      <section class="w-full pb-5 border-b border-slate-400">
        <h2 class="mb-3 text-center text-velvet">
          First time visiting a Japanese {{ place.details.placeType }}?
        </h2>
        <RouterLink
          v-if="place.details.placeType === 'onsen'"
          class="block mx-auto w-3/4 bg-velvet border border-slate-400 text-frostWhite rounded-3xl text-center p-5"
          to="/onsenguide"
          >Onsen Guide →</RouterLink
        >
        <RouterLink
          v-if="place.details.placeType === 'shrine'"
          class="block mx-auto w-3/4 bg-velvet border border-slate-400 text-frostWhite rounded-3xl text-center p-5"
          to="/shrineguide"
          >Shrine Guide →</RouterLink
        >
        <RouterLink
          v-if="place.details.placeType === 'restaurant'"
          class="block mx-auto w-3/4 bg-velvet border border-slate-400 text-frostWhite rounded-3xl text-center p-5"
          to="/restaurantguide"
          >Restaurant Guide →</RouterLink
        >
      </section>
      <section class="m-5 w-full pb-5 border-b border-slate-400">
        <h2 class="text-center text-velvet text-xl">Etiquette Rules</h2>
        <ul class="list-disc list-inside font-light">
          <li v-for="item in etiquetteVotesData.etiquetteVotes" :key="item.etiquetteId">
            {{ item.etiquetteType }} : {{ item.numberOfVotesForAllowed >= 2*item.numberOfVotesForNotAllowed ? 'allowed' : 'not allowed' }}
          </li>
        </ul>
        <div v-if="etiquetteVotesData.userHasVoted === false">
          <p>Agree with these etiquette rules for this place? Let us know.</p>
          <div>
            <button class="block mx-auto w-3/4 p-5 rounded-3xl border border-slate-400 hover:bg-white bg-velvet text-frostWhite hover:text-velvet hover:cursor-pointer" @click="emit('show-add-vote')">Vote</button>
          </div>
        </div>
        <div v-if="etiquetteVotesData.userHasVoted === true">
          <p>Want to review your vote?</p>
          <div>
            <button class="block mx-auto w-3/4 p-5 rounded-3xl border border-salte-400 hover:bg-white bg-velvet text-frostWhite hover:text-velvet hover:cursor-pointer" @click="emit('show-review-vote')">Review vote</button>
          </div>
        </div>
      </section>
      <section class="w-full">
        <h2 class="mb-3 text-center text-velvet">See what other tourists are saying!</h2>
        <RouterLink
          class="block mx-auto w-3/4 bg-velvet border border-slate-400 text-frostWhite rounded-3xl text-center p-5"
          to="/experiences"
          >Experiences →</RouterLink
        >
      </section>
    </div>
  </div>
</template>
