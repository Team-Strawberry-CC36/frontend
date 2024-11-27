<script setup lang="ts">
import { usePlaceStore } from '@/stores/PlaceStore';

const apiUrl = import.meta.env.VITE_BACKEND_URL;
console.log(apiUrl);

const place = usePlaceStore();

const emit = defineEmits(['toggleAddExperience']);

const handleAddExperience = () => {
  emit('toggleAddExperience');
};

const experiencePackage = {
  etiquette: ['Smoking', 'Tattoo'],
  selectedEtiquette: '',
  experienceText: '',
  experiences: '',
};

function canSubmit() {
  return experiencePackage.selectedEtiquette && experiencePackage.experienceText.trim();
}
function resetForm() {
  experiencePackage.selectedEtiquette = '';
  experiencePackage.experienceText = '';
}

// Will replace this with actual user's account ID from our authentication context
const userAccountId = 1;

const addExperience = async () => {
  try {
    await fetch(`${apiUrl}/places/${place.details.id}/experiences`, {
      method: 'POST',
      headers: {
        'Contents-type': 'application/json',
      },
      body: JSON.stringify({
        selectedEtiquette: experiencePackage.selectedEtiquette,
        experienceText: experiencePackage.experienceText,
        user_id: userAccountId,
      }),
    });
    resetForm();
  } catch (error) {
    console.error(error);
  }
};
</script>

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

    <button class="border-velvet border p-2 rounded-xl font-extralight text-sm hover:bg-velvet hover:text-white" @click="handleAddExperience">Cancel
    </button>
  </div>

  <!--  -->

  <div class="sm:w-1/2 sm:h-fit h-full overflow-hidden sm:m-3 sm:rounded-xl shadow-2xl bg-frostWhite">
        <section class="flex flex-row justify-between m-3">
            <!-- Place Name + add Experiences button-->
             <h1 class="text-3xl">{{ place.details.name }}</h1>
        </section>

        <section>
            <!-- Filter Experiences section -->
             <div class="flex flex-row justify-around m-3">
                <label for="etiquette" class="text-xl font-extralight">Select an etiquette:</label>
                <select class="w-80 rounded-lg bg-mist p-1" v-model="experiencePackage.selectedEtiquette" id="etiquette">
                    <option v-for="etiquette in experiencePackage.etiquette"
                    :key="experiencePackage.etiquette"
                    :value="experiencePackage.etiquette"
                  >
                    {{ etiquette }}
                  </option>
                </select>
             </div>
        </section>
        <section class="font-light">
            <!-- Repeated divs of experiences -->
             <div class="m-3 p-3 bg-white rounded-lg" v-for="experience in filteredExperiences" :key="experience.id">
                <div class="flex flex-row m-1 justify-between text-xl">
                    <h4>Etiquette </h4>
                    <p class="text-velvet">{{ experience.etiquette }}</p>
                </div>
                <div class="flex flex-col m-1 justify-between">
                    <h4 class="text-xl">Experience </h4>
                    <p>{{ experience.experience }}</p>
                </div>
                <div class="text-xs justify-self-end m-1">
                    <span>{{ experience.username }} visted here {{ experience.dateVisited }}</span>
                </div>
             </div>
        </section>
    </div>

</template>
