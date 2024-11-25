<script setup lang="ts">
  import { Loader } from "@googlemaps/js-api-loader";
  import { environment } from "@/utils/environments/environent";
  import {onMounted, ref, useTemplateRef} from "vue";
  import type Place from "@/utils/interfaces/Place";

  // This component receives the Places as the source of information
  const { data } = defineProps<{ data: Place[] }>();
  const emit = defineEmits(['map-marker-clicked']);

  // Initial variables
  const tokyoLocation = { lat: 35.6764,  lng: 139.6500 };
  // Load container
  let mapElementRef = useTemplateRef("map-container");

  // `Loader` module loads dynamically the Google module necessary for using the map, or any other utility.
  const loader = new Loader({
    apiKey: environment.keys.googleApiKey,
    version: "beta",
    libraries: ["places"]
  });

  onMounted(() => {
    initMap();
  })

  // When the template is rendered, we initialize the map.
  async function initMap() {
    const { Map } = await loader.importLibrary("maps") as google.maps.MapsLibrary;
    const { AdvancedMarkerElement } = await loader.importLibrary("marker");

    if (!mapElementRef.value) return;

    const map = new Map(mapElementRef.value, {
      center: tokyoLocation,
      zoom: 12,
      mapId: "DEMO_MAP_ID"
    });

    // We iterate over every place, and we set markers using location in each place
    data.forEach((place: Place) => {
      const marker = new AdvancedMarkerElement({
        map,
        position: {
          lat: place.location.latitude,
          lng: place.location.longitude
        },
        // Activate google event!
        gmpClickable: true,
      }) as google.maps.marker.AdvancedMarkerElement;

      // If the marker its clicked, we emit an event including
      // the place information
      marker.addEventListener("gmp-click", event => {
        emit("map-marker-clicked", {
          event: "map-marker-clicked",
          place: place,
        })
      })
    })
  }
</script>

<template>
  <!-- Div who stores google maps container -->
  <div ref="map-container" class="w-[100%] h-[100%]" ></div>
</template>
