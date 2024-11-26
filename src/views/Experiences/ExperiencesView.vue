<script setup lang="ts">
    import ExperiencesComponent from './ExperiencesComponents/ExperiencesComponent.vue';
    //import AddExperiences from './ExperiencesComponents/AddExperience.vue';
    import { ref } from 'vue';

    // State for showing the AddExperienceComponent
    const showAddExperience = ref(false);

    // Method to toggle the state
    const toggleAddExperience = () => {
        showAddExperience.value = !showAddExperience.value;
    };

</script>

<template>
  <main class="flex flex-col items-center h-fit w-full bg-mist">
    <ExperiencesComponent
        @toggleAddExperience="toggleAddExperience"
    />
  </main>
</template>
