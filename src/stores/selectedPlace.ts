import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type Place from '@/utils/interfaces/Place'

export const usePlaceStore = defineStore('placeStore', () => {
  const details = ref<Place>({
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

  return { details }
})
