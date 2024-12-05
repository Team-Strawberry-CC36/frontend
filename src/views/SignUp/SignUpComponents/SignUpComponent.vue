<script setup lang="ts">
import { ref } from 'vue';
import { registerUserThroughFirebase } from '@/auth/auth';
import { getAuth, signOut } from 'firebase/auth';
import router from '@/router';
import authService from "@/services/auth.service";
import {firebaseApp} from "@/firebase";

const displayName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');


const handleSignUp = async () => {
  const auth = getAuth();
  if (
    displayName.value.trim() === '' ||
    email.value.trim() === '' ||
    password.value.trim() === '' ||
    confirmPassword.value.trim() === ''
  ) {
    alert('Please fill in all fields.');
    return;
  }
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match.');
    return;
  }
  // Successful sign up should redirect user to login page
  const { uid } = await registerUserThroughFirebase(email.value, password.value, displayName.value);
  // We need to add this to the db
  const response = await authService.createUser(uid);
  if (response.status === 201) {
    await router.push({ name: 'login' });
  } else {
    // Error handling here
    // Maybe we can delete the user
  }
};
</script>

<template>
  <div class="flex flex-col p-3 items-center h-fit sm:w-1/4 rounded-xl bg-frostWhite shadow-2xl">
    <span class="m-3 text-center">Sign up for Japuri</span>
    <form class="flex flex-col" @submit.prevent="handleSignUp">
      <input type="text" v-model="displayName" placeholder="Username" class="block mb-3 p-1 border border-slate-400 rounded-xl" />

      <input type="email" v-model="email" placeholder="Email" class="block mb-3 p-1 border border-slate-400 rounded-xl" />

      <input type="password" v-model="password" placeholder="Password" class="block mb-3 p-1 border border-slate-400 rounded-xl" />

      <input
        type="password"
        v-model="confirmPassword"
        placeholder="Confirm password"
        class="block mb-3 p-1 border border-slate-400 rounded-xl"
      />

      <div class="mb-3 mx-auto">
        <button class="bg-charcoal text-frostWhite px-3 py-1 rounded-xl hover:animate-pulse">
          Sign Up
        </button>
      </div>
    </form>
    <RouterLink class="mb-3 text-center underline" to="/login"> To login </RouterLink>
  </div>
</template>
