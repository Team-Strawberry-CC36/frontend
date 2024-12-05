<script setup lang="ts">
import apiService from '@/services/api.service';
import { ref, onMounted } from 'vue';
import { usePlaceStore } from '@/stores/PlaceStore';

const placeStore = usePlaceStore();

const photos = ref<string[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

onMounted(async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await apiService.fetchPhotos(placeStore.details.id);
    // Need to change unknow to something
    photos.value = response.data as unknown as string[];
    console.log(photos.value);
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
