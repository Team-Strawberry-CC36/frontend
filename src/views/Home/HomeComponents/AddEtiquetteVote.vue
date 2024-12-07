<script setup lang="ts">
import { defineEmits } from 'vue';
const emit = defineEmits(['close-add-vote']);

// Props
import { defineProps } from 'vue';
import type { IPlaceEtiquetteVotes } from '@/utils/interfaces/PlaceEtiquetteVotes';
import type { EtiquetteStatus } from '@/utils/interfaces/Etiquette';
const { etiquetteVotesData } = defineProps<{ etiquetteVotesData: IPlaceEtiquetteVotes | null}>()

// Authorization
import { getAuth } from 'firebase/auth';
const auth = getAuth();

// pinia app state
import { usePlaceStore } from '@/stores/PlaceStore';
const place = usePlaceStore();
//place.useMock();

// Tracking selections
import { reactive } from 'vue'

// Reactive state for etiquette selections
const etiquetteSelections = reactive(new Map<number, EtiquetteStatus>());
// Initial values for etiquetteSelections
etiquetteVotesData?.data.usersVote.forEach((vote) => {
    etiquetteSelections.set(vote.etiquetteId, undefined);
});
const updateSelection = (etiquetteLabelId: number, value: 'allowed' | 'not-allowed') => {
    etiquetteSelections.set(etiquetteLabelId, value);
}
console.log(etiquetteSelections);

// Handle click of the button
const handleClick = async () => {
    await submitVote();
    emit('close-add-vote');
}

// For submitting the vote
const apiUrl = import.meta.env.VITE_BACKEND_URL;
const submitVote = async () => {
    console.log(etiquetteSelections);
    // Convert to an array for easier processing
    const voteData = Array.from(etiquetteSelections.entries()).map(([key, value]) => ({
        etiquetteId: Number(key),
        etiquetteType: etiquetteVotesData?.data.usersVote.find((vote) => vote.etiquetteId === Number(key))?.etiquetteType,
        vote: value
    }));
    try {
        const response = await fetch(`${apiUrl}/moreTesting/places/${place.details.id}/votes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                votes: voteData,
                //userId: auth.currentUser?.uid,
                placeId: place.details.id
            }),
        });

        if (!response.ok) {
            alert("ERROR!");
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        
    } catch (error) {
        console.log("There was an error posting the vote:", error);
    }
}

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
        <h1 class="text-3xl">Vote for {{ place.details.name }}'s etiquette</h1>
      </section>
      <section class="m-5 w-full pb-5 border-b border-slate-400">
        <!-- General information -->
        <ul class="list-disc list-inside">
          <li>Address: {{ place.details.address }}</li>
        </ul>
      </section>

      <section class="w-full">
        <!-- Voting section -->
         <div v-for="etiquette in etiquetteVotesData?.data.etiquetteVotes">
            <div class="flex flex-row">
                <div class="p-3 w-1/2"> 
                    {{ etiquette.etiquetteType }} 
                </div>
                <div class="p-3">
                    <input 
                        class="ml-3"
                        type="checkbox" 
                        :id="etiquette.etiquetteType + '-allowed'"
                        value="allowed" 
                        :checked="etiquetteSelections.get(etiquette.etiquetteId) === 'allowed'"
                        @change="updateSelection(etiquette.etiquetteId, 'allowed')"
                    />
                    <label class="ml-3" :for="etiquette.etiquetteType + '-allowed'">allowed</label>
                    <input 
                        class="ml-3"
                        type="checkbox" 
                        :id="etiquette.etiquetteType + '-not-allowed'"
                        value="not_allowed" 
                        :checked="etiquetteSelections.get(etiquette.etiquetteId) === 'not-allowed'"
                        @change="updateSelection(etiquette.etiquetteId, 'not-allowed')"
                    />
                    <label  class="ml-3":for="etiquette.etiquetteType + '-not-allowed'">not allowed</label>
                </div>
            </div>
         </div>
         <div class="flex flex-row justify-center"> 
            <button class="h-12 w-1/2 rounded-lg border border-charcoal hover:bg-white bg-velvet text-white hover:text-velvet hover:cursor-pointer" @click="handleClick">Done!</button>
         </div>
        
      </section>
    </div>
  </div>
</template>