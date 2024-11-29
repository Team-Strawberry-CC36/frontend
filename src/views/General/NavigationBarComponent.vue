<script setup lang="ts">
import { ref } from 'vue';
import SidebarComponent from './GeneralComponents/SidebarComponent.vue';

const openSidebar = ref<boolean>(false);
const toggleSidebar = () => {
  openSidebar.value = !openSidebar.value;
  console.log(openSidebar.value)
};
</script>

<template>
  <header class="h-16">
    <div class="h-full w-full flex items-center bg-velvet text-frostWhite">
      <h1 class="w-full text-center text-3xl font-semibold">Japuri</h1>
      <button class="absolute top-4 left-5 p-2" @click="toggleSidebar">
      <!-- Hamburger Menu -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 transition-transform duration-300 ease-in-out"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
      <!-- Top Line -->
      <line
        x1="3"
        y1="6"
        x2="21"
        y2="6"
        class="transition-transform duration-300 ease-in-out origin-center"
        :class="{ 'rotate-45 translate-y-2': openSidebar }"
        stroke-width="2"
        stroke="currentColor"
      />
      <!-- Middle Line -->
      <line
        x1="3"
        y1="12"
        x2="21"
        y2="12"
        class="transition-opacity duration-300 ease-in-out"
        stroke-width="2"
        stroke="currentColor"
        :class="{ 'opacity-0': openSidebar }"
      />
      <!-- Bottom Line -->
      <line
        x1="3"
        y1="18"
        x2="21"
        y2="18"
        class="transition-transform duration-300 ease-in-out origin-center"
        :class="{ '-rotate-45 -translate-y-2': openSidebar }"
        stroke-width="2"
        stroke="currentColor"
      />
    </svg>
  </button>

  <SidebarComponent
    :openSidebar="openSidebar"
  />
    </div>
  </header>
</template>
