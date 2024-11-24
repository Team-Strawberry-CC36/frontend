<template>
    <div class="flex justify-center items-center bg-gray-200 h-full border-r border-gray-300">
        <div class="h-full w-full">
    <iframe
      class="h-full w-full border-none"
      :src="`https://www.google.com/maps/embed/v1/view?key=${googleAPIKey}&center=26.5667,127.9833&zoom=15`"
      allowfullscreen
    ></iframe>
  </div>
    </div>
</template>

<script>
    import { Loader } from "@googlemaps/js-api-loader";
    export default {
        name: "GoogleMap",
        data() {
            return {
                googleAPIKey: import.meta.env.VITE_GOOGLE_KEY
            }
        }
        // mounted() {
        //     const loader = new Loader({
        //         apiKey: googleAPIKey,
        //         version: "weekly"
        //     });

        //     loader.load().then(() => {
        //         const map = new google.maps.Map(document.getElementById("map"), {
        //             center: { lat: 37.7748, lng: -122.4194 },
        //             zoom: 10,
        //         });
        //     });
        // },
    };
</script>