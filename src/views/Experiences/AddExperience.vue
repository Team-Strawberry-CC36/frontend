<template>
  <div class="add-experiences-page">
    <section>
      <h1>{{ place.details.name }}</h1>
    </section>
    <label for="etiquette">Select Etiquette:</label>
    <select v-model="experiencePackage.selectedEtiquette" id="etiquette">
      <option
        v-for="etiquette in experiencePackage.etiquette"
        :key="experiencePackage.etiquette"
        :value="experiencePackage.etiquette"
      >
        {{ etiquette }}
      </option>
    </select>

    <textarea
      v-model="experiencePackage.experienceText"
      placeholder="Share your experience..."
      rows="5"
      cols="30"
    ></textarea>

    <button @click="addExperience" :disabled="!canSubmit">Post!</button>

    <div v-if="experiencePackage.experiences">
      <h2>Your Experiences</h2>
      <ul>
        <li v-for="(exp, index) in experiences" :key="index">
          <strong>Etiquette:</strong> {{ exp.etiquette }} <br />
          <strong>Content:</strong> {{ exp.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlaceStore } from '@/stores/PlaceStore';

const apiUrl = import.meta.env.VITE_BACKEND_URL;
console.log(apiUrl);

const place = usePlaceStore();

let experiencePackage = {
  etiquette: ['smoking', 'Tatoo'],
  selectedEtiquette: '',
  experienceText: '',
  experiences: '',
};

function canSubmit() {
  return experiencePackage.selectedEtiqutte && experiencePackage.experienceText.trim();
}
function resetForm() {
  experiencePackage.selectedEtiquette = '';
  experiencePackage.experienceText = '';
}

const addExperience = async () => {
  try {
    const response = await fetch(`${apiUrl}/places/${place.id}/experiences`, {
      method: 'POST',
      headers: {
        'Contents-type': 'application/json',
      },
      body: JSON.stringify({
        selectedEtiquette: experiencePackage.selectedEtiquette,
        experienceText: experiencePackage.experienceText,
      }),
    });
    resetForm();
  } catch (error) {
    console.error(error);
  }
};
</script>
