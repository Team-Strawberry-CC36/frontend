<script setup lang="ts">
import PlaceComponent from './HomeComponents/PlaceComponent.vue';
import SearchbarComponent from './HomeComponents/SearchbarComponent.vue';
import { ref } from 'vue';
import type IPlace from '@/utils/interfaces/Place';
import type { IPlaceEtiquetteVotes } from '@/utils/interfaces/PlaceEtiquetteVotes';
import HomeMap from './HomeComponents/HomeMap.vue';
import AddEtiquetteVote from './HomeComponents/AddEtiquetteVote.vue';
import ReviewEtiquetteVote from './HomeComponents/ReviewEtiquetteVote.vue';
import { getAuth } from 'firebase/auth';
import apiService, { type IPlaceMarker } from '@/services/api.service';
import { usePlaceStore } from '@/stores/PlaceStore';
import { useLoadingStore } from '@/stores/LoadingStore';
import type { EtiquetteStatus } from '@/utils/interfaces/Etiquette';
import { useToast } from 'vue-toastification';

const auth = getAuth();
const place = usePlaceStore();
const load = useLoadingStore();
const toast = useToast();

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
const etiquetteVotesData = ref<IPlaceEtiquetteVotes | null>(null);

// This is necessary to refresh the voting data, otherwise the placeId becomes the placeId from the database
// which is different from the googlePlaceId.
const googlePlaceId = ref<string | null>(null);

const searchQuery = ref('');
const apiUrl = import.meta.env.VITE_BACKEND_URL;

// Some functions for async
const getPlaceEtiquetteVotesData = async (placeId: string) => {
  const user = auth.currentUser;

  if (user) {
    const token = await user.getIdToken();
    const headers: Record<string, string> = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      };
    try {
      const response = await fetch(`${apiUrl}/moreTesting/places/${placeId}/votes`, {
        method: 'GET',
        headers,
      });
      etiquetteVotesData.value = await response.json();
      console.log("Data received back is: ", etiquetteVotesData.value);
      etiquetteVotesData.value?.data.usersVote.forEach(vote => {
        if (vote.vote) {
          const transformedVote = vote.vote.toLowerCase().replace(/_/g, '-');
          if (['allowed', 'not-allowed'].includes(transformedVote)) {
            vote.vote = transformedVote as EtiquetteStatus;
          } else {
            vote.vote = undefined;
          }
        }
      });
      console.log("Here is your etiquette votes data:", etiquetteVotesData.value);
    } catch (error) {
      console.error('There was an error getting etiquette votes from the database: ', error);
    }
  }
};

const getPlaceDetails = async (placeId: string, category: string) => {
  try {
    load.loading = true;
    const response = await apiService.getPlace(placeId, category);
    place.$patch({
      details: response.data.data,
    });

    const photosResponse = await apiService.fetchPhotos(response.data.data.id);

    place.updatePhotos(photosResponse.data.data);
    load.loading = false;
  } catch (e) {
    load.loading = false;
    toast.error("An error occured while retrieving place details.", {
      timeout: 3000
    })
    console.error({
      message: 'There was an error getting place details in homeView',
      error: e,
    });
  }
};

// Handlers
const handleSearchResults = (event: { event: string; data: IPlaceMarker[] }) => {
  placeMarkers.value = event.data;
};

const handleRefreshVotes = async () => {
  if (googlePlaceId.value) {
    await getPlaceEtiquetteVotesData(googlePlaceId.value);
  }
}

const handleMarkerClicked = (event: { event: string; data: IPlaceMarker }) => {
  console.log(event.data);
  // NOTE ! set a googlePlaceId variable?
  googlePlaceId.value = event.data.id;

  // 1. First get place details!
  getPlaceDetails(event.data.id, event.data.category)
    .then(() => {
    // 2. Then get etiquttes voting data
      getPlaceEtiquetteVotesData(event.data.id); // then change the type in this fetch request
    }).catch(() => {
      // [ ] Add error validation
      console.error("Ops! something happend in handleMarkerClicked")
    })
};

/**
 * Adding and reviewing etiquette
 */

const viewEtiquetteVote = ref<boolean>(false);
const viewReviewEtiquetteVote = ref<boolean>(false);
const viewPlaceDetails = ref<boolean>(true);

const toggleVoteView = () => {
  viewEtiquetteVote.value = !viewEtiquetteVote.value;
  console.log(viewEtiquetteVote.value);
  viewPlaceDetails.value = !viewPlaceDetails.value;
};

const toggleReviewVoteView = () => {
  viewReviewEtiquetteVote.value = !viewReviewEtiquetteVote.value;
  viewPlaceDetails.value = !viewPlaceDetails.value;
};

</script>

<template>
  <main class="flex flex-col">
    <div class="">
      <SearchbarComponent @search="handleSearchResults" />
    </div>
    <div class="flex flex-col lg:flex-row p-4 w-full lg:w-screen bg-mist">
      <HomeMap
        style="height: 600px"
        :data="placeMarkers"
        :search-query="searchQuery"
        @map-marker-clicked="handleMarkerClicked"
      />
      <div v-if="place.details">
        <!-- v-if="place.details" put back in div after testing -->
        <!-- <h1>Rendering data! {{ place.details }}</h1> -->
        <PlaceComponent
          :etiquetteVotesData="etiquetteVotesData"
          v-if="viewPlaceDetails && place.details.id > 0"
          @show-add-vote="toggleVoteView"
          @show-review-vote="toggleReviewVoteView"
        />
        <AddEtiquetteVote
          v-if="viewEtiquetteVote"
          :etiquetteVotesData="etiquetteVotesData"
          @close-add-vote="toggleVoteView"
          @refresh-votes-data="handleRefreshVotes"
        />
        <!-- Add a component to review your vote -->
        <ReviewEtiquetteVote
          v-if="viewReviewEtiquetteVote"
          :etiquetteVotesData="etiquetteVotesData"
          @close-review-vote="toggleReviewVoteView"
          @refresh-votes-data="handleRefreshVotes"
        />
      </div>
    </div>
  </main>
</template>
