import { reactive } from 'vue';
import { defineStore } from 'pinia';
import type IPlace from '@/utils/interfaces/Place';

export const usePlaceStore = defineStore('placeStore', () => {
  const details = reactive<IPlace>({
    id: 0,
    name: '',
    address: '',
    placeType: 'onsen',
    location: {
      latitude: 0,
      longitude: 0,
    },
    etiquettes: [],
    experiences: [],
    photos: [],
    metadata: {
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  function useMock() {
    details.id = 1;
    details.name = 'Code Chrysalis Onsen';
    details.address = '〒106-0046 Tokyo, Minato City, Motoazabu, 3 Chome−1−35 Vort元麻布 B2F';
    details.placeType = 'onsen';
    details.location = { latitude: 35.65867467719728, longitude: 139.72758253068733 };
    details.etiquettes = [
      { id: 1, label: 'Smoking', status: 'not-allowed' },
      { id: 2, label: 'Tattoos', status: 'not-allowed' },
      { id: 3, label: 'Towels', status: 'allowed' },
      { id: 4, label: 'Swimming', status: 'not-allowed' },
      { id: 5, label: 'Existential dread', status: 'allowed' },
    ];
    details.experiences = [
      {
        id: 1,
        username: 'HealthConcious123',
        dateVisited: new Date('2024-11-27'),
        etiquettes: [{ id: 1, label: 'Smoking' }],
        experience:
          'I truly appreciated the no-smoking policy—it created a much cleaner and healthier environment. It made the experience more enjoyable for everyone.',
        helpfulness: 34,
        metadata: {
          createdAt: new Date('2024-11-27T10:00:00Z'),
          updatedAt: new Date('2024-11-27T10:00:00Z'),
        },
      },
      {
        id: 2,
        username: 'ArtLover92',
        dateVisited: new Date('2024-11-28'),
        etiquettes: [{ id: 2, label: 'Tattoos' }],
        experience:
          'I was a bit surprised by the "No tattoos" rule—it felt a bit restrictive. However, the ambiance was nice and quite serene.',
        helpfulness: 27,
        metadata: {
          createdAt: new Date('2024-11-28T14:30:00Z'),
          updatedAt: new Date('2024-11-28T14:30:00Z'),
        },
      },
      {
        id: 3,
        username: 'ComfortSeeker',
        dateVisited: new Date('2024-11-29'),
        etiquettes: [{ id: 3, label: 'Towels' }],
        experience:
          'Having towels provided was a wonderful touch! It made the visit hassle-free, and the attention to detail was impressive.',
        helpfulness: 78,
        metadata: {
          createdAt: new Date('2024-11-29T09:45:00Z'),
          updatedAt: new Date('2024-11-29T09:45:00Z'),
        },
      },
      {
        id: 4,
        username: 'SwimFanatic',
        dateVisited: new Date('2024-11-26'),
        etiquettes: [{ id: 4, label: 'Swimming' }],
        experience:
          'The "No swimming" policy was disappointing as I was looking forward to taking a dip. Nonetheless, the other facilities were great, so it balanced out.',
        helpfulness: 12,
        metadata: {
          createdAt: new Date('2024-11-26T18:20:00Z'),
          updatedAt: new Date('2024-11-26T18:20:00Z'),
        },
      },
      {
        id: 5,
        username: 'Philosopher101',
        dateVisited: new Date('2024-11-25'),
        etiquettes: [{ id: 1, label: 'Ambiance' }],
        experience:
          'The ambiance was reflective and a bit overwhelming—it felt designed to provoke deep existential questions.',
        helpfulness: 102,
        metadata: {
          createdAt: new Date('2024-11-25T16:00:00Z'),
          updatedAt: new Date('2024-11-25T16:00:00Z'),
        },
      },
    ];
    details.photos = [
      {
        id: 1,
        fileData:
          'https://cdn.cheapoguides.com/wp-content/uploads/sites/2/2023/04/Onsen-in-snow-Akita_Aimee-Gardner-770x513.jpg',
        metadata: {
          createdAt: 'Sometime',
          authorName: 'Someone',
        },
      },
    ];
  }

  return { details, useMock };
});
