<script setup lang="ts">
import { getAuth } from 'firebase/auth';
import { usePlaceStore } from '@/stores/PlaceStore';
import { computed } from 'vue';
import type { IEtiquettePerPlace } from '@/utils/interfaces/Etiquette';

const apiUrl = import.meta.env.VITE_BACKEND_URL;
console.log(apiUrl);

const auth = getAuth();

const place = usePlaceStore();

const emit = defineEmits(['toggleAddExperience']);

const handleAddExperience = () => {
  emit('toggleAddExperience');
};

let turtle = 'string';

interface ExperiencePackage {
  etiquette: IEtiquettePerPlace[];
  selectedEtiquette: string[];
  experienceText: string;
  experiences: string;
}

const experiencePackage: ExperiencePackage = {
  etiquette: place.details.etiquettes || [],
  selectedEtiquette: [],
  experienceText: '',
  experiences: '',
};

// Make sure user can only select up to 3 checkboxes
const onCheck = (event: Event, label: string) => {
  const target = event.target as HTMLInputElement;

  if (target.checked === false) {
    experiencePackage.selectedEtiquette = experiencePackage.selectedEtiquette.filter(
      (item) => item != label
    );
  }

  if (experiencePackage.selectedEtiquette.length === 3) {
    target.checked = false;
    return;
  }
  
  if (target.checked) {
    experiencePackage.selectedEtiquette.push(label);
  }

};

function canSubmit() {
  return experiencePackage.selectedEtiquette && experiencePackage.experienceText.trim();
}
function resetForm() {
  experiencePackage.selectedEtiquette = [];
  experiencePackage.experienceText = '';
}

const addExperience = async () => {
  const toSend = {
        selectedEtiquette: experiencePackage.selectedEtiquette,
        experienceText: experiencePackage.experienceText,
        user_id: auth.currentUser?.uid,
      };
      console.log(toSend);
  try {
    await fetch(`${apiUrl}/places/${place.details.id}/experiences`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(toSend),
    });
    resetForm();
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
            @change="onCheck($event, etiquette.label)"
            :checked="experiencePackage.selectedEtiquette.includes(etiquette.label)"
          />
          <label :for="etiquette.label">{{ etiquette.label }}</label><br>
        </div>
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
        @click="addExperience" :disabled="!canSubmit">Post</button>
      <button
        class="border-velvet border p-2 rounded-xl text-sm hover:bg-velvet hover:text-white"
        @click="handleAddExperience"
      >
        Cancel
      </button>
    </section>

    <div v-if="experiencePackage.experiences">
      <h2>Your Experiences</h2>
      <ul>
        <li v-for="(exp, index) in experiencePackage.experiences" :key="index">
          <strong>Etiquette:</strong> {{ exp.etiquette }} <br />
          <strong>Content:</strong> {{ exp.text }}
        </li>
      </ul>
    </div>
  </div>
</template>
