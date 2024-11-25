<script setup lang="ts">
    import ExperiencesComponent from './ExperiencesComponents/ExperiencesComponent.vue';
    import { ref } from 'vue';
    import type Place from '@/utils/interfaces/Place';
    const placeDetails = ref<Place>({
        id: 0,
        name: '',
        address: '',
        generalInfo: '',
        placeType: 'onsen',
        location: {
            latitude: 0,
            longitude: 0,
        },
        etiquettes: [],
        experiences: [],
        photos: [],
        metadata: {
            createdAt: new Date,
            updatedAt: new Date,
        }
    });

</script>

<template>
  <main class="flex flex-col items-center justify-center h-screen w-full bg-roseQuartz">
    <ExperiencesComponent
        :placeDetails="placeDetails"
    />
  </main>
</template>
