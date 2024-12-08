<script setup lang="ts">
import { usePlaceStore } from '@/stores/PlaceStore';
import { ref, watch, onMounted, onUnmounted } from 'vue';
import apiService, { type IPlaceMarker } from '@/services/api.service';
import { useToast } from 'vue-toastification';
import { useLoadingStore } from '@/stores/LoadingStore';

const place = usePlaceStore();
const toast = useToast();
const load = useLoadingStore();

const searchQuery = ref('');
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

  // Get user location
  const coordinates = getUserGeoLocation();

  errorMessage.value = '';

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
});
onUnmounted(() => {
  window.removeEventListener('resize', updateView);
});
</script>

<template>
  <div class="flex flex-row w-full bg-frostWhite justify-center p-1">
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
  <div class="text-center">
    <p v-if="errorMessage" class="text-red-500" text-sm mt-2>{{ errorMessage }}</p>
  </div>
</template>
