<script setup lang="ts">
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from '@/utils/environments/environent';
import { onMounted, ref, useTemplateRef, watch } from 'vue';
import type { IPlaceMarker } from '@/services/api.service';

// Constans
const tokyoCenter = {
  lat: 35.6764,
  lng: 139.65,
};

// This component receives the Places as the source of information
const { data } = defineProps<{ data: IPlaceMarker[] }>();
const emit = defineEmits(['map-marker-clicked']);
const currentMarkers: google.maps.marker.AdvancedMarkerElement[] = [];

// Map object
let map: google.maps.Map;

// Location
const mapLocation = ref<{ lat: number; lng: number }>({
  lat: tokyoCenter.lat,
  lng: tokyoCenter.lng,
});

// Load container
const mapElementRef = useTemplateRef('map-container');

// `Loader` module loads dynamically the Google module necessary for using the map, or any other utility.
const loader = new Loader({
  apiKey: environment.keys.googleApiKey,
  version: 'beta',
  libraries: ['places'],
});

// Hooks
onMounted(() => {
  initMap();
});

// When the template is rendered, we initialize the map.
async function initMap() {
  const { Map }: google.maps.MapsLibrary = await loader.importLibrary('maps');

  if (!mapElementRef.value) return;

  map = new Map(mapElementRef.value, {
    center: mapLocation.value,
    zoom: 12,
    mapId: 'DEMO_MAP_ID',
  });
}

// Watcher for new markers from data
watch(
  () => data,
  async (newMarkers) => {
    const { AdvancedMarkerElement, PinElement } = await loader.importLibrary('marker');

    // Recenter the map
    if (newMarkers[0]) {
      mapLocation.value = {
        lat: newMarkers[0].location.lat,
        lng: newMarkers[0].location.lon,
      };
      if (map) {
        map.setCenter(mapLocation.value);
        map.setZoom(12);
      }
    }

    // Clean up markers
    for (const item of currentMarkers) {
      if (item.map) {
        item.map = null;
      }
    }

    // We iterate over every place, and we set markers using location in each place
    newMarkers.forEach((marker: IPlaceMarker) => {
      const pinElement = new PinElement({
        scale: 1.3,
      });

      const markerMapObject = new AdvancedMarkerElement({
        map: map,
        position: {
          lat: marker.location.lat,
          lng: marker.location.lon,
        },
        title: 'Marker',
        content: pinElement.element,
        // Activate clickable market!
        gmpClickable: true,
        // Show all places
        collisionBehavior: google.maps.CollisionBehavior.REQUIRED,
      }) as google.maps.marker.AdvancedMarkerElement;

      // Add to the existing markers
      currentMarkers.push(markerMapObject);

      // If the marker its clicked, we emit an event including
      // the place information
      markerMapObject.addEventListener('gmp-click', () => {
        emit('map-marker-clicked', {
          event: 'map-marker-clicked',
          data: marker.id,
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
