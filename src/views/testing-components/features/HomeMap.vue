<script setup>
  import { Loader } from "@googlemaps/js-api-loader";
  import {environment} from "@/environments/environent.ts";
  import {onMounted} from "vue";

  const loader = new Loader({
    apiKey: environment.keys.googleApiKey,
    version: "weekly",
    libraries: ["places"]
  });

  onMounted(() => {
    initMap()
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

    // The marker, positioned at Uluru
    const marker = new AdvancedMarkerElement({
      map: map,
      position: position,
      title: 'Uluru'
    });
  }
</script>

<template>
  <div id="map" style="width: 600px; height: 500px;">
<!--    -->
  </div>
</template>
