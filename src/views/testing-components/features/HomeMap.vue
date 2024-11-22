<script setup lang="ts">
  import { Loader } from "@googlemaps/js-api-loader";
  import {environment} from "@/environments/environent.ts";
  import {onMounted} from "vue";
  import type Place from "@/interfaces/Place";

  const { data } = defineProps<{ data: Place[] }>();

  const loader = new Loader({
    apiKey: environment.keys.googleApiKey,
    version: "weekly",
    libraries: ["places"]
  });

  onMounted(() => {
    initMap();
  })

  async function initMap() {
    // Promise for a specific library
    const position = { lat: -25.344, lng: 131.031 };

    const { Map } = await loader.importLibrary("maps");
    const { AdvancedMarkerElement } = await loader.importLibrary("marker");

    const map = new Map(
      document.getElementById('map'),
      {
        zoom: 12,
        center: position,
        mapId: 'DEMO_MAP_ID',
      }
  );

    // Apply maps locations!
    for (let place of data) {
      new AdvancedMarkerElement({
        map: map,
        position: {
         lat: place.location.latitude,
         lon: place.location.longitude,
        },
        title: place.name
      })
    }

    // // The marker, positioned at Uluru
    // const marker = new AdvancedMarkerElement({
    //   map: map,
    //   position: position,
    //   title: 'Uluru'
    // });
  }
</script>

<template>
  <div id="map" class="w-[100%] h-[100%]">map</div>
</template>
