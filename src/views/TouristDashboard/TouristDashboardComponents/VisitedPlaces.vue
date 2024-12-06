<script setup lang="ts">
import { ref, defineProps, reactive, watch } from 'vue';
import type { IPlaceVisitedAlias } from '@/utils/interfaces/PlacesVisited';
import apiService from '@/services/api.service';
import { useToast } from 'vue-toastification';

const toast = useToast();
const { placesVisitedByTourists } = defineProps<{ placesVisitedByTourists: IPlaceVisitedAlias[] }>();

// create a local reactive copy of the data to allow interaction locally such as sorting
const localPlacesVisited = reactive({
  data: [...(placesVisitedByTourists || [])],
});

// Change local placed in prop change
watch(() => placesVisitedByTourists, (value) => {
  localPlacesVisited.data = value
})


// Initially sort places visited according to date, with latest first
localPlacesVisited.data.sort((placeVisitedA, placeVisitedB) => {
  return placeVisitedB.dateVisited.getTime() - placeVisitedA.dateVisited.getTime();
});

const selectedSorting = ref("date-latest"); // Default sorting value

const handleSortingChange = () => {
  switch (selectedSorting.value) {
    case "date-latest":
      sortByDate("latest-first");
      break;
    case "date-oldest":
      sortByDate("latest-last");
      break;
    case "type-asc":
      sortByType("ascending");
      break;
    case "type-desc":
      sortByType("descending");
      break;
    case "name-asc":
      sortByPlaceName("ascending");
      break;
    case "name-desc":
      sortByPlaceName("descending");
      break;
    default:
      console.warn("Unknown sorting option selected:", selectedSorting.value);
  }
};

const sortByDate = (order: string) => {
  if (!localPlacesVisited?.data) return;

  const sortedArray = [...localPlacesVisited.data].sort((placeVisitedA, placeVisitedB) => {
    if (order === 'latest-first') {
      return placeVisitedB.dateVisited.getTime() - placeVisitedA.dateVisited.getTime();
    }

    if (order === 'latest-last') {
      return placeVisitedA.dateVisited.getTime() - placeVisitedB.dateVisited.getTime();
    }

    return 0;
  });

  localPlacesVisited.data = sortedArray;
};

const sortByType = (order: string) => {
  if (!localPlacesVisited?.data) return;

  const sortedArray = [...localPlacesVisited.data].sort((placeVisitedA, placeVisitedB) => {
    if (order === 'ascending') {
      return placeVisitedA.placeType.localeCompare(placeVisitedB.placeType);
    }

    if (order === 'descending') {
      return placeVisitedB.placeType.localeCompare(placeVisitedA.placeType);
    }

    return 0;
  });
  localPlacesVisited.data = sortedArray;
};

const sortByPlaceName = (order: string) => {
  if (!localPlacesVisited?.data) return;

  const sortedArray = [...localPlacesVisited.data].sort((placeVisitedA, placeVisitedB) => {
    if (order === 'ascending') {
      return placeVisitedA.placeName.localeCompare(placeVisitedB.placeName);
    }

    if (order === 'descending') {
      return placeVisitedB.placeName.localeCompare(placeVisitedA.placeName);
    }
    return 0;
  });
  localPlacesVisited.data = sortedArray;
};

// For editing the experience
const isEditing = ref<number | null>(null);
const temporaryExperienceInfo = ref<string | null>(null);

const editExperience = (id: number, currentExperience: string) => {
  isEditing.value = id;
  temporaryExperienceInfo.value = currentExperience;
};

const saveExperience = (expId: number, newExperience: string) => {
  const place = localPlacesVisited.data.find((item) => item.experienceId === expId);
  if (place) {
    place.experience = newExperience;
  }
  apiService.updateExperience(expId, newExperience);
  isEditing.value = null; // exit the editing mode
};

const cancelEditExperience = () => {
  const place = localPlacesVisited.data.find((item) => item.experienceId === isEditing.value);
  if (place && temporaryExperienceInfo.value !== null) {
    place.experience = temporaryExperienceInfo.value;
  }
  isEditing.value = null;
  temporaryExperienceInfo.value = null;
};

// For deleting the experience
const deleteExperience = async (expId: number) => {
  const placeIndex = localPlacesVisited.data.findIndex((item) => item.experienceId === expId);

  if (placeIndex === -1) {
    toast.error("The experience you are trying to delete was not found.");
    return;
  }

  try {
    await apiService.deleteExperience(expId);
    localPlacesVisited.data.splice(placeIndex, 1);
    toast.info("Experience deleted.")
  } catch (error) {
    toast.error("An error occured while deleting your experience.")
    console.log("Error deleting experience:", error)
  }
}

