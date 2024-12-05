<script setup lang="ts">
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from '@/utils/environments/environent';
import { onMounted, ref, useTemplateRef, watch } from 'vue';
import type { IPlaceMarker } from '@/services/api.service';

// This component receives the Places as the source of information
const { data } = defineProps<{ data: IPlaceMarker[] }>();
const emit = defineEmits(['map-marker-clicked']);

// Map object
let map: google.maps.Map;
// Initial variables
// const tokyoLocation = { lat: 35.6764, lng: 139.65 };
const location = ref<{ lat: number; lng: number }>({ lat: 35.6765, lng: 139.65 }); // starting point is Tokyo
// Load container
const mapElementRef = useTemplateRef('map-container');

// `Loader` module loads dynamically the Google module necessary for using the map, or any other utility.
const loader = new Loader({
  apiKey: environment.keys.googleApiKey,
  version: 'beta',
  libraries: ['places'],
});

onMounted(() => {
  initMap();
});

// When the template is rendered, we initialize the map.
async function initMap() {
  const { Map }: google.maps.MapsLibrary = await loader.importLibrary('maps');

  if (!mapElementRef.value) return;

  map = new Map(mapElementRef.value, {
    center: location.value,
    zoom: 12,
    mapId: 'DEMO_MAP_ID',
  });
}

// Watcher for new markers from data
watch(
  () => data,
  async (value) => {
    const { AdvancedMarkerElement } = await loader.importLibrary('marker');

    // Recenter the map
    if (value[0]) {
      location.value = {
        lat: value[0].location.lat,
        lng: value[0].location.lon,
      };
      if (map) {
        map.setCenter(location.value);
        map.setZoom(12);
      }
    }

    // We iterate over every place, and we set markers using location in each place
    value.forEach((place: IPlaceMarker) => {
      const marker = new AdvancedMarkerElement({
        map: map,
        position: {
          lat: place.location.lat,
          lng: place.location.lon,
        },
        // Activate google event!
        gmpClickable: true,
      }) as google.maps.marker.AdvancedMarkerElement;

      // If the marker its clicked, we emit an event including
      // the place information
      marker.addEventListener('gmp-click', () => {
        emit('map-marker-clicked', {
          event: 'map-marker-clicked',
          data: place.id,
        });
      });
    });

    // Recenter the map
  },
);
</script>

<template>
  <!-- Div who stores google maps container -->
  <div ref="map-container" class="w-[100%] h-[100%]"></div>
</template>
