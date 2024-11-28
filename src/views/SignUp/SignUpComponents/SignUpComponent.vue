<script setup lang="ts">
import { ref } from 'vue';
import { registerUserThroughFirebase } from '@/utils/auth';

const displayName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const handleSignUp = () => {
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
  registerUserThroughFirebase(email.value, password.value, displayName.value);
  alert('Sign up successful!');
};
</script>

<template>
  <div class="flex flex-col items-center sm:h-1/2 sm:w-1/4 rounded-xl bg-frostWhite shadow-2xl">
    <span class="m-3">Sign up for Japuri</span>
    <form class="flex flex-col" @submit.prevent="handleSignUp">
      <input type="text" v-model="displayName" placeholder="Username" class="block mb-3" />

      <input type="email" v-model="email" placeholder="Email" class="block mb-3" />

      <input type="password" v-model="password" placeholder="Password" class="block mb-3" />

      <input
        type="password"
        v-model="confirmPassword"
        placeholder="Confirm password"
        class="block mb-3"
      />

      <div class="mb-3 mx-auto">
        <button class="bg-charcoal text-frostWhite px-3 py-1 rounded-xl hover:animate-pulse">
          Sign Up
        </button>
      </div>
    </form>
    <RouterLink class="mb-3" to="/login"> To login </RouterLink>
    <svg height="5" width="300" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="0" x2="300" y2="0" class="stroke-charcoal stroke-2" />
    </svg>
    <span class="m-3">Alternative Login</span>
    <div></div>
  </div>
</template>
