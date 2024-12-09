<script setup lang="ts">
import { usePlaceStore } from '@/stores/PlaceStore';
import type { IPlaceEtiquetteVotes } from '@/utils/interfaces/PlaceEtiquetteVotes';
import { defineProps } from 'vue';
import { defineEmits } from 'vue';
import PhotosComponent from './PhotosComponent.vue';

const emit = defineEmits(['show-add-vote', 'show-review-vote']);

const place = usePlaceStore();

const { etiquetteVotesData } = defineProps<{ etiquetteVotesData: IPlaceEtiquetteVotes }>();
</script>

<template>
  <div
    class="sm:w-fit sm:h-fit mt-3 lg:m-3 lg:mt-0 border border-slate-400 overflow-hidden rounded-xl shadow-2xl bg-frostWhite"
  >
    <section class="h-[20vh]">
      <!-- Cover Photo -->
      <section class="h-[20vh]">
        <!-- Cover Photo Slideshow -->
        <PhotosComponent class="max-w-[600px]" />
      </section>
      <div class="content">
        <!-- Other content here -->
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
          to="/guides/onsen"
          >Onsen Guide →</RouterLink
        >
        <RouterLink
          v-if="place.details.placeType === 'shrine'"
          class="block mx-auto w-3/4 bg-velvet border border-slate-400 text-frostWhite rounded-3xl text-center p-5"
          to="/guides/shrine"
          >Shrine Guide →</RouterLink
        >
        <RouterLink
          v-if="place.details.placeType === 'restaurant'"
          class="block mx-auto w-3/4 bg-velvet border border-slate-400 text-frostWhite rounded-3xl text-center p-5"
          to="/guides/restaurant"
          >Restaurant Guide →</RouterLink
        >
      </section>
      <section v-if="etiquetteVotesData" class="m-5 w-full pb-5 border-b border-slate-400">
        <h2 class="text-center text-velvet text-xl">Etiquette Rules</h2>
        <ul class="list-disc list-inside font-light">
          <li
            class="pb-3"
            v-for="item in etiquetteVotesData.data.etiquetteVotes"
            :key="item.etiquetteId"
          >
            <span class="font-bold">{{ item.etiquetteType }}</span> :
            {{
              item.numberOfVotesForAllowed === 0 && item.numberOfVotesForNotAllowed === 0
                ? 'Be the first to share'
                : item.numberOfVotesForAllowed >= item.numberOfVotesForNotAllowed
                  ? 'allowed'
                  : 'not allowed'
            }}
          </li>
        </ul>
        <div v-if="etiquetteVotesData.data.userHasVoted === false">
          <p>Visited here? Tell us about the etiquette rules.</p>
          <div>
            <button
              class="block mx-auto w-3/4 p-5 rounded-3xl border border-slate-400 hover:bg-white bg-velvet text-frostWhite hover:text-velvet hover:cursor-pointer"
              @click="emit('show-add-vote')"
            >
              Vote
            </button>
          </div>
        </div>
        <div v-if="etiquetteVotesData.data.userHasVoted === true">
          <p>Want to review the etiquette rules you told us about?</p>
          <div>
            <button
              class="block mx-auto w-3/4 p-5 rounded-3xl border border-slate-400 hover:bg-white bg-velvet text-frostWhite hover:text-velvet hover:cursor-pointer"
              @click="emit('show-review-vote')"
            >
              Review vote
            </button>
          </div>
        </div>
      </section>
      <section class="w-full mt-5">
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
