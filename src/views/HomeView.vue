

<template>
    <div class="flex flex-col h-screen w-screen">
      <Navbar />
      <div class="flex flex-grow">
        <GoogleMap class="flex-[2] h-full" />
        <PlaceInfo class="flex-[1] h-full" />
      </div>
    </div>
</template>

<script>
  import Navbar from '../components/HomeView/Navbar.vue';
  import GoogleMap from '../components/HomeView/GoogleMap.vue';
  import PlaceInfo from '../components/HomeView/PlaceInfo.vue';

  export default {
    name: "HomeView",
    components: {
      Navbar,
      GoogleMap,
      PlaceInfo,
    },
  };
</script>