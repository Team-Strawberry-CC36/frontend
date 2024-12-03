<script setup lang="ts">
import PlaceComponent from './HomeComponents/PlaceComponent.vue';
import SearchbarComponent from './HomeComponents/SearchbarComponent.vue';
import { ref } from 'vue';
import type IPlace from '@/utils/interfaces/Place';
import type { IPlaceEtiquetteVotes } from '@/utils/interfaces/PlaceEtiquetteVotes';
import HomeMap from '../testing-components/features/HomeMap.vue';
import AddEtiquetteVote from './HomeComponents/AddEtiquetteVote.vue';
import ReviewEtiquetteVote from './HomeComponents/ReviewEtiquetteVote.vue';
import { getAuth } from 'firebase/auth';
import apiService, { type IPlaceMarker } from "@/services/api";

const auth = getAuth();

// const mockEtiquetteVotesData: IPlaceEtiquetteVotes = {
//     message: "Lovely job!",
//     data: {
//       placeId: 1,
//       userId: auth.currentUser?.uid,
//       userHasVoted : true,
//       etiquetteVotes : [
//           { etiquetteId: 1, etiquetteType: 'Smoking', numberOfVotesForAllowed: 100, numberOfVotesForNotAllowed: 1000 },
//           { etiquetteId: 2, etiquetteType: 'Tattoos', numberOfVotesForAllowed: 400, numberOfVotesForNotAllowed: 700 },
//           { etiquetteId: 3, etiquetteType: 'Towels', numberOfVotesForAllowed: 1050, numberOfVotesForNotAllowed: 50},
//           { etiquetteId: 4, etiquetteType: 'Swimming', numberOfVotesForAllowed: 550, numberOfVotesForNotAllowed: 550},
//           { etiquetteId: 5, etiquetteType: 'Existential Dread', numberOfVotesForAllowed: 1100, numberOfVotesForNotAllowed: 0}
//       ],
//       usersVote: [
//           { etiquetteId: 1, etiquetteType: 'Smoking', vote: 'allowed' },
//           { etiquetteId: 2, etiquetteType: 'Tattoos', vote: undefined },
//           { etiquetteId: 3, etiquetteType: 'Towels', vote: 'not-allowed' },
//           { etiquetteId: 4, etiquetteType: 'Swimming', vote: undefined },
//           { etiquetteId: 5, etiquetteType: 'Existential Dread', vote: undefined },
//       ],
//     }

// };

const placeMarkers = ref<IPlaceMarker[]>([]);
const displayedPlace = ref<IPlace| null>(null);
const etiquetteVotesData = ref<IPlaceEtiquetteVotes | null>(null);


const searchQuery = ref('');
const apiUrl = import.meta.env.VITE_BACKEND_URL;

// Some functions for async
const getPlaceEtiquetteVotesData = async (place:IPlace) => {
  try {
    const response = await fetch(`${apiUrl}/moreTesting/places/${place.id}/votes`, {
      method: 'GET',
      credentials: 'include'
    });

    etiquetteVotesData.value = await response.json();
  } catch (error) {
    console.error("There was an error getting etiquette votes from the database: ", error);
  }
}

const getPlaceDetails = async (placeId: string) => {
  try {
    const response = await apiService.getPlace(placeId);
    displayedPlace.value = response.data.data;
  } catch (e) {
    console.error({
      message: "There was an error getting place details in homeView",
      error: e
    });
  }
}

// Handlers
const handleSearchResults = (event: { event: string, data: IPlaceMarker[] }) => {
  placeMarkers.value = event.data;
}

const handleMarkerClicked = (event: { event: string, data: string }) => {
  getPlaceDetails(event.data);
}

/**
 * Adding and reviewing etiquette
 */

const viewEtiquetteVote = ref<boolean>(false);
const viewReviewEtiquetteVote = ref<boolean>(false);
const viewPlaceDetails = ref<boolean>(true);

const toggleVoteView = () => {
  viewEtiquetteVote.value = !viewEtiquetteVote.value;
  viewPlaceDetails.value = !viewPlaceDetails.value;
};

const toggleReviewVoteView = () => {
  viewReviewEtiquetteVote.value = !viewReviewEtiquetteVote.value;
  viewPlaceDetails.value = !viewPlaceDetails.value;
}

</script>

<template>
  <main class="flex flex-col">
    <div class="">
      <SearchbarComponent @search="handleSearchResults"/>
    </div>
    <div class="flex flex-col lg:flex-row p-4 w-full lg:w-screen bg-mist">
      <HomeMap style="height: 600px;" :data="placeMarkers" :search-query="searchQuery" @map-marker-clicked="handleMarkerClicked"/>
      <div v-if="displayedPlace"> <!-- v-if="displayedPlace" put back in div after testing -->
        <h1>Rendering data! {{ displayedPlace }}</h1>
        <PlaceComponent
          :data="displayedPlace"
          :etiquetteVotesData="etiquetteVotesData"
          v-if="viewPlaceDetails"
          @show-add-vote="toggleVoteView"
          @show-review-vote="toggleReviewVoteView"
        />
        <AddEtiquetteVote
          v-if="viewEtiquetteVote"
          :etiquetteVotesData="etiquetteVotesData"
          @close-add-vote="toggleVoteView" />
        <!-- Add a component to review your vote -->
         <ReviewEtiquetteVote
          v-if="viewReviewEtiquetteVote"
          :etiquetteVotesData="etiquetteVotesData"
          @close-review-vote="toggleReviewVoteView"
         />
      </div>
    </div>
  </main>
</template>

