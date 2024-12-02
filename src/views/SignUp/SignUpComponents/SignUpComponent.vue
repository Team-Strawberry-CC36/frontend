<script setup lang="ts">
import { ref } from 'vue';
import { registerUserThroughFirebase } from '@/utils/auth';
import { getAuth, signOut } from 'firebase/auth';
import router from '@/router';

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
  registerUserThroughFirebase(email.value, password.value, displayName.value);
  alert('Sign up successful!');
  await signOut(auth);
  await router.push({ name: 'login' });
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
    <div class="text-center w-5/6 border-b border-slate-400"></div>
    <span class="m-3">Alternative Login</span>
    <div></div>
  </div>
</template>
