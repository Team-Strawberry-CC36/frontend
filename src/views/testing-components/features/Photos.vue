<script setup lang="ts">
import { apiService } from '@/services/api.service.ts';

apiService.getPhotos;
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