</script>

<template>
  <div class="flex flex-col w-full">
    <section class="pb-3 text-center text-xl">
      <!-- A short header -->
      <p>You have shared the following experiences!</p>
    </section>
    <section>
      <!-- Allow sorting in this section-->

      <!-- <div class="flex flex-row w-full ml-3">
        <div class="text-sm flex flex-row p-3">
          <p>Sort by date:</p>
          <button class="mr-1 ml-1 hover:cursor-pointer" @click="sortByDate('latest-first')">
            ⬆
          </button>
          <button class="mr-1 ml-1 hover:cursor-pointer" @click="sortByDate('latest-last')">
            ⬇
          </button>
        </div>
        <div class="text-sm flex flex-row p-3">
          <p>Sort by place type</p>
          <button class="mr-1 ml-1 hover:cursor-pointer" @click="sortByType('ascending')">
            ⬆
          </button>
          <button class="mr-1 ml-1 hover:cursor-pointer" @click="sortByType('descending')">
            ⬇
          </button>
        </div>

        <div class="text-sm flex flex-row p-3">
          <p>Sort by place name</p>
          <button class="mr-1 ml-1 hover:cursor-pointer" @click="sortByPlaceName('ascending')">
            ⬆
          </button>
          <button class="mr-1 ml-1 hover:cursor-pointer" @click="sortByPlaceName('descending')">
            ⬇
          </button>
        </div>
      </div> -->

      <div class="flex flex-row w-full ml-3">
        <div class="text-sm flex flex-row p-3 items-center">
          <label for="sorting-method" class="mr-2">Sort by:</label>
          <div>
            <select
              id="sorting-method"
              v-model="selectedSorting"
              @change="handleSortingChange"
              class="border border-gray-300 rounded-md p-2 pr-8 focus:outline-none"
            >
              <option value="date-latest">Date (Latest First)</option>
              <option value="date-oldest">Date (Oldest First)</option>
              <option value="type-asc">Place Type (Ascending)</option>
              <option value="type-desc">Place Type (Descending)</option>
              <option value="name-asc">Place Name (Ascending)</option>
              <option value="name-desc">Place Name (Descending)</option>
            </select>
          </div>
        </div>
      </div>



    </section>
    <section class="p-3">
      <!-- Main body of cards containing info -->
      <div
        v-for="placeVisited in localPlacesVisited?.data"
        :key="placeVisited.experienceId"
        class="p-3 bg-frostWhite border border-slate-400 rounded-lg mt-3"
      >
        <h3 class="text-lg font-extralight">
          {{ placeVisited.placeName }} : {{ placeVisited.placeType }}
        </h3>
        <p class="text-sm font-bold">You visited here {{ placeVisited.dateVisited }}</p>

        <p class="border-b border-slate-400 text-lg font-bold mt-2 mb-3 pb-2">Your experience:</p>
        <!-- <hr class="w-full mb-3" /> -->
        <div class="flex flex-row items-start">
          <!-- A form that is editable -->
          <div v-if="isEditing === placeVisited.experienceId" class="flex flex-col w-full">
            <textarea
              v-model="placeVisited.experience"
              class="p-2 h-32 border border-gray-300 rounded-lg"
            ></textarea>
            <div class="flex mt-2 justify-center">
              <button
                class="border border-green-500 bg-green-100 p-1 rounded mr-2 hover:animate-pulse"
                @click="saveExperience(placeVisited.experienceId, placeVisited.experience)"
              >
                Save
              </button>
              <button
                class="border border-red-500 bg-red-100 p-1 rounded hover:animate-pulse"
                @click="cancelEditExperience()"
              >
                Cancel
              </button>
            </div>
          </div>
          <!-- EDITING COMPONENT -->
          <div v-else class="flex items-center">
            <p class="text-lg font-thin mr-3">{{ placeVisited.experience }}</p>
            <button
              class="border border-slate-400 bg-velvet text-frostWhite hover:animate-pulse h-10 w-14 text-xs mx-1 p-1 text-bold rounded mt-auto"
              @click="editExperience(placeVisited.experienceId, placeVisited.experience)"
            >
              Edit
            </button>
            <button
              class="border border-slate-400 bg-velvet text-frostWhite hover:animate-pulse h-10 w-14 text-xs mx-1 p-1 text-bold rounded mt-auto"
              @click="deleteExperience(placeVisited.experienceId)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
