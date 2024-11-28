<script setup lang="ts">
import { defineEmits } from 'vue';
const emit = defineEmits(['close-add-vote']);

import { usePlaceStore } from '@/stores/PlaceStore';
const place = usePlaceStore();
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
        <h1 class="text-3xl">Vote for {{ place.details.name }}'s etiquette</h1>
      </section>
      <section class="m-5 w-full pb-5 border-b border-slate-400">
        <!-- General information -->
        <ul class="list-disc list-inside">
          <li>Address: {{ place.details.address }}</li>
        </ul>
      </section>

      <section>
        <!-- Voting section-->
        <button @click="emit('close-add-vote')">Done!</button>
      </section>
    </div>
  </div>
</template>