<script setup lang="ts">
import { ref, computed, defineEmits } from 'vue';

import { usePlaceStore } from '@/stores/PlaceStore';

const place = usePlaceStore();

//use mock state data
place.useMock();

const emit = defineEmits(['toggleAddExperience']);

// etiquettes must be taken from Place -> Experience -> Etiquette
// and add to array only if not contained in the array
// A set is good for this because sets only accept unique values
const uniqueEtiquettes = new Set<string>();
if (typeof place.details.experiences !== 'undefined') {
  place.details.experiences.forEach((experience) => {
    experience.etiquettes.forEach((etiquette) => {
      uniqueEtiquettes.add(etiquette.label);
    });
    //uniqueEtiquettes.add(experience.etiquette);
  });
}
const etiquetteTypes: string[] = Array.from(uniqueEtiquettes);
const selectedFilter = ref<string | ''>('');

// Filter experiences based on experienceType
const filteredExperiences = computed(() => {
  if (place.details.experiences) {
    return selectedFilter.value
      ? place.details.experiences.filter(
          (experience) => experience.etiquettes[0].label === selectedFilter.value,
        )
      : place.details.experiences;
  } else {
    return [];
  }
});

// Emit click event to parent component to toggle the view
const handleAddExperience = () => {
  emit('toggleAddExperience');
};

let handleVote = async () => {
  try {
    await fetch(`${apiUrl}/places/${place.details.id}/experiences`, {
      method: 'POST',
      headers: {
        'Contents-type': 'application/json',
      },
      body: JSON.stringify({
        selectedEtiquette: experiencePackage.selectedEtiquette,
      }),
    });
    } catch (error) {
    console.error(error);
    }
}
</script>

<template>
  <div class="sm:w-1/2 sm:h-fit h-full sm:border border-slate-400 overflow-hidden sm:rounded-xl shadow-2xl bg-frostWhite">
    <section class="flex flex-row justify-between m-3">
      <!-- Place Name + add Experiences button-->
      <h1 class="text-3xl">{{ place.details.name }}</h1>
      <button
        class="border-velvet border p-2 rounded-xl font-extralight text-sm hover:bg-velvet hover:text-white"
        @click="handleAddExperience"
      >
        + Tell us your experience
      </button>
    </section>
    <section class="h-[20vh]">
      <!-- Cover Photo -->
      <div class="h-full w-full sm:border-t sm:border-b border-slate-400">
        <img
          v-if="place.details.photos?.length > 0 && place.details.photos"
          class="w-full h-full object-cover"
          :src="place.details.photos[0].fileData"
          alt="place_photo"
        />
      </div>
    </section>

    <section>
      <!-- Filter Experiences section -->
      <div class="flex flex-row justify-around m-3">
        <label for="filter" class="text-xl font-extralight">Filter by Etiquette:</label>
        <select class="w-1/2 rounded-lg bg-mist p-1" id="filter" v-model="selectedFilter">
          <option value="">All</option>
          <option v-for="type in etiquetteTypes" :key="type" :value="type">
            {{ type }}
          </option>
        </select>
      </div>
    </section>
    <section class="font-light">
      <!-- Repeated divs of experiences -->
      <div
        class="m-3 p-3 bg-white rounded-lg"
        v-for="experience in filteredExperiences"
        :key="experience.id"
      >

        <div class="flex flex-row">
          <section class="basis-1/6 sm:basis-1/12 sm:p-2">
            <button class="block mb-1">
              <svg viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg"
                class="fill-charcoal h-full w-full hover:fill-velvet ease-in-out transition duration-300"
              >
                <path d="M231.39062,123.06152A8,8,0,0,1,224,128H184v80a16.01833,16.01833,0,0,1-16,16H88a16.01833,16.01833,0,0,1-16-16V128H32a8.00065,8.00065,0,0,1-5.65723-13.65723l96-96a8.003,8.003,0,0,1,11.31446,0l96,96A8.002,8.002,0,0,1,231.39062,123.06152Z"/>
              </svg>
            </button>
            <button class="block">
              <svg viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg"
                class="fill-charcoal h-full w-full hover:fill-velvet ease-in-out transition duration-300"
              >
                <path d="M229.65723,141.65723l-96,96a8.003,8.003,0,0,1-11.31446,0l-96-96A8.00065,8.00065,0,0,1,32,128H72V48A16.01833,16.01833,0,0,1,88,32h80a16.01833,16.01833,0,0,1,16,16v80h40a8.00066,8.00066,0,0,1,5.65723,13.65723Z"/>
              </svg>
            </button>
          </section>
          <section class="basis-auto">
            <div class="flex flex-row m-1 justify-between text-xl">
              <h4>Etiquette</h4>
              <p class="text-velvet">{{ experience.etiquettes[0].label }}</p>
            </div>
            <div class="flex flex-col m-1 justify-between">
              <h4 class="text-xl">Experience</h4>
              <p>{{ experience.experience }}</p>
            </div>
            <div class="text-xs justify-self-end m-1">
              <span>{{ experience.username }} visted here {{ experience.dateVisited }}</span>
            </div>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>
