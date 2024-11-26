<script setup lang="ts">
    import type Place from '@/utils/interfaces/Place';
    import type { ExperienceType } from '@/utils/interfaces/Place';
    import { ref, computed } from 'vue';

    const { placeDetails } = defineProps<{
        placeDetails: Place;
    }>();

    // experienceTypes must be taken from Place -> Experience -> ExperienceType
    // and add to array only if not contained in the array
    const experienceTypes: ExperienceType[] = ["mango", "cherry", "banana", "apple"];
    const selectedFilter = ref<ExperienceType | "">("");

    // Filter experiences based on experienceType
    const filteredExperiences = computed(() => {
        return selectedFilter.value
            ? placeDetails.experiences.filter(
                (experience) => experience.experienceType === selectedFilter.value
            ) : placeDetails.experiences
    });

    const addExperience = () => {
        alert("Add Experience functionality coming soon!");
    };

</script>

<template>
    <div>
        <section>
            <!-- Place Name + add Experiences button-->
             <h1>{{ placeDetails.name }}</h1>
             <button @click="addExperience">Add Experience</button>
        </section>
        <section>
            <!-- Filter Experiences section -->
             <div>
                <label for="filter">Filter by Type of Experience:</label>
                <select id="filter" v-model="selectedFilter">
                    <option value="">All</option>
                    <option v-for="type in experienceTypes" :key="type" :value="type">
                        {{ type }}
                    </option>
                </select>
             </div>
        </section>
        <section>
            <!-- Repeated divs of experiences -->
             <div v-for="experience in filteredExperiences" :key="experience.id">
                <span>A person's username should be associated with the experience. Currently only user.id is available.</span>
                <span>Experience interface does not have a date visited, just a date created in metadata</span>
                <p>Visted: {{ experience.metadata.createdAt }}</p>
                <p>No etiquette directly associated with experience. Does the etiquette array correspond directly with the experiences array in placeDetails?</p>
                <h2>{{ experience.experience }}</h2>
             </div>
        </section>
    </div>
</template>