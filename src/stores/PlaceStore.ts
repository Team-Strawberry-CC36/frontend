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
    details.value.name = 'Code Chrysalis Onsen';
    details.value.address = '〒106-0046 Tokyo, Minato City, Motoazabu, 3 Chome−1−35 Vort元麻布 B2F';
    details.value.generalInfo = "Tis but a coding bootcamp disguised as an onsen!"
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
    details.value.photos = [{
      id: 1,
      fileData: 'https://cdn.cheapoguides.com/wp-content/uploads/sites/2/2023/04/Onsen-in-snow-Akita_Aimee-Gardner-770x513.jpg',
      metadata: {
        createdAt: 'Sometime',
        authorName: 'Someone',
      }
    }];
  }

  return { details, useMock }
})
