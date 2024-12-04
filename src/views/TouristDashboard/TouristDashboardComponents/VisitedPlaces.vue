<script setup lang="ts">
import { defineProps, reactive, ref } from 'vue';
import type { IPlaceVisited } from '@/utils/interfaces/PlacesVisited';
import apiService from '@/services/api';

const { placesVisitedByTourists } = defineProps<{ placesVisitedByTourists: IPlaceVisited[] | null }>();

// create a local reactive copy of the data to allow interaction locally such as sorting
const localPlacesVisited = reactive({
    data: [...(placesVisitedByTourists || [])],
});

// Initially sort places visited according to date, with latest first
localPlacesVisited?.data.sort((placeVisitedA, placeVisitedB) => {
    return placeVisitedB.dateVisited.getTime() - placeVisitedA.dateVisited.getTime();
});

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
}

// For editing the experience
const isEditing = ref<number | null>(null);
const temporaryExperienceInfo = ref<string | null>(null);

const editExperience = (id: number, currentExperience: string) => {
    isEditing.value  = id;
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

</script>

<template>
    <div class="flex flex-col w-full">
        <section class="p-3">
            <!-- A short header -->
            <p>According to you, you have visited these places!</p>
        </section>
        <section>
            <!-- Allow sorting in this section-->
             <div class="flex flex-row w-full ml-3">
                <div class="text-sm flex flex-row p-3">
                    <p>Sort by date:</p>
                    <button class="mr-1 ml-1 hover:cursor-pointer" @click="sortByDate('latest-first')">⬆</button>
                    <button class="mr-1 ml-1 hover:cursor-pointer" @click="sortByDate('latest-last')">⬇</button>
                </div>
                <div class="text-sm flex flex-row p-3">
                    <p>Sort by place type</p>
                    <button class="mr-1 ml-1 hover:cursor-pointer" @click="sortByType('ascending')">⬆</button>
                    <button class="mr-1 ml-1 hover:cursor-pointer" @click="sortByType('descending')">⬇</button>
                </div>

                <div class="text-sm flex flex-row p-3">
                    <p>Sort by place name</p>
                    <button class="mr-1 ml-1 hover:cursor-pointer" @click="sortByPlaceName('ascending')">⬆</button>
                    <button class="mr-1 ml-1 hover:cursor-pointer" @click="sortByPlaceName('descending')">⬇</button>
                </div>
                
             </div>
        </section>
        <section class="p-3">
            <!-- Main body of cards containing info -->
            <div 
                v-for="placeVisited in localPlacesVisited?.data"
                :key="placeVisited.experienceId"
                class="p-3 border border-velvet rounded-lg mt-3"
            >
                <h3 class="text-lg font-extralight">{{ placeVisited.placeName }} : {{ placeVisited.placeType }}</h3>
                <p class="text-sm font-bold">You visited here {{ placeVisited.dateVisited }}</p>
                
                <p class="text-lg font-bold mt-3">Your experience:</p>
                <hr class="w-full mb-3">
                <div class="flex flex-row items-start">
                    <!-- A form that is editable -->
                     <div v-if="isEditing === placeVisited.experienceId" class="flex flex-col w-full">
                        <textarea
                            v-model="placeVisited.experience"
                            class="p-2 h-32 border border-gray-300 rounded-lg"
                        ></textarea>
                        <div class="flex mt-2">
                            <button
                                class="border border-green-500 bg-green-100 p-1 rounded mr-2"
                                @click="saveExperience(placeVisited.experienceId, placeVisited.experience)"
                            >
                                Save
                            </button>
                            <button
                                class="border border-red-500 bg-red-100 p-1 rounded"
                                @click="cancelEditExperience()"
                            >
                                Cancel
                            </button>
                        </div>
                     </div>
                     <div v-else class="flex items-center">
                        <p class="text-lg font-thin mr-3"> {{ placeVisited.experience }}</p>
                        <button class="border border-velvet h-10 w-14 text-xs p-1 text-bold rounded mt-auto" @click="editExperience(placeVisited.experienceId, placeVisited.experience)">Edit</button>
                     </div>
                    
                    
                </div>
                
            </div>
        </section>
    </div>
    
</template>