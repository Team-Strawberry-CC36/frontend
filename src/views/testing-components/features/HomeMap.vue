<script setup lang="ts">
  import {onMounted} from "vue";
  import {environment} from "@/environments/environent";

  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${environment.keys.googleApiKey}&q=Space+Needle,Seattle+WA"`

  onMounted(() => {
    console.log("Home Map mounted");
    console.log(mapSrc);
  })
</script>

<template>
  <div>
    <iframe
      width="450"
      height="250"
      frameborder="0" style="border:0"
      referrerpolicy="no-referrer-when-downgrade"
      v-bind:src="mapSrc"
      allowfullscreen>
    </iframe>
  </div>
</template>

<style scoped>

</style>
