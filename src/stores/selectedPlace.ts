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

  function useMock() {
    details.value.id = 1;
    details.value.name = 'CC Onsen';
    details.value.address = '〒106-0046 Tokyo, Minato City, Motoazabu, 3 Chome−1−35 Vort元麻布 B2F';
    details.value.generalInfo = "Tis but an onsen disguised as a coding bootcamp!"
    details.value.placeType = 'onsen';
    details.value.location = {latitude: 35.65867467719728, longitude: 139.72758253068733};
    details.value.etiquettes = [
      {id: 1, label: "No smoking"},
      {id: 2, label: "No tattoos"},
      {id: 3, label: "Towels provided"},
      {id: 4, label: "No swimming"},
      {id: 5, label: "Existential dread"},
    ];
    details.value.experiences = [];
    details.value.photos = [];
  }

  return { details, useMock }
})
