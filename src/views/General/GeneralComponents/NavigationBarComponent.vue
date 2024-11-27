<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const auth = getAuth();

const username = ref<string | null>(null);

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
</script>

<template>
  <header class="h-16">
    <div class="h-full w-full flex items-center bg-velvet text-frostWhite">
      <h1 class="p-5 basis-1/4 text-3xl">Japuri</h1>
      <nav class="basis-1/2 flex justify-between">
        <RouterLink to="/">Welcome</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/home">Home</RouterLink>
        <button @click.prevent="handleSignOut">Log out</button>
      </nav>
      <div class="basis-1/4 text-center">
        <p>Logged in as: {{ username }}</p>
      </div>
    </div>
  </header>
</template>
