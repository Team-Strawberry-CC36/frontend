<script setup lang="ts">
import apiService from '@/services/api.service';
import { ref, onMounted } from 'vue';
import { usePlaceStore } from '@/stores/PlaceStore';

const placeStore = usePlaceStore();

const loading = ref(false);
const error = ref<string | null>(null);
</script>

<template>
  <div>
    <h1>Photos</h1>
    <div class="photos">
      <div v-for="(url, key) in placeStore.details.photos">
        <img :src="url" :key="key" alt="" class="w0[400px] h-[400px]" />
      </div>
    </div>
  </div>
</template>
