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
    details.value.experiences = [
      {
        id: 1,
        placeId: 1,
        userId: 101,
        username: "Traveler42",
        dateVisited: new Date("2024-11-01"),
        etiquette: "No smoking",
        experience: "You can't smoke inside the building, but there is a designated smoking area outside.",
        place_etiquette_id: 1,
        metadata: {
          createdAt: new Date("2024-11-01T10:00:00Z"),
          updatedAt: new Date("2024-11-01T10:00:00Z"),
        },
      },
      {
        id: 2,
        placeId: 1,
        userId: 102,
        username: "TattooFan88",
        dateVisited: new Date("2024-10-15"),
        etiquette: "No tattoos",
        experience: "Visible tattoos are not allowed, so I had to wear a long-sleeved shirt to cover mine.",
        place_etiquette_id: 2,
        metadata: {
          createdAt: new Date("2024-10-15T09:00:00Z"),
          updatedAt: new Date("2024-10-15T09:00:00Z"),
        },
      },
      {
        id: 3,
        placeId: 1,
        userId: 103,
        username: "RelaxedTraveler",
        dateVisited: new Date("2024-11-20"),
        etiquette: "Towels provided",
        experience: "It was nice that towels were provided at the pool, saving me the hassle of bringing my own.",
        place_etiquette_id: 3,
        metadata: {
          createdAt: new Date("2024-11-20T14:00:00Z"),
          updatedAt: new Date("2024-11-20T14:00:00Z"),
        },
      },
      {
        id: 4,
        placeId: 1,
        userId: 104,
        username: "SwimPro",
        dateVisited: new Date("2024-09-10"),
        etiquette: "No swimming",
        experience: "Swimming is prohibited in the main lake due to safety concerns, but there’s a nearby public pool.",
        place_etiquette_id: 4,
        metadata: {
          createdAt: new Date("2024-09-10T12:00:00Z"),
          updatedAt: new Date("2024-09-10T12:00:00Z"),
        },
      },
      {
        id: 5,
        placeId: 1,
        userId: 105,
        username: "Philosopher101",
        dateVisited: new Date("2024-11-25"),
        etiquette: "Existential dread",
        experience: "The ambiance was reflective and a bit overwhelming—it felt designed to provoke deep existential questions.",
        place_etiquette_id: 5,
        metadata: {
          createdAt: new Date("2024-11-25T16:00:00Z"),
          updatedAt: new Date("2024-11-25T16:00:00Z"),
        },
      },
    ];
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
