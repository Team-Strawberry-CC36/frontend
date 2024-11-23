<script setup lang="ts">
defineProps({
  placeDetails: Object
})
</script>

<template>
  <div class="w-11/12 sm:w-1/2 h-fit sm:min-h-full mt-3 rounded-xl shadow-xl bg-peach">
    <section>
      <!-- Name of the place -->
      <h1>{{ placeDetails.name }}</h1>
    </section>
    <section>
      <!-- General information -->
      <ul>
        <li>AddressL: {{ placeDetails.address }}</li>
        <li>Opening hours: {{ placeDetails.regular_opening_hours }}</li>
        <li>Website: {{ placeDetails.website_uri }}</li>
      </ul>
    </section>
    <section>Guide Link</section>
    <section>Etiquette</section>
    <section>Link to experiences</section>
  </div>
</template>
