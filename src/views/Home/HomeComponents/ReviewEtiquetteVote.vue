<script setup lang="ts">
import { defineEmits } from 'vue';
import { useToast } from 'vue-toastification';
import PhotosComponent from './PhotosComponent.vue';

const emit = defineEmits(['close-review-vote', 'refresh-votes-data']);

const toast = useToast();

// Props
import { defineProps } from 'vue';
import type { IPlaceEtiquetteVotes } from '@/utils/interfaces/PlaceEtiquetteVotes';
import type { EtiquetteStatus } from '@/utils/interfaces/Etiquette';
const { etiquetteVotesData } = defineProps<{ etiquetteVotesData: IPlaceEtiquetteVotes | null }>();

console.log('In review etiquette votes:', etiquetteVotesData);

// Authorization
import { getAuth } from 'firebase/auth';
const auth = getAuth();

// pinia app state
import { usePlaceStore } from '@/stores/PlaceStore';
const place = usePlaceStore();
//place.useMock();

// Tracking selections
import { reactive } from 'vue';

// Reactive state for etiquette selections
const etiquetteSelections = reactive(new Map<number, EtiquetteStatus>());
// Set the initial state
etiquetteVotesData?.data.usersVote.forEach((etiquetteVote) => {
  etiquetteSelections.set(etiquetteVote.etiquetteId, etiquetteVote.vote);
});

const updateSelection = (etiquetteLabelId: number, value: 'allowed' | 'not-allowed') => {
  const currentSelection = etiquetteSelections.get(etiquetteLabelId);

  // Deselect if the same value is clicked again, otherwise update the selection
  if (currentSelection === value) {
    etiquetteSelections.set(etiquetteLabelId, 'neutral');
  } else {
    etiquetteSelections.set(etiquetteLabelId, value);
  }
};

// Handle click of the button
const handleClick = async () => {
  await updateVote();
  emit('close-review-vote');
};

const handleCancel = () => {
  emit('close-review-vote');
};

// For submitting the vote
const apiUrl = import.meta.env.VITE_BACKEND_URL;
const updateVote = async () => {
  // Convert to an array for easier processing
  const voteData = Array.from(etiquetteSelections.entries()).map(([key, value]) => ({
    etiquetteId: Number(key),
    etiquetteType: etiquetteVotesData?.data.usersVote.find(
      (vote) => vote.etiquetteId === Number(key),
    )?.etiquetteType,
    vote: value,
  }));

  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await fetch(`${apiUrl}/moreTesting/places/${place.details.id}/votes`, {
        method: 'PATCH',
        headers,
        credentials: 'include',
        body: JSON.stringify({
          votes: voteData,
          placeId: place.details.id,
        }),
      });

      if (!response.ok) {
        toast.error('An error occured while sending your input.', {
          timeout: 3000,
        });
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      if (result.message === 'Votes updated successfully') {
        emit('refresh-votes-data');
      }
    } catch (error) {
      console.log('There was an error posting the vote:', error);
    }
  }
};
</script>

<style>
.place {
  height: calc(100vh - 156px)
}

@media screen and (max-width: 1015px) {
  .place {
    height: auto;
  }
}
</style>

<template>
  <div
    class="sm:w-fit place mt-3 lg:m-3 lg:mt-0 border border-slate-400 sm:overflow-y-auto overflow-hidden rounded-xl shadow-2xl bg-frostWhite"
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
    <div class="flex flex-col p-5 items-center max-w-[600px]">
      <section class="text-center w-full pb-5 border-b border-slate-400">
        <!-- Name of the place -->
        <h1 class="text-3xl">Vote for {{ place.details.name }}'s etiquette</h1>
      </section>
      <section class="m-5 w-full pb-5 border-b border-slate-400">
        <!-- General information -->
        <ul class="list-disc list-inside">
          <li>Address: {{ place.details.address }}</li>
        </ul>
      </section>

      <section class="w-full">
        <p class="md:text-lg lg:text-xl">
          You shared the following information with the community. Feel free to update you knowledge
          of this location. Leave unchecked if you don't know about it or didn't experience it.
        </p>
        <!-- Voting section -->
        <div v-for="etiquette in etiquetteVotesData?.data.usersVote">
          <div class="flex flex-col">
            <div class="p-3 w-full text-center md:text-xl lg:text-2xl">
              {{ etiquette.etiquetteType }}
            </div>
            <div class="flex flex-row justify-around">
              <span>allowed</span>
              <span>not allowed</span>
            </div>
            <div class="p-3 flex flex-row justify-around">
              <input
                class="appearance-none w-6 h-6 rounded-md bg-gray-200 border-2 border-gray-300 checked:bg-blue-600 checked:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                type="checkbox"
                :id="etiquette.etiquetteType + '-allowed'"
                value="allowed"
                :checked="etiquetteSelections.get(etiquette.etiquetteId) === 'allowed'"
                @change="updateSelection(etiquette.etiquetteId, 'allowed')"
              />

              <input
                class="ml-3 appearance-none w-6 h-6 rounded-md bg-gray-200 border-2 border-gray-300 checked:bg-blue-600 checked:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                type="checkbox"
                :id="etiquette.etiquetteType + '-not-allowed'"
                value="not_allowed"
                :checked="etiquetteSelections.get(etiquette.etiquetteId) === 'not-allowed'"
                @change="updateSelection(etiquette.etiquetteId, 'not-allowed')"
              />
            </div>
            <div class="w-full h-[1px] bg-gray-300 mt-2"></div>
          </div>
        </div>
        <div class="flex flex-row justify-center">
          <button
            class="h-12 w-1/2 mr-5 rounded-lg border border-charcoal hover:bg-white bg-velvet text-white hover:text-velvet hover:cursor-pointer"
            @click="handleCancel"
          >
            Cancel
          </button>
          <button
            class="h-12 w-1/2 rounded-lg border border-charcoal hover:bg-white bg-green-600 text-white hover:text-velvet hover:cursor-pointer"
            @click="handleClick"
          >
            Set
          </button>
        </div>
      </section>
    </div>
  </div>
</template>
