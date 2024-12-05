<script setup lang="ts">
import { apiService } from '@/services/api.service.ts';
import { usePlaceStore } from '@/stores/PlaceStore.ts';

const placeStore = usePlaceStore();

const photos = ref<string[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

onMounted(async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await apiService.fetchPhotos(placeStore.details.id);
    photos.value = response.data.data;
  } catch (err) {
    console.error(err);
    error.value = 'Failed to load photos.';
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <h1>Photos</h1>
    <div v-if="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-else class="photos">
      <img v-for="(photo, index) in photos" :key="index" :src="photo" alt="Place photo" />
    </div>
  </div>
</template>
