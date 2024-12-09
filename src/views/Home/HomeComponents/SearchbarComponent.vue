<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import apiService, { type IPlaceMarker } from '@/services/api.service';
import { POSITION, useToast } from 'vue-toastification';
import { useLoadingStore } from '@/stores/LoadingStore';
import { useSearchStore } from '@/stores/SearchStore';
import type { IPlaceType } from '@/utils/interfaces/Place';

const toast = useToast();
const load = useLoadingStore();
const search = useSearchStore();

const searchQuery = ref('');
const searchCategory = ref<IPlaceType>('onsen');
const emit = defineEmits(['search']);

const performSearch = async () => {
  // Validate the search term
  if (searchQuery.value.length < 4) {
    toast.error('Search term is not long enough', {
      timeout: 2500,
      position: POSITION.TOP_LEFT,
    });
    return; // prevents the request being sent.
  }

  // Get user location
  const coordinates = getUserGeoLocation();

  try {
    // [ ] Send coordinates!
    load.loading = true;
    const response = await apiService.search(searchQuery.value, searchCategory.value);
    const data = response.data.data;
    load.loading = false;

    const markers: IPlaceMarker[] = data.map((item) => {
      return {
        ...item,
        category: searchCategory.value,
      };
    });

    emit('search', {
      event: 'search-perfomed',
      data: markers,
    });
  } catch (error) {
    load.loading = false;
    toast.error('An error occured while performing your search.', {
      timeout: 3000,
    });
    console.error('Search request failed: ', error);
  }
};

function getUserGeoLocation(): { lat: number; lng: number } | null {
  if ('geolocation' in navigator) {
    // Geolocation is available in the browser
    navigator.geolocation.getCurrentPosition(
      (position) => {
        return {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      },
      () => {
        // Error!
        return null;
      },
    );
  }
  return null;
}

// Mobile detection code purely just to change the filter options into emojis
// Reactive property to track mobile view
const isMobileView = ref(window.innerWidth < 640);

// Listener to update `isMobileView` based on window size
const updateView = () => {
  isMobileView.value = window.innerWidth < 640;
};

// Add event listeners for responsive behavior
onMounted(() => {
  window.addEventListener('resize', updateView);
  //
  searchQuery.value = search.data.search;
  searchCategory.value = search.data.category;
});
onUnmounted(() => {
  window.removeEventListener('resize', updateView);
  //
  search.updateSearch(searchQuery.value);
  search.updateCategory(searchCategory.value);
});

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    performSearch();
  }
}
</script>

<template>
  <div
    class="flex flex-row w-full bg-frostWhite justify-center p-1"
    @keydown="handleKeydown"
    tabindex="0"
  >
    <select
      v-model="searchCategory"
      class="w-1/6 h-10 mr-1 rounded-xl border border-slate-400 bg-mist text-charcoal text-center text-sm"
    >
      <option :value="'onsen'">
        {{ isMobileView ? '♨️' : 'Onsen' }}
      </option>
      <option :value="'shrine'">
        {{ isMobileView ? '⛩️' : 'Shrines' }}
      </option>
      <option :value="'restaurant'">
        {{ isMobileView ? '🍴' : 'Restaurants' }}
      </option>
    </select>
    <input
      v-model="searchQuery"
      type="search"
      placeholder="Search for a place"
      class="border border-slate-400 focus:border focus:border-charcoal w-4/6 h-10 p-3 mr-1 rounded-xl focus:outline-none bg-mist focus:bg-white text-center text-sm lg:text-2xl"
    />
    <button
      @click="performSearch"
      class="border border-charcoal w-1/6 rounded-xl bg-charcoal text-white hover:cursor-pointer hover:bg-white hover:text-charcoal"
    >
      Search
    </button>
  </div>
</template>
