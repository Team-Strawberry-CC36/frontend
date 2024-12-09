<script setup lang="ts">
// import vue functions
import { ref } from 'vue';
// import child components
import VisitedPlaces from './TouristDashboardComponents/VisitedPlaces.vue';
// import types and interfaces needed
import type { IPlaceVisitedAlias } from '@/utils/interfaces/PlacesVisited';
// authorization
import { getAuth } from 'firebase/auth';
import apiService from '@/services/api.service';
const auth = getAuth();
// toasts
import { useToast } from 'vue-toastification';
const toast = useToast();
// loading screen
import { useLoadingStore } from '@/stores/LoadingStore';
const load = useLoadingStore();
// Helpfulness store
import { useExperienceVoteStore } from '@/stores/ExperienceVoteStore';
const helpfulvote = useExperienceVoteStore();

// Places visited by user
const placesVisitedByUser = ref<IPlaceVisitedAlias[]>([]);

// Good example of
// Mock data for places visited by user

// database fetch requests for places visited
const fetchPlacesVisitedByUser = async () => {
  try {
    load.loading = true;
    const response = await apiService.getUserExperience();
    placesVisitedByUser.value = response.data.data;
    load.loading = false;
  } catch (error) {
    load.loading = false;
    toast.error('An error occured while retrieving your experiences.', {
      timeout: 5000,
    });
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

// const handleSignOut = async () => {
//   signOut(auth)
//     .then(() => {
//       // Sign-out successful.
//       toast.info('Sign out successful. See you next time!', {
//         timeout: 3000,
//       });
//     })
//     .catch((error) => {
//       // An error happened.
//       toast.error('An error occured while signing you out.', {
//         timeout: 3000,
//       });
//       console.log('Error: ' + error);
//     });
// };

const experienceBadges = [
  {
    id: 1,
    name: '旅人 Tabibito',
    threshold: 5,
  },
  {
    id: 2,
    name: '探検家 Tankenka',
    threshold: 10,
  },
  {
    id: 3,
    name: '国巡り人 Kuni Meguribito',
    threshold: 20,
  },
  {
    id: 4,
    name: '旅の達人 Tabi no Tatsujin',
    threshold: 35,
  },
  {
    id: 5,
    name: '開拓者 Kaitakusha',
    threshold: 50,
  },
  {
    id: 6,
    name: '日本の伝説 Nippon no Densetsu',
    threshold: 70,
  },
];

const helpfulnessVoteBadges = [
  {
    id: 1,
    name: 'Thoughtful Reviewer',
    threshold: 10,
  },
  {
    id: 2,
    name: 'Journey Evaluator',
    threshold: 20,
  },
  {
    id: 3,
    name: 'Insightful Critic',
    threshold: 40,
  },
  {
    id: 4,
    name: 'Seasoned Advisor',
    threshold: 80,
  },
  {
    id: 5,
    name: 'Travel Guru',
    threshold: 160,
  },
  {
    id: 6,
    name: 'Critic Extraordinaire',
    threshold: 320,
  },
];

// Tooltip state
const showToolTip = ref<boolean>(false);
const toolTipText = ref<string>('');
const toolTipPosition = ref<{ x: number; y: number }>({ x: 0, y: 0 });

// @ts-ignore
const handleHoverOrTouch = (badge: any, event: MouseEvent | TouchEvent) => {
  showToolTip.value = true;
  toolTipText.value = 'Provided ' + badge.threshold;
  const rect = (event.target as HTMLElement).getBoundingClientRect();

  toolTipPosition.value = {
    x: rect.left + 200, //3*rect.width,
    y: rect.top + window.scrollY - 30,
  };
};
const handleLeaveOrTouchEnd = () => {
  showToolTip.value = false;
};
</script>

<template>
  <div class="flex flex-col w-full">
    <section class="flex flex-row justify-center sm:justify-start p-3">
      <!-- Header section -->
      <h1 class="text-3xl m-3">{{ auth.currentUser?.displayName }}'s Dashboard</h1>
    </section>
    <section class="p-3 justify-items-center">
      <!-- Section for badges -->
      <div
        class="flex flex-col w-full sm:w-3/4 p-3 rounded-xl border border-slate-400 bg-frostWhite justify-center"
      >
        <h1 class="m-1 pb-1 border-b border-slate-400 text-center">Badges and Titles</h1>
        <p
          v-if="placesVisitedByUser?.length === undefined || placesVisitedByUser?.length < 5"
          class="m-1 text-center font-extralight"
        >
          No badge titles earned yet. Share more experiences to earn some!
        </p>
        <p v-if="placesVisitedByUser?.length >= 5" class="m-1 p-1 text-center font-extralight">
          Experiences
        </p>
        <section class="grid grid-cols-3">
          <div v-for="badge in experienceBadges" :key="badge.id">
            <div
              v-if="placesVisitedByUser?.length >= badge.threshold"
              @mouseover="handleHoverOrTouch(badge, $event)"
              @mouseleave="handleLeaveOrTouchEnd"
              @touchstart="handleHoverOrTouch(badge, $event)"
              @touchend="handleLeaveOrTouchEnd"
              class="border border-slate-400 bg-mist m-1 p-1 rounded-xl text-center font-extralight"
            >
              {{ badge.name }}
            </div>
            <div
              v-if="showToolTip"
              :style="{
                left: `${toolTipPosition.x}px`,
                top: `${toolTipPosition.y}px`,
              }"
              class="absolute transform -translate-x-1/2 bg-gray-800 text-white text-sm rounded p-2 shadow-lg"
            >
              {{ toolTipText }} experiences.
            </div>
          </div>
        </section>
        <p v-if="helpfulvote.details.length > 0" class="m-1 p-1 text-center font-extralight">
          Helpfulness Input
        </p>
        <section class="grid grid-cols-3">
          <div v-for="badge in helpfulnessVoteBadges" :key="badge.id">
            <div
              v-if="helpfulvote.details.length >= badge.threshold"
              @mouseover="handleHoverOrTouch(badge, $event)"
              @mouseleave="handleLeaveOrTouchEnd"
              @touchstart="handleHoverOrTouch(badge, $event)"
              @touchend="handleLeaveOrTouchEnd"
              class="border border-slate-400 bg-mist m-1 p-1 rounded-xl text-center font-extralight"
            >
              {{ badge.name }}
            </div>
            <div
              v-if="showToolTip"
              :style="{
                left: `${toolTipPosition.x}px`,
                top: `${toolTipPosition.y}px`,
              }"
              class="absolute transform -translate-x-1/2 bg-gray-800 text-white text-sm rounded p-2 shadow-lg"
            >
              {{ toolTipText }} helpfulness votes.
            </div>
          </div>
        </section>
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
      <!-- Commenting out the logout button until further notice-->
      <!-- <button
        class="border border-charcoal bg-frostWhite text-charcoal text-xl rounded p-3 m-3 hover:bg-charcoal hover:text-frostWhite"
        @click.prevent="handleSignOut"
      >
        Logout
      </button> -->
      <RouterLink
          class="block mx-auto w-32 bg-velvet border border-slate-400 text-frostWhite rounded-xl text-center p-5"
          to="/home"
          >Home →
      </RouterLink>
    </section>
  </div>
</template>
