<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import SidebarComponent from './GeneralComponents/SidebarComponent.vue';
import { useRouter } from 'vue-router';

const openSidebar = ref<boolean>(false);
const toggleSidebar = () => {
  openSidebar.value = !openSidebar.value;
};

const handleClickOutside = (event: MouseEvent) => {
  console.log(event.target);
  const target = event.target as HTMLElement;
  if (target && target.classList) {
    if(!target.classList.contains('hamburger') && !target.classList.contains('hamburger-lines') && !target.classList.contains('hamburger-line')) {
      const sidebarElement = document.querySelector('.sidebar');
      if (openSidebar.value && sidebarElement) {
        openSidebar.value = false;
      }
    }
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
})

const router = useRouter();
const handleGoHome = () => {
  router.push('/home');
};
</script>

<template>
  <header class="h-16">
    <div class="h-full w-full flex items-center bg-velvet text-frostWhite">
      <!-- <h1
        class="w-full text-center text-3xl font-semibold hover:cursor-pointer"
        @click="handleGoHome"
      >
        
      </h1> -->
      <button class="hamburger absolute top-3 left-5 p-2" @click="toggleSidebar">
        <!-- Hamburger Menu -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="hamburger-lines h-6 w-6 transition-transform duration-300 ease-in-out"
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
            class="hamburger-line transition-transform duration-300 ease-in-out origin-center"
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
            class="hamburger-line transition-opacity duration-300 ease-in-out"
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
            class="hamburger-line transition-transform duration-300 ease-in-out origin-center"
            :class="{ '-rotate-45 -translate-y-2': openSidebar }"
            stroke-width="2"
            stroke="currentColor"
          />
        </svg>
      </button>
      <img class="mx-auto h-32 mb-4 hover:cursor-pointer" src="../../assets/Jappuri.png" @click="handleGoHome" />

      <SidebarComponent class="sidebar" :openSidebar="openSidebar" @close-sidebar="toggleSidebar" />
    </div>
  </header>
</template>
