<script setup lang="ts">
  import { Loader } from "@googlemaps/js-api-loader";
  import {environment} from "@/environments/environent";
  import {onMounted} from "vue";
  import type Place from "@/interfaces/Place";

  const { data } = defineProps<{ data: Place[] }>();

  console.log(environment.keys)

  const loader = new Loader({
    apiKey: environment.keys.googleApiKey,
    version: "beta",
    libraries: ["places"]
  });

  onMounted(() => {
    initMap();
  })

  async function initMap() {
    const { Map } = await loader.importLibrary("maps") as google.maps.MapsLibrary;
    const { AdvancedMarkerElement } = await loader.importLibrary("marker");

    const mapElement = document.getElementById("map");

    if (!mapElement) return;

    const map = new Map(
      mapElement,
      {
        zoom: 12,
        center: position,
        mapId: 'DEMO_MAP_ID',
      }
  );

    data.forEach((place: Place) => {
      // Create each marker
      const marker = new AdvancedMarkerElement({
        map,
        position: {
          lat: place.location.latitude,
          lng: place.location.longitude
        },
        gmpClickable: true,
      }) as google.maps.marker.AdvancedMarkerElement;

      // Do something in a click
      // The idea here is to submit an event to the parent to update the place view!
      marker.addEventListener("gmc-click", (event => {
        console.log("clicked", place);
      }))
    })
  }
</script>

<template>
  <div id="map" class="w-[100%] h-[100%]" >map</div>
</template>
