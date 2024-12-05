<script setup lang="ts">
import { defineProps, reactive } from 'vue';
import type { IPlacesVisited } from '@/utils/interfaces/PlacesVisited';

const { placesVisitedByTourists } = defineProps<{ placesVisitedByTourists: IPlacesVisited }>();

// create a local reactive copy of the data to allow interaction locally such as sorting
const localPlacesVisited = reactive({
  data: [...(placesVisitedByTourists?.data || [])],
});

// Initially sort places visited according to date, with latest first
localPlacesVisited?.data.sort((placeVisitedA, placeVisitedB) => {
  return placeVisitedB.dateVisited.getTime() - placeVisitedA.dateVisited.getTime();
});

const sortByDate = (order: string) => {
  if (!localPlacesVisited?.data) return;

  const sortedArray = [...localPlacesVisited.data].sort((placeVisitedA, placeVisitedB) => {
    if (order === 'latest-first') {
      return placeVisitedB.dateVisited.getTime() - placeVisitedA.dateVisited.getTime();
    }

    if (order === 'latest-last') {
      return placeVisitedA.dateVisited.getTime() - placeVisitedB.dateVisited.getTime();
    }

    return 0;
  });

  localPlacesVisited.data = sortedArray;
};

const sortByType = (order: string) => {
  if (!localPlacesVisited?.data) return;

  const sortedArray = [...localPlacesVisited.data].sort((placeVisitedA, placeVisitedB) => {
    if (order === 'ascending') {
      return placeVisitedA.placeType.localeCompare(placeVisitedB.placeType);
    }

    if (order === 'descending') {
      return placeVisitedB.placeType.localeCompare(placeVisitedA.placeType);
    }

    return 0;
  });
  localPlacesVisited.data = sortedArray;
};

const sortByPlaceName = (order: string) => {
  if (!localPlacesVisited?.data) return;

  const sortedArray = [...localPlacesVisited.data].sort((placeVisitedA, placeVisitedB) => {
    if (order === 'ascending') {
      return placeVisitedA.placeName.localeCompare(placeVisitedB.placeName);
    }

    if (order === 'descending') {
      return placeVisitedB.placeName.localeCompare(placeVisitedA.placeName);
    }
    return 0;
  });
  localPlacesVisited.data = sortedArray;
};
</script>

<template>
  <div class="flex flex-col w-full">
    <section class="p-3">
      <!-- A short header -->
      <p>According to you, you have visited these places!</p>
    </section>
    <section>
      <!-- Allow sorting in this section-->
      <div class="flex flex-row w-full ml-3">
        <div class="text-sm flex flex-row p-3">
          <p>Sort by date:</p>
          <button class="mr-1 ml-1 hover:cursor-pointer" @click="sortByDate('latest-first')">
            ⬆
          </button>
          <button class="mr-1 ml-1 hover:cursor-pointer" @click="sortByDate('latest-last')">
            ⬇
          </button>
        </div>
        <div class="text-sm flex flex-row p-3">
          <p>Sort by place type</p>
          <button class="mr-1 ml-1 hover:cursor-pointer" @click="sortByType('ascending')">
            ⬆
          </button>
          <button class="mr-1 ml-1 hover:cursor-pointer" @click="sortByType('descending')">
            ⬇
          </button>
        </div>

        <div class="text-sm flex flex-row p-3">
          <p>Sort by place name</p>
          <button class="mr-1 ml-1 hover:cursor-pointer" @click="sortByPlaceName('ascending')">
            ⬆
          </button>
          <button class="mr-1 ml-1 hover:cursor-pointer" @click="sortByPlaceName('descending')">
            ⬇
          </button>
        </div>
      </div>
    </section>
    <section class="p-3">
      <!-- Main body of cards containing info -->
      <div
        v-for="placeVisited in localPlacesVisited?.data"
        class="p-3 border border-velvet rounded-lg mt-3"
      >
        <h3 class="text-lg font-extralight">
          {{ placeVisited.placeName }} : {{ placeVisited.placeType }}
        </h3>
        <p class="text-sm font-bold">You visited here {{ placeVisited.dateVisited }}</p>

        <p class="text-lg font-bold mt-3">Your experience:</p>
        <hr class="w-full mb-3" />
        <div class="flex flex-row items-start">
          <p class="text-lg font-thin mr-3">{{ placeVisited.experience }}</p>
          <button class="border border-velvet h-10 w-14 text-xs p-1 text-bold rounded mt-auto">
            Edit
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
