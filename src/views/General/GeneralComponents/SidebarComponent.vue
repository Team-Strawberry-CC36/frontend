<script setup lang="ts">
import { getAuth, signOut } from 'firebase/auth';
import { RouterLink } from 'vue-router';
import { defineEmits } from 'vue';
import { useToast } from 'vue-toastification';
import { useSearchStore } from '@/stores/SearchStore';
import { usePlaceStore } from '@/stores/PlaceStore';
import { useLoginStatusStore } from '@/stores/LoginStatusStore';

defineProps({
  openSidebar: Boolean,
});

// Stores
const search = useSearchStore();
const place = usePlaceStore();
const loginStatus = useLoginStatusStore();


const auth = getAuth();
const toast = useToast();

const handleSignOut = async () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      toast.info('Sign out successful. See you next time!', {
        timeout: 3000,
      });
      // Clean the store
      search.$reset();
      place.$reset();
    })
    .catch((error) => {
      // An error happened.
      toast.error('An error occured while signing you out.', {
        timeout: 3000,
      });
      console.log('Error: ' + error);
    });
};

// handle emits to close sidebar when clicking on link
const emit = defineEmits(['close-sidebar']);
</script>

<template>
  <nav
    class="absolute top-16 bg-velvet transition-all duration-500 bottom-0 w-[300px] p-5 z-10"
    :class="{ 'left-0': openSidebar, 'left-[-500px]': !openSidebar }"
  >
    <section
      v-if="loginStatus.isLoggedIn"
      class="block bg-charcoal text-frostWhite w-full p-3 mx-auto my-3 text-center shadow-lg rounded-xl"
    >
      <p>Logged in as: {{ auth.currentUser?.displayName }}</p>
    </section>
    <RouterLink
      v-else
      @click="emit('close-sidebar')"
      to="/login"
      class="block bg-frostWhite text-charcoal w-full p-3 mx-auto my-3 text-center shadow-lg rounded-xl hover:animate-pulse"
    >
      Login
    </RouterLink>
    <RouterLink
      v-if="!loginStatus.isLoggedIn"
      @click="emit('close-sidebar')"
      to="/signup"
      class="block bg-frostWhite text-charcoal w-full p-3 mx-auto my-3 text-center shadow-lg rounded-xl hover:animate-pulse"
    >
      Sign Up
    </RouterLink>
    <RouterLink
      v-if="loginStatus.isLoggedIn"
      @click="emit('close-sidebar')"
      to="/home"
      class="block bg-frostWhite text-charcoal w-full p-3 mx-auto my-3 text-center shadow-lg rounded-xl hover:animate-pulse"
    >
      Home
    </RouterLink>
    <RouterLink
      v-if="loginStatus.isLoggedIn"
      @click="emit('close-sidebar')"
      to="/dashboard"
      class="block bg-frostWhite text-charcoal w-full p-3 mx-auto my-3 text-center shadow-lg rounded-xl hover:animate-pulse"
    >
      Dashboard
    </RouterLink>
    <RouterLink
      v-else
      @click="emit('close-sidebar')"
      to="/"
      class="block bg-frostWhite text-charcoal w-full p-3 mx-auto my-3 text-center shadow-lg rounded-xl hover:animate-pulse"
    >
      Welcome
    </RouterLink>
    <RouterLink
      @click="emit('close-sidebar')"
      to="/guides"
      class="block bg-frostWhite text-charcoal w-full p-3 mx-auto my-3 text-center shadow-lg rounded-xl hover:animate-pulse"
    >
      Guides
    </RouterLink>
    <RouterLink
      @click="emit('close-sidebar')"
      to="/about"
      class="block bg-frostWhite text-charcoal w-full p-3 mx-auto my-3 text-center shadow-lg rounded-xl hover:animate-pulse"
    >
      About
    </RouterLink>
    <button
      v-if="loginStatus.isLoggedIn"
      @click.prevent="handleSignOut"
      class="block bg-frostWhite text-charcoal w-full p-3 mx-auto my-3 text-center shadow-lg rounded-xl hover:animate-pulse"
    >
      Log out
    </button>
  </nav>
</template>
