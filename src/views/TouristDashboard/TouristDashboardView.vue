<script setup lang="ts">
// import vue functions
import { ref } from 'vue';
// import child components
import VisitedPlaces from './TouristDashboardComponents/VisitedPlaces.vue';
// import types and interfaces needed
import type { IPlacesVisited } from '@/utils/interfaces/PlacesVisited';
// authorization
import { getAuth } from 'firebase/auth';
const auth = getAuth();
// api route
const apiUrl = import.meta.env.VITE_BACKEND_URL;

// Places visited by user
const placesVisitedByUser = ref<IPlacesVisited | null>(null);
// Mock data for places visited by user
const mockPlacesVisitedByUser = {
  message: 'Well done!',
  data: [
    {
      placeId: 1,
      placeName: 'Code Chrysalis Onsen',
      placeType: 'onsen',
      dateVisited: new Date('2024/11/12'),
      experience: 'Towels were provided. If you want to smoke, best smoke outside.',
    },
    {
      placeId: 2,
      placeName: 'Code Chrysalis Shrine',
      placeType: 'shrine',
      dateVisited: new Date('2024/11/13'),
      experience:
        "Don't forget to wash your hands before entering. Owner was pretty strict about it. Take shoes off, too. And donate 5 yen or more when you pray.",
    },
    {
      placeId: 3,
      placeName: 'Code Chrysalis Restaurant',
      placeType: 'restaurant',
      dateVisited: new Date('2024/11/14'),
      experience:
        'It might be all you can eat, but try not to eat all the food in the restaurant. The owner looked worried when I ate so much!',
    },
  ],
};

// database fetch requests for places visited
const fetchPlacesVisitedByUser = async () => {
  // TO DO: Uncomment when database is ready
  // TO DO: Replace mockPlacesVisitedByUser with placesVisitedByUser
  // const response = await fetch(`${apiUrl}/dashboard/placesVisited`, {
  //     method: 'GET',
  //     credentials: 'include'
  // });
  // placesVisitedByUser.value = await response.json();
};
fetchPlacesVisitedByUser(); // fetch the places visited by the user from the database
</script>

<template>
  <div class="flex flex-col w-full">
    <section class="flex flex-row justify-between p-3">
      <!-- Header section -->
      <h1 class="text-3xl m-3">Dashboard</h1>
      <h1 class="text-3xl m-3">Username</h1>
    </section>
    <section class="p-3 justify-items-center">
      <!-- Section for badges -->
      <p class="m-3">Badges info in this section</p>
    </section>
    <section class="p-3 flex flex-row justify-between">
      <!-- Section listing places you visited and experiences contributed -->
      <VisitedPlaces class="p-3" :placesVisitedByTourists="mockPlacesVisitedByUser" />
    </section>
    <section class="justify-items-center p-3">
      <!-- Section for buttons-->
      <button
        class="border border-velvet text-xl rounded p-3 m-3 hover:bg-velvet hover:text-frostWhite"
      >
        Search
      </button>
      <button
        class="border border-charcoal text-xl rounded p-3 m-3 hover:bg-charcoal hover:text-frostWhite"
      >
        Logout
      </button>
    </section>
  </div>
</template>
