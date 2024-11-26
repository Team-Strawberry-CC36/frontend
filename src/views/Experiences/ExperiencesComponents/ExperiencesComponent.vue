<script setup lang="ts">
    import { ref, computed, defineEmits } from 'vue';

    import { usePlaceStore } from '@/stores/PlaceStore';

    const place = usePlaceStore();

    //use mock state data
    place.useMock();    

    const emit = defineEmits(['toggleAddExperience']);

    // etiquettes must be taken from Place -> Experience -> Etiquette
    // and add to array only if not contained in the array
    // A set is good for this because sets only accept unique values
    const uniqueEtiquettes = new Set<string>();
    place.details.experiences.forEach((experience) => {
        uniqueEtiquettes.add(experience.etiquette);
    });
    const etiquetteTypes: string[] = Array.from(uniqueEtiquettes);
    const selectedFilter = ref<string | "">("");

    // Filter experiences based on experienceType
    const filteredExperiences = computed(() => {
        return selectedFilter.value
            ? place.details.experiences.filter(
                (experience) => experience.etiquette === selectedFilter.value
            ) : place.details.experiences
    });

    // Emit click event to parent component to toggle the view
    const handleAddExperience = () => {
        emit('toggleAddExperience');
    }

</script>

<template>
    <div class="sm:w-1/2 sm:h-fit h-full overflow-hidden sm:m-3 sm:rounded-xl shadow-2xl bg-frostWhite">
        <section class="flex flex-row justify-between m-3">
            <!-- Place Name + add Experiences button-->
             <h1 class="text-3xl">{{ place.details.name }}</h1>
             <button class="border-velvet border p-2 rounded-xl font-extralight text-sm hover:bg-velvet hover:text-white" @click="handleAddExperience">+ Tell us your experience
            </button>
        </section>
        <section class="h-80">
            <!-- Cover Photo -->
            <div class="h-full w-full">
                <img class="w-full h-full object-cover"  :src='place.details.photos[0].fileData' alt="place_photo" />
            </div>
        </section>
        
        <section>
            <!-- Filter Experiences section -->
             <div class="flex flex-row justify-around m-3">
                <label for="filter" class="text-xl font-extralight">Filter by Etiquette:</label>
                <select class="w-80 rounded-lg bg-mist p-1" id="filter" v-model="selectedFilter">
                    <option value="">All</option>
                    <option v-for="type in etiquetteTypes" :key="type" :value="type">
                        {{ type }}
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