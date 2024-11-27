<script setup lang="ts">
import type IPlace from '@/utils/interfaces/Place';
import HomeMap from './features/HomeMap.vue';
import AddExperience from '@/views/Experiences/AddExperience.vue';

function doSomething(event: { event: string; place: IPlace }) {
  console.log(event);
}
</script>

<template>
  <h1>Testing components</h1>
  <div class="w-[600px] h-[400px] border border-l border-white-500">
    <HomeMap :data="[]" @map-marker-clicked="doSomething" />
  </div>
  <AddExperience />
</template>

<style scoped></style>
