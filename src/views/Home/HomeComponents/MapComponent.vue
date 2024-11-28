<script setup lang="ts">
//import { Loader } from "@googlemaps/js-api-loader";
import { usePlaceStore } from '@/stores/PlaceStore';
const place = usePlaceStore();
place.useMock();

const googleAPIKey = import.meta.env.VITE_GOOGLE_KEY;
// export default {

//     // mounted() {
//     //     const loader = new Loader({
//     //         apiKey: googleAPIKey,
//     //         version: "weekly"
//     //     });
//     //     loader.load().then(() => {
//     //         const map = new google.maps.Map(document.getElementById("map"), {
//     //             center: { lat: 37.7748, lng: -122.4194 },
//     //             zoom: 10,
//     //         });
//     //     });
//     // },
// };
</script>

<template>
  <div class="w-full">
    <h1 class="text-3xl justify-self-center mb-3">Select a place</h1>
    <div class="h-[30vh] lg:h-5/6 rounded-xl shadow-2xl">
      <iframe
        class="h-full w-full"
        :src="`https://www.google.com/maps/embed/v1/view?key=${googleAPIKey}&center=${place.details.location.latitude},${place.details.location.longitude}&zoom=15`"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>
