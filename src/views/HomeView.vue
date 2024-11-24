

<template>
  <main>
    <div class="main-page">
      <Navbar />
      <div class="main-content">
        <GoogleMap />
        <PlaceInfo />
      </div>
    </div>
  </main>
</template>

<script>
  import Navbar from '../components/Navbar.vue';
  import GoogleMap from '../components/GoogleMap.vue';
  import PlaceInfo from '../components/PlaceInfo.vue';

  export default {
    name: "HomeView",
    components: {
      Navbar,
      GoogleMap,
      PlaceInfo,
    },
  };
</script>

<style scoped>
.main-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-content {
  display: flex;
  flex: 1;
}
</style>
