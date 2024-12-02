<script setup lang="ts">
import { ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { RouterLink } from 'vue-router';
import { defineEmits } from 'vue';

  defineProps({
    openSidebar: Boolean
  });

const username = ref<string | null>(null);

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    username.value = user.displayName;
  } else {
    alert('Logged out');
    username.value = null;
    // User is signed out
  }
});

const handleSignOut = async () =>
  signOut(auth)
  .then(() => {
    // Sign-out successful.
  })
  .catch((error) => {
    // An error happened.
    console.log('Error: ' + error);
});

// handle emits to close sidebar when clicking on link
const emit = defineEmits(['close-sidebar']);

</script>

<template>
    <nav
      class="absolute top-16 bg-velvet transition-all duration-500 h-screen w-[300px] p-5 z-10"
      :class="{ 'left-0':  openSidebar, 'left-[-500px]': !openSidebar }"
    >
      <section v-if="username" class="block bg-charcoal text-frostWhite w-full p-3 mx-auto my-3 text-center shadow-lg rounded-xl">
        <p>Logged in as: {{ username }}</p>
      </section>
      <RouterLink v-else @click="emit('close-sidebar')" to="/login" class="block bg-frostWhite text-charcoal w-full p-3 mx-auto my-3 text-center shadow-lg rounded-xl hover:animate-pulse">
        Login
      </RouterLink>
      <RouterLink v-if="!username" @click="emit('close-sidebar')" to="/signup" class="block bg-frostWhite text-charcoal w-full p-3 mx-auto my-3 text-center shadow-lg rounded-xl hover:animate-pulse">
        Sign Up
      </RouterLink>
      <RouterLink v-if="username" @click="emit('close-sidebar')" to="/home" class="block bg-frostWhite text-charcoal w-full p-3 mx-auto my-3 text-center shadow-lg rounded-xl hover:animate-pulse">
        Home
      </RouterLink>
      <RouterLink v-if="username" @click="emit('close-sidebar')" to="/dashboard" class="block bg-frostWhite text-charcoal w-full p-3 mx-auto my-3 text-center shadow-lg rounded-xl hover:animate-pulse">
        Dashboard
      </RouterLink>
      <RouterLink v-else @click="emit('close-sidebar')" to="/" class="block bg-frostWhite text-charcoal w-full p-3 mx-auto my-3 text-center shadow-lg rounded-xl hover:animate-pulse">
        Welcome
      </RouterLink>
      <RouterLink @click="emit('close-sidebar')" to="/about" class="block bg-frostWhite text-charcoal w-full p-3 mx-auto my-3 text-center shadow-lg rounded-xl hover:animate-pulse">
        About
      </RouterLink>
      <button v-if="username" @click.prevent="handleSignOut" class="block bg-frostWhite text-charcoal w-full p-3 mx-auto my-3 text-center shadow-lg rounded-xl hover:animate-pulse">
        Log out
      </button>
  </nav>
</template>
