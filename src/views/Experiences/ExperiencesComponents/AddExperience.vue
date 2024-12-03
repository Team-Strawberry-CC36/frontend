<script setup lang="ts">
import { getAuth } from 'firebase/auth';
import { usePlaceStore } from '@/stores/PlaceStore';
import type { IEtiquettePerPlace } from '@/utils/interfaces/Etiquette';
import apiService from "@/services/api";

const apiUrl = import.meta.env.VITE_BACKEND_URL;
console.log(apiUrl);

const place = usePlaceStore();

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
  dateVisited: null
};

// user sets the date they visited
const handleSetDateVisited = (event: Event) => {
  const target = event.target as HTMLInputElement;
  experiencePackage.dateVisited = new Date(target.value);
}

// Make sure user can only select up to 3 checkboxes
const onCheck = (event: Event, etiquetteId: number) => {
  const target = event.target as HTMLInputElement;

  if (target.checked === false) {
    experiencePackage.selectedEtiquette = experiencePackage.selectedEtiquette.filter(
      (item) => item != etiquetteId
    );
  }

  if (experiencePackage.selectedEtiquette.length === 3) {
    target.checked = false;
    return;
  }

  if (target.checked) {
    experiencePackage.selectedEtiquette.push(etiquetteId);
  }

};

function canSubmit() {
  return experiencePackage.selectedEtiquette && experiencePackage.experienceText.trim();
}
function resetForm() {
  experiencePackage.selectedEtiquette = [];
  experiencePackage.experienceText = '';
}

const handleAddExperience = async () => {
  try {
    const formattedEtiquettes = experiencePackage.etiquette.map((item) => {
      return {
        etiquette_id: item.id
      }
    })
    const response = await apiService.createExperience(place.details.id, {
      etiquetteSelected: formattedEtiquettes,
      dateVisited: new Date().toISOString(),
      experience: experiencePackage.experienceText,
    });

    if (response.status === 201) {
      resetForm();
      handleToggleAddExperience();
      // add to pinia to recent experience added
      console.log("inserted!");
    } else {
      resetForm();
      alert("ERROR!");
      // handleToggleAddExperience();
      throw "There was an error!";
    }
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div
    class="sm:w-1/2 w-full sm:h-fit h-full sm:border border-slate-400 p-3 overflow-hidden sm:rounded-xl shadow-2xl bg-frostWhite"
  >
    <section class="flex flex-row justify-between m-3">
      <!-- Place Name + add Experiences button-->
      <h1 class="text-3xl">{{ place.details.name }}</h1>
    </section>

    <section>
      <!-- Select Etiquette section with checkboxes -->
      <div class="flex flex-row flex-1 justify-around m-3">
        <label for="etiquette" class="text-xl font-extralight">Select up to 3 etiquettes to discuss:</label>
        <div v-for="etiquette in experiencePackage.etiquette" :key="etiquette.id">
          <input
            type="checkbox"
            :id="etiquette.label"
            :value="etiquette.label"
            @change="onCheck($event, etiquette.id)"
            :checked="experiencePackage.selectedEtiquette.includes(etiquette.label)"
          />
          <label :for="etiquette.label">{{ etiquette.label }}</label><br>
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
        @click="handleAddExperience" :disabled="!canSubmit">Post</button>
      <button
        class="border-velvet border p-2 rounded-xl text-sm hover:bg-velvet hover:text-white"
        @click="handleToggleAddExperience"
      >
        Cancel
      </button>
    </section>

    <!-- <div v-if="experiencePackage.experiences">
      <h2>Your Experiences</h2>
      <ul>
        <li v-for="(exp, index) in experiencePackage.experiences" :key="index">
          <strong>Etiquette:</strong> {{ exp.etiquette }} <br />
          <strong>Content:</strong> {{ exp.text }}
        </li>
      </ul>
    </div> -->
  </div>
</template>
