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

// Function to fetch all helpfulness votes from the user
const retrieveVote = async () => {
  try {
    const response = await apiService.retrieveHelpfulnessVote();

    if (response.status === 200) {
      helpfulvote.clear();
      helpfulvote.update(response.data.data);
    } else {
      toast.error('An error occured while retrieving user information.', {
        timeout: 3000,
      });
      throw 'An error an occured while retrieving helpfulness vote data.';
    }
  } catch (error) {
    toast.error('Something unexpected happened.', {
      timeout: 3000,
    });
    console.error(error);
  }
};

retrieveVote();
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
    type: 'experiences',
    threshold: 5,
    image:
      'https://cdn-icons-png.freepik.com/256/9288/9288294.png?ga=GA1.1.1632838173.1733732668&semt=ais_hybrid',
  },
  {
    id: 2,
    name: '探検家 Tankenka',
    type: 'experiences',
    threshold: 10,
    image:
      'https://cdn-icons-png.freepik.com/256/15196/15196009.png?ga=GA1.1.1632838173.1733732668&semt=ais_hybrid',
  },
  {
    id: 3,
    name: '玄人 Kurouto',
    type: 'experiences',
    threshold: 20,
    image:
      'https://cdn-icons-png.freepik.com/256/16779/16779412.png?ga=GA1.1.1632838173.1733732668&semt=ais_hybrid',
  },
  {
    id: 4,
    name: '旅の達人 Tabi no Tatsujin',
    type: 'experiences',
    threshold: 35,
    image:
      'https://cdn-icons-png.freepik.com/256/8124/8124667.png?ga=GA1.1.1632838173.1733732668&semt=ais_hybrid',
  },
  {
    id: 5,
    name: '開拓者 Kaitakusha',
    type: 'experiences',
    threshold: 50,
    image:
      'https://cdn-icons-png.freepik.com/256/13747/13747917.png?ga=GA1.1.1632838173.1733732668&semt=ais_hybrid',
  },
  {
    id: 6,
    name: '日本の伝説 Nippon no Densetsu',
    type: 'experiences',
    threshold: 70,
    image:
      'https://cdn-icons-png.freepik.com/256/14861/14861072.png?ga=GA1.1.1632838173.1733732668&semt=ais_hybrid',
  },
];

const helpfulnessVoteBadges = [
  {
    id: 1,
    name: 'Thoughtful Reviewer',
    type: 'helpfulness votes',
    threshold: 10,
    image: 'https://cdn-icons-png.flaticon.com/128/5406/5406792.png',
  },
  {
    id: 2,
    name: 'Journey Evaluator',
    type: 'helpfulness votes',
    threshold: 20,
    image: 'https://cdn-icons-png.flaticon.com/128/4168/4168977.png',
  },
  {
    id: 3,
    name: 'Insightful Critic',
    type: 'helpfulness votes',
    threshold: 40,
    image: 'https://cdn-icons-png.flaticon.com/128/3135/3135728.png',
  },
  {
    id: 4,
    name: 'Seasoned Advisor',
    type: 'helpfulness votes',
    threshold: 80,
    image: 'https://cdn-icons-png.flaticon.com/128/2583/2583264.png',
  },
  {
    id: 5,
    name: 'Travel Guru',
    type: 'helpfulness votes',
    threshold: 160,
    image: 'https://cdn-icons-png.flaticon.com/128/4859/4859854.png',
  },
  {
    id: 6,
    name: 'Critic Extraordinaire',
    type: 'helpfulness votes',
    threshold: 320,
    image: 'https://cdn-icons-png.flaticon.com/128/9319/9319106.png',
  },
];

// Tooltip state
const showToolTip = ref<boolean>(false);
const toolTipText = ref<string>('');
const toolTipPosition = ref<{ x: number; y: number }>({ x: 0, y: 0 });

const handleHoverOrTouch = (
  badge: { id: number; name: string; type: string; threshold: number },
  event: MouseEvent | TouchEvent,
) => {
  showToolTip.value = true;
  toolTipText.value = 'Provided ' + badge.threshold + ' ' + badge.type;
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
              <img :src="badge.image" :alt="badge.name" class="w-12 h-12 mx-auto" />
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
              {{ toolTipText }}
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
              {{ toolTipText }}
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
