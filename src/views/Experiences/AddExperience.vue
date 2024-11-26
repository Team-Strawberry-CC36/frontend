<template>
    <div class="add-experiences-page">
        <section>
         <h1>{{ placeDetails.name }}</h1>
        </section>
      <Dropdown -->
      <label for="etiquette">Select Etiquette:</label>
      <select v-model="selectedEtgiquette" id="etiquette">
        <option v-for="etiquette in etiquettes" :key="etiquette" :value="etiquette">
          {{ etiquette }}
        </option>
      </select>
      
      <!-- Experience Text Form -->
      <textarea
        v-model="experienceText"
        placeholder="Share your experience..."
        rows="5"
        cols="30"
      ></textarea>
      
      <!-- Submit Button -->
      <button @click="addExperience" :disabled="!canSubmit">
        Post!
      </button>
      
      <!-- Posted Experiences -->
      <div v-if="experiences.length">
        <h2>Your Experiences</h2>
        <ul>
          <li v-for="(exp, index) in experiences" :key="index">
            <strong>Etiquette:</strong> {{ exp.etiquette }} <br>
            <strong>Content:</strong> {{ exp.text }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "AddExperiencesPage",
    data() {
      return {
        etiquette: [],
        selectedEtiquette: "",
        experienceText: "",
        experiences: "",
      };
    },
    computed: {
      canSubmit() {
        return this.selectedEtiqutte && this.experienceText.trim();
      },
    },
    methods: {
      addExperience() {
        this.experiences.push({
          etiquette: this.selectedEtiquette,
          text: this.experienceText,
        });
  
        // Reset the form
        this.selectedEtiquette = "";
        this.experienceText = "";
      },
    },
  };
  </script>

  <template>
    <ExperiencesPage />
  </template>
  
  </script> -->
  
  
  
  
  
  
  
  