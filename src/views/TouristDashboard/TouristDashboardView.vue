<script setup lang="ts">
    // import vue functions
    import { ref, computed } from 'vue';
    import { useRouter } from 'vue-router';
    // import child components
    import VisitedPlaces from './TouristDashboardComponents/VisitedPlaces.vue';
    // import types and interfaces needed
    import type { IPlaceVisited } from '@/utils/interfaces/PlacesVisited';
    // authorization
    import { getAuth } from 'firebase/auth';
    const auth = getAuth();
    // api route
    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    import apiService from "@/services/api";


    // Places visited by user
    const placesVisitedByUser = ref<IPlaceVisited[] | null>(null);
    // Mock data for places visited by user
    const mockPlacesVisitedByUser = {
        message: 'Well done!',
        data: [
            { placeId: 1, 
                placeName: 'Code Chrysalis Onsen', 
                placeType: 'onsen', 
                dateVisited: new Date('2024/11/12'), 
                experience: "Towels were provided. If you want to smoke, best smoke outside." ,
                experienceId: 1
            },
            { placeId: 2, 
                placeName: 'Code Chrysalis Shrine', 
                placeType: 'shrine', 
                dateVisited: new Date('2024/11/13'),
                experience: "Don't forget to wash your hands before entering. Owner was pretty strict about it. Take shoes off, too. And donate 5 yen or more when you pray.",
                experienceId: 2
            },
            { placeId: 3, 
                placeName: 'Code Chrysalis Restaurant', 
                placeType: 'restaurant', 
                dateVisited: new Date('2024/11/14'),
                experience: "It might be all you can eat, but try not to eat all the food in the restaurant. The owner looked worried when I ate so much!",
                experienceId: 3
            }
        ],
    };

    // database fetch requests for places visited
    const fetchPlacesVisitedByUser = async () => {
        // const response = await fetch(`${apiUrl}/dashboard/placesVisited`, {
        //     method: 'GET',
        //     credentials: 'include'
        // });
        // placesVisitedByUser.value = await response.json();
        const placesVisited= await apiService.getPlacesVisitedByUser();
        placesVisitedByUser.value = placesVisited.data.data;
    }
    fetchPlacesVisitedByUser(); // fetch the places visited by the user from the database

    // Link home
    const router = useRouter();
    const goToHome = () => {
        router.push("/home");
    }
</script>

<template>
    <div class="flex flex-col w-full">
        <section class="flex flex-row justify-between p-3">
            <!-- Header section -->
             <h1 class="text-3xl m-3">Dashboard</h1>
             <h1 class="text-3xl m-3">Username</h1>
        </section>
        <section class="p-3 justify-items-center">
            <!-- Section for badges -->
             <p class="m-3">Badges info in this section</p>
        </section>
        <section class="p-3 flex flex-row justify-between">
            <!-- Section listing places you visited and experiences contributed -->
             <VisitedPlaces 
                class="p-3"
                :placesVisitedByTourists="mockPlacesVisitedByUser.data"
            />
        </section>
        <section class="justify-items-center p-3">
            <!-- Section for buttons-->
            <button class="border border-velvet text-xl rounded  p-3 m-3 hover:bg-velvet hover:text-frostWhite" @click="goToHome">Search</button>
            <button class="border border-charcoal text-xl rounded p-3 m-3 hover:bg-charcoal hover:text-frostWhite">Logout</button>
        </section>
    </div>
    

</template>