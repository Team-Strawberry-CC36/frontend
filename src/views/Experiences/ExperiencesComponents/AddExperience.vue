<script setup lang="ts">
import { ref } from 'vue';
import { usePlaceStore } from '@/stores/PlaceStore';
import type { IEtiquettePerPlace } from '@/utils/interfaces/Etiquette';
import apiService from '@/services/api.service';
import { useToast } from 'vue-toastification';
import { useLoadingStore } from '@/stores/LoadingStore';

const apiUrl = import.meta.env.VITE_BACKEND_URL;
console.log(apiUrl);

const place = usePlaceStore();
const load = useLoadingStore();

const toast = useToast();

const emit = defineEmits(['toggleAddExperience']);

const handleToggleAddExperience = () => {
  emit('toggleAddExperience');
};

interface ExperiencePackage {
  etiquette: IEtiquettePerPlace[];
  selectedEtiquette: number[];
  experienceText: string;
  experiences: string;
  dateVisited: Date | null;
}

const experiencePackage: ExperiencePackage = {
  etiquette: place.details.etiquettes || [],
  selectedEtiquette: [],
  experienceText: '',
  experiences: '',
  dateVisited: null,
};

// user sets the date they visited
const handleSetDateVisited = (event: Event) => {
  const target = event.target as HTMLInputElement;
  experiencePackage.dateVisited = new Date(target.value);
};

// Make sure user can only select up to 3 checkboxes
// const onCheck = (event: Event, etiquetteId: number) => {
//   const target = event.target as HTMLInputElement;

//   if (target.checked === false) {
//     experiencePackage.selectedEtiquette = experiencePackage.selectedEtiquette.filter(
//       (item) => item != etiquetteId
//     );
//   }

//   if (experiencePackage.selectedEtiquette.length === 3) {
//     target.checked = false;
//     return;
//   }

//   if (target.checked) {
//     experiencePackage.selectedEtiquette.push(etiquetteId);
//   }

// };

function canSubmit() {
  return (
    Array.isArray(experiencePackage.selectedEtiquette) &&
    experiencePackage.selectedEtiquette.length > 0 &&
    typeof experiencePackage.experienceText === 'string' &&
    experiencePackage.experienceText.trim().length > 0 &&
    experiencePackage.dateVisited !== null
  );
}

function resetForm() {
  experiencePackage.selectedEtiquette = [];
  experiencePackage.experienceText = '';
}

const handleAddExperience = async () => {
  if (!canSubmit()) {
    toast.info("Please input all provided fields before submission.", {
      timeout: 5000
    })
    return;
  }
  try {
    load.loading = true;
    const formattedEtiquettes = experiencePackage.selectedEtiquette.map((item) => {
      return {
        etiquette_id: item,
      };
    });
    const response = await apiService.createExperience(place.details.id, {
      etiquetteSelected: formattedEtiquettes,
      dateVisited: experiencePackage.dateVisited.toISOString(),
      experience: experiencePackage.experienceText,
    });

    if (response.status === 201) {
      resetForm();
      handleToggleAddExperience();
      load.loading = false;
      toast.success("Thank you for sharing your experience!", {
        timeout: 3000
      })
      // add to pinia to recent experience added
      console.log('inserted!');
    } else {
      resetForm();
      load.loading = false;
      toast.error('Failed to post experience.', {
        timeout: 3000,
      });
      // handleToggleAddExperience();
      throw 'There was an error!';
    }
  } catch (error) {
    load.loading = false;
    toast.error("Something unexpected happened.", {
      timeout: 3000
    })
    console.error(error);
  }
};

const isDropdownOpen = ref(false);

// Function to handle checkbox changes
const onCheck = (event: Event, id: number) => {
  const target = event.target as HTMLInputElement;
  const { checked } = target;

  if (checked) {
    if (experiencePackage.selectedEtiquette.length < 3) {
      experiencePackage.selectedEtiquette.push(id);
    } else {
      // Prevent checkbox from being checked if the limit is reached
      event.preventDefault();
      target.checked = false;
      toast.info('You can only select up to 3 etiquette options.', {
        timeout: 3000,
      });
    }
  } else {
    const index = experiencePackage.selectedEtiquette.indexOf(id);
    if (index > -1) {
      experiencePackage.selectedEtiquette.splice(index, 1);
    }
  }
};
</script>

<template>
  <div
    class="sm:w-1/2 w-full sm:h-fit h-screen sm:border border-slate-400 sm:m-3 p-3 overflow-hidden sm:rounded-xl shadow-2xl bg-frostWhite"
  >
    <section class="flex flex-row justify-between m-3">
      <!-- Place Name + add Experiences button-->
      <h1 class="text-3xl">{{ place.details.name }}</h1>
    </section>

    <section>
      <!-- Select Etiquette section with checkboxes -->
      <div class="flex flex-row m-3">
        <label for="etiquette" class="basis-2/3 text-xl font-extralight w-4/5 sm:3/4"
          >Select up to 3 etiquettes to discuss:</label
        >
        <!-- Dropdown Toggle Button -->
        <div class="basis-1/3">
          <button
            class="border border-slate-400 px-4 py-2 rounded-lg bg-white text-sm"
            @click="isDropdownOpen = !isDropdownOpen"
          >
            {{
              experiencePackage.selectedEtiquette.length
                ? `${experiencePackage.selectedEtiquette.length} selected`
                : 'Select Etiquette'
            }}
          </button>
          <!-- Dropdown Content -->
          <div
            v-if="isDropdownOpen"
            class="absolute mt-2 w-fit border border-slate-400 bg-white shadow-lg rounded-lg z-10"
          >
            <div
              class="flex items-center px-4 py-2 hover:bg-gray-100"
              v-for="etiquette in experiencePackage.etiquette"
              :key="etiquette.id"
            >
              <input
                type="checkbox"
                :id="etiquette.label"
                :value="etiquette.label"
                :checked="experiencePackage.selectedEtiquette.includes(etiquette.id)"
                @change="onCheck($event, etiquette.id)"
                class="mr-2"
                :disabled="
                  !experiencePackage.selectedEtiquette.includes(etiquette.id) &&
                  experiencePackage.selectedEtiquette.length >= 3
                "
              />
              <label :for="etiquette.label" class="text-sm">{{ etiquette.label }}</label>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <!-- Date visited selection -->
      <div class="flex flex-row flex-1 justify-center m-3">
        <label class="mr-3" for="date_visited">Date visited:</label>
        <input type="date" id="date_visited" name="date_visited" @change="handleSetDateVisited" />
      </div>
    </section>

    <section class="flex font-light justify-center h-1/2 lg:h-80 mb-3">
      <textarea
        v-model="experiencePackage.experienceText"
        placeholder="Share your experience"
        rows="5"
        cols="30"
        class="resize-none p-3 rounded-2xl w-full"
      ></textarea>
    </section>

    <section class="flex flex-row font-extralight justify-end">
      <!-- Post and cancel buttons -->
      <button
        class="mx-5 border-velvet border p-2 rounded-xl text-sm hover:bg-velvet hover:text-white"
        @click="handleAddExperience"
      >
        Post
      </button>
      <button
        class="border-velvet border p-2 rounded-xl text-sm hover:bg-velvet hover:text-white"
        @click="handleToggleAddExperience"
      >
        Cancel
      </button>
    </section>
  </div>
</template>
