<script setup lang="ts">
import { usePlaceStore } from '@/stores/PlaceStore';
import { ref, watch } from 'vue';
import apiService from "@/services/api";
const place = usePlaceStore();
//place.useMock();

const searchQuery = ref('onsen');
const searchCategory = ref('onsen');
const errorMessage = ref('');
const emit = defineEmits(['search']);


// Watch the searchQuery so any changes clear the error message
watch(searchQuery, () => {
  if (errorMessage.value) {
    errorMessage.value = '';
  }
});

const performSearch = async () => {
  // Validate the search term
  if (searchQuery.value.length < 5) {
    errorMessage.value = 'Search term is not long enough.';
    return; // prevents the request being sent.
  }

  errorMessage.value = '';

  try {
    const response = await apiService.search(searchQuery.value, searchCategory.value);
    const data = response.data;

    emit("search", data);

  } catch (error) {
    console.error('Search request failed: ', error);
  }
};
</script>

<template>
  <div class="flex flex-row w-full bg-frostWhite justify-center p-1">
    <select
      v-model="searchCategory"
      class="w-1/6 h-10 p-3 mr-1 rounded-xl bg-charcoal text-white text-center text-sm"
    >
      <option value="onsen">onsen</option>
      <option value="shrine">shrine</option>
      <option value="restaurant">restaurant</option>
    </select>
    <input
      v-model="searchQuery"
      type="search"
      placeholder="Search for a place"
      class="focus:border focus:border-charcoal w-4/6 h-10 p-3 mr-1 rounded-xl focus:outline-none bg-mist focus:bg-white text-center text-sm lg:text-2xl"
    />
    <button
      @click="performSearch"
      class="border border-charcoal w-1/6 rounded-xl bg-charcoal text-white hover:cursor-pointer hover:bg-white hover:text-charcoal"
    >
      Search
    </button>
  </div>
  <div class="text-center">
    <p v-if="errorMessage" class="text-red-500" text-sm mt-2>{{ errorMessage }}</p>
  </div>
</template>
