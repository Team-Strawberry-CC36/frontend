<script setup lang="ts">
import PhotosComponent from '@/views/Home/HomeComponents/PhotosComponent.vue';
import { onMounted, onUnmounted } from 'vue';
import { ref, computed, defineEmits } from 'vue';
import { getAuth } from 'firebase/auth';
import { usePlaceStore } from '@/stores/PlaceStore';
import { useExperienceVoteStore } from '@/stores/ExperienceVoteStore';
import apiService from '@/services/api.service';
import { useToast } from 'vue-toastification';
import type IExperience from '@/utils/interfaces/Experience';

const place = usePlaceStore();

const votes = useExperienceVoteStore();

const auth = getAuth();

const toast = useToast();

const emit = defineEmits(['toggleAddExperience']);

// Hooks
onMounted(() => {
  retrieveVote();
});

// Requestes to api
// Function to fetch all votes for a given experience ID
const retrieveVote = async () => {
  try {
    const response = await apiService.retrieveHelpfulnessVote();

    if (response.status === 200) {
      votes.clear();
      votes.update(response.data.data);
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

// unique etiquettes from all the experiences
const uniqueEtiquettes = new Set<string>();
if (typeof place.details.experiences !== 'undefined') {
  place.details.experiences.forEach((experience) => {
    experience.etiquettes.forEach((etiquette) => {
      uniqueEtiquettes.add(etiquette.label);
    });
  });
}

// --- Sorting section
const etiquetteTypes: string[] = Array.from(uniqueEtiquettes);
const selectedFilter = ref<string | ''>('');

// Filter experiences based on experienceType
const filteredExperiences = computed(() => {
  if (place.details.experiences) {
    // Filters based on etiquette selection
    const filtered = selectedFilter.value
      ? place.details.experiences.filter((experience) =>
          experience.etiquettes.some((etiquette) => etiquette.label === selectedFilter.value),
        )
      : place.details.experiences;
    // arranges experiences based on helpfulness score in descending order
    return filtered.sort((a, b) => b.helpfulness - a.helpfulness);
  } else {
    return [];
  }
});

// Emit click event to parent component to toggle the view
const handleAddExperience = () => {
  emit('toggleAddExperience');
};

// Function to check if the vote exists
const checkExistingVote = (exid: number) => {
  return votes.details.some((vote) => vote.experience_id === exid);
};

// Function to find the vote ID with a given experience ID
const findVoteId = (exid: number) => {
  return votes.details.find((vote) => vote.experience_id === exid);
};

// Checks vote data for pretty button functions
const isUpvote = (exid: number) => {
  const vote = findVoteId(exid);
  return vote && vote.helpfulness === 'up'; // Ensure it exists and is an upvote
};

const isDownvote = (exid: number) => {
  const vote = findVoteId(exid);
  return vote && vote.helpfulness === 'down'; // Ensure it exists and is a downvote
};

// Handles the addition, editing, and deletion of votes
const handleVote = async (exid: number, vote: string, experience: IExperience) => {
  // If user is logged in and the vote does not exist, add vote
  if (auth.currentUser && !checkExistingVote(exid) && vote) {
    try {
      const response = await apiService.addHelpfulnessVote(exid, vote);

      if (response.status === 201) {
        experience.helpfulness++;
        console.log('Vote posted!');
      } else {
        toast.error('An error occured while posting your helpfulness vote.', {
          timeout: 3000,
        });
        throw 'An error an occured while posting helpfulness vote data.';
      }
    } catch (error) {
      console.error(error);
    }
    // if the user is logged in and the vote does exist...
  } else if (auth.currentUser && checkExistingVote(exid) && vote) {
    // find the vote to deal with
    const voteToHandle = findVoteId(exid);
    // if the vote info is the same, delete the vote
    if (voteToHandle?.helpfulness === vote) {
      try {
        const response = await apiService.deleteHelpfulnessVote(exid, voteToHandle.vote_id);

        if (response.status === 201) {
          experience.helpfulness--;
          console.log('Vote deleted!');
        } else {
          toast.error('An error occured while removing your helpfulness vote.', {
            timeout: 3000,
          });
          throw 'An error an occured while deleting helpfulness vote data.';
        }
      } catch (error) {
        console.error(error);
      }
      // if the vote info is not the same, edit it
    } else {
      try {
        const response = await apiService.editHelpfulnessVote(exid, voteToHandle?.vote_id, vote);

        if (response.status === 201) {
          if (vote === 'up') {
            experience.helpfulness++;
          } else {
            experience.helpfulness--;
          }
          console.log('Vote edited!');
        } else {
          toast.error('An error occured while changing your helpfulness vote.', {
            timeout: 3000,
          });
          throw 'An error an occured while editing helpfulness vote data.';
        }
      } catch (error) {
        console.error(error);
      }
    }
    // other errors indicate user might not be logged in
  } else {
    console.log('User not logged in.');
  }
};

// async call to handle before retrieving
const handleThenRetrieveVote = async (exid: number, vote: string, experience: IExperience) => {
  await handleVote(exid, vote, experience); // Wait for handleVote to complete
  retrieveVote(); // Only execute after handleVote is done
};

// Mobile detection code purely just to change the add experience button into a small +
// Reactive property to track mobile view
const isMobileView = ref(window.innerWidth < 640);

// Listener to update `isMobileView` based on window size
const updateView = () => {
  isMobileView.value = window.innerWidth < 640;
};

// Add event listeners for responsive behavior
onMounted(() => {
  window.addEventListener('resize', updateView);
});
onUnmounted(() => {
  window.removeEventListener('resize', updateView);
});

//Date formatter
const formatDate = (date: Date) => {
  if (!date) return ''; // Handle null or undefined dates
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};
</script>

<template>
  <div
    class="sm:w-1/2 h-fit sm:border border-slate-400 sm:m-3 sm:rounded-xl shadow-2xl bg-frostWhite"
  >
    <section class="flex flex-row justify-between m-3">
      <!-- Place Name + add Experiences button-->
      <h1 class="text-3xl">{{ place.details.name }}</h1>
      <button
        v-if="!isMobileView"
        class="border-velvet border p-2 rounded-xl font-extralight text-sm hover:bg-velvet hover:text-white ease-in-out transition duration-300"
        @click="handleAddExperience"
      >
        + Tell us your experience
      </button>
    </section>
    <section class="h-[20vh]">
      <!-- Cover Photo -->
      <PhotosComponent />
      <!-- <div class="h-full w-full sm:border-t sm:border-b border-slate-400">
        <img
          v-if="place.details.photos?.length > 0 && place.details.photos"
          class="w-full h-full object-cover"
          :src="place.details.photos[Math.floor(Math.random() * 3)]"
          alt="place_photo"
        />
      </div> -->
    </section>
    <section class="flex justify-end">
      <button
        v-if="isMobileView"
        class="border-velvet border mx-3 mt-3 p-2 rounded-xl font-extralight text-sm hover:bg-velvet hover:text-white ease-in-out transition duration-300"
        @click="handleAddExperience"
      >
        + Tell us your experience
      </button>
    </section>
    <section>
      <!-- Filter Experiences section -->
      <div class="flex flex-row justify-around m-3">
        <label for="filter" class="text-xl font-extralight">Filter by Etiquette:</label>
        <select class="w-1/2 rounded-lg bg-mist p-1" id="filter" v-model="selectedFilter">
          <option value="">All</option>
          <option v-for="type in etiquetteTypes" :key="type" :value="type">
            {{ type }}
          </option>
        </select>
      </div>
    </section>
    <section class="font-light">
      <!-- Repeated divs of experiences -->
      <div
        class="m-3 p-3 bg-white rounded-lg"
        v-for="experience in filteredExperiences"
        :key="experience.id"
      >
        <div class="flex flex-row">
          <section class="basis-1/6 sm:basis-1/12 sm:p-2">
            <button
              class="block mb-1"
              :class="isUpvote(experience.id) ? 'fill-velvet' : 'fill-charcoal'"
              @click="handleThenRetrieveVote(experience.id, 'up', experience)"
            >
              <svg
                viewBox="0 0 256 256"
                id="Flat"
                xmlns="http://www.w3.org/2000/svg"
                class="h-full w-full hover:fill-velvet ease-in-out transition duration-300"
              >
                <path
                  d="M231.39062,123.06152A8,8,0,0,1,224,128H184v80a16.01833,16.01833,0,0,1-16,16H88a16.01833,16.01833,0,0,1-16-16V128H32a8.00065,8.00065,0,0,1-5.65723-13.65723l96-96a8.003,8.003,0,0,1,11.31446,0l96,96A8.002,8.002,0,0,1,231.39062,123.06152Z"
                />
              </svg>
            </button>
            <div class="text-center font-light sm:text-base text-sm">
              {{ experience.helpfulness }}
            </div>
            <button
              class="block"
              :class="isDownvote(experience.id) ? 'fill-velvet' : 'fill-charcoal'"
              @click="handleThenRetrieveVote(experience.id, 'down', experience)"
            >
              <svg
                viewBox="0 0 256 256"
                id="Flat"
                xmlns="http://www.w3.org/2000/svg"
                class="h-full w-full hover:fill-velvet ease-in-out transition duration-300"
              >
                <path
                  d="M229.65723,141.65723l-96,96a8.003,8.003,0,0,1-11.31446,0l-96-96A8.00065,8.00065,0,0,1,32,128H72V48A16.01833,16.01833,0,0,1,88,32h80a16.01833,16.01833,0,0,1,16,16v80h40a8.00066,8.00066,0,0,1,5.65723,13.65723Z"
                />
              </svg>
            </button>
          </section>
          <section class="basis-auto w-full">
            <div class="flex sm:flex-row flex-col m-1 justify-between text-xl">
              <h4>Etiquette</h4>
              <p class="text-velvet sm:text-lg text-sm lg:ml-5">{{ experience.etiquettes.map((e) => e.label).join(' | ') }}</p>
            </div>
            <div class="flex flex-col m-1 justify-between">
              <!-- <h4 class="text-xl">Experience</h4> -->
              <textarea name="" :value="experience.experience" rows="5" class="border border-slate-400 h-24 rounded-xl p-2 sm:text-base text-sm" readonly id=""></textarea>
              <!-- <p>{{ experience.experience }}</p> -->
            </div>
            <div class="text-xs justify-self-end m-1">
              <span
                >{{ experience.username }} visted here
                {{ formatDate(experience.dateVisited) }}</span
              >
            </div>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>
