<script setup lang="ts">
// import vue functions
import { ref } from 'vue';
// import child components
import VisitedPlaces from './TouristDashboardComponents/VisitedPlaces.vue';
// import types and interfaces needed
import type { IPlaceVisitedAlias } from '@/utils/interfaces/PlacesVisited';
// authorization
import { getAuth, signOut } from 'firebase/auth';
import apiService from '@/services/api.service';
const auth = getAuth();
// toasts
import { useToast } from 'vue-toastification';
const toast = useToast();

// Places visited by user
const placesVisitedByUser = ref<IPlaceVisitedAlias[]>([]);

// Good example of
// Mock data for places visited by user

// database fetch requests for places visited
const fetchPlacesVisitedByUser = async () => {
  try {
    const response = await apiService.getUserExperience();
    placesVisitedByUser.value = response.data.data;
  } catch (error) {
    toast.error("An error occured while retrieving your experiences.", {
      timeout: 5000
    })
    console.log('Error fetching experiences:', error);
  }
  // TO DO: Uncomment when database is ready
  // TO DO: Replace mockPlacesVisitedByUser with placesVisitedByUser
  // const response = await fetch(`${apiUrl}/dashboard/placesVisited`, {
  //     method: 'GET',
  //     credentials: 'include'
  // });
  // placesVisitedByUser.value = await response.json();
};

fetchPlacesVisitedByUser(); // fetch the places visited by the user from the database

const handleSignOut = async () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      toast.info("Sign out successful. See you next time!", {
        timeout: 3000
      })
    })
    .catch((error) => {
      // An error happened.
      toast.error("An error occured while signing you out.", {
        timeout: 3000
      })
      console.log('Error: ' + error);
    });
}
</script>

<template>
  <div class="flex flex-col w-full">
    <section class="flex flex-row justify-center sm:justify-start p-3">
      <!-- Header section -->
      <h1 class="text-3xl m-3">{{ auth.currentUser?.displayName }}'s Dashboard</h1>
    </section>
    <section class="p-3 justify-items-center">
      <!-- Section for badges -->
      <div class="flex flex-col w-full sm:w-3/4 p-3 rounded-xl border border-slate-400 bg-frostWhite justify-center">
        <h1 class="m-1 text-center">Badges and Titles</h1>
        <p v-if="placesVisitedByUser?.length === undefined || placesVisitedByUser?.length < 5" class="m-1 text-center font-extralight">No badge titles earned yet. Share more experiences to earn some!</p>
        <p v-else-if="placesVisitedByUser?.length >= 5 || placesVisitedByUser?.length < 10" class="m-1 text-center font-extralight">Noice Traveller</p>
        <p v-else-if="placesVisitedByUser?.length >= 10 || placesVisitedByUser?.length < 20" class="m-1 text-center font-extralight">Well-Travelled</p>
        <p v-else-if="placesVisitedByUser?.length >= 20" class="m-1 text-center font-extralight">Local Expert!</p>
      </div>
    </section>
    <section class="p-3 flex flex-row justify-between">
      <!-- Section listing places you visited and experiences contributed -->
      <VisitedPlaces class="p-3" :placesVisitedByTourists="placesVisitedByUser" />
    </section>
    <section class="justify-items-center p-3">
      <!-- Section for buttons-->
      <!-- Commenting out this search button until further notice -->
      <!-- <button
        class="border border-velvet bg-frostWhite text-velvet text-xl rounded p-3 m-3 hover:bg-velvet hover:text-frostWhite"
      >
        Search
      </button> -->
      <button
        class="border border-charcoal bg-frostWhite text-charcoal text-xl rounded p-3 m-3 hover:bg-charcoal hover:text-frostWhite"
        @click.prevent="handleSignOut"
      >
        Logout
      </button>
    </section>
  </div>
</template>
