<script setup lang="ts">
import { ref } from 'vue';
import { signInThroughFirebase } from '@/auth/auth';
import { useToast } from 'vue-toastification';

const email = ref('');
const password = ref('');

const toast = useToast();

const handleSignIn = async () => {
  try {
    await signInThroughFirebase(email.value, password.value);
    toast.success('Login successful! Welcome!', {
      timeout: 3000
    })
  } catch (error) {
    toast.error('Login failed. Please check your login credentials and try again.', {
      timeout: 3000
    });
    console.log('Error logging in:', error)
  }
};
</script>

<template>
  <div class="flex flex-col p-3 items-center h-fit sm:w-1/4 rounded-xl bg-frostWhite shadow-2xl">
    <span class="m-3 text-center">Login with your Jappuri account</span>
    <form class="flex flex-col w-full sm:w-4/5" @submit.prevent="handleSignIn">
      <input
        type="email"
        v-model="email"
        placeholder="Email"
        class="block mb-3 p-1 border border-slate-400 rounded-xl"
      />

      <input
        type="password"
        v-model="password"
        placeholder="Password"
        class="block mb-3 p-1 border border-slate-400 rounded-xl"
      />

      <div class="mb-3 mx-auto">
        <button class="bg-charcoal text-frostWhite px-3 py-1 rounded-xl hover:animate-pulse">
          Login
        </button>
      </div>
    </form>
    <RouterLink class="mb-3 text-center underline" to="/signup"
      >Don't have an account? Sign up!</RouterLink
    >
  </div>
</template>
