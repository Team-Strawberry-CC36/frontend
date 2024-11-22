<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
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
    <div class="h-full w-full flex items-center bg-tiffanyBlue">
      <h1 class="basis-1/4 text-3xl">Japuri!</h1>
      <nav>
        <RouterLink to="/">Welcome</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/home">Home</RouterLink>
        <button @click.prevent="handleSignOut">Log out</button>
      </nav>
      This is a check: {{ username }}
    </div>
  </header>

  <main>
    <RouterView />
  </main>
</template>
