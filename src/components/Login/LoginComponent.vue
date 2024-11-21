<script setup lang="ts">
import { ref } from 'vue'
import { signInThroughFirebase } from '@/utils/auth'

const email = ref('')
const password = ref('')

const handleSignIn = () => {
  signInThroughFirebase(email.value, password.value)
}
</script>

<template>
  <div class="flex flex-col items-center sm:h-1/2 sm:w-1/4 rounded-xl bg-tiffanyBlue shadow-xl">
    <span class="m-3">Login with your Japuri account</span>
    <form class="flex flex-col" @submit.prevent="handleSignIn">
      <input type="email" v-model="email" placeholder="Email" class="block mb-3" />

      <input type="password" v-model="password" placeholder="Password" class="block mb-3" />

      <div class="mb-3 mx-auto">
        <button class="bg-blueGreen px-3 py-1 rounded-xl hover:animate-pulse">Login</button>
      </div>
    </form>
    <RouterLink class="mb-3" to="/signup">Don't have an account? Sign up!</RouterLink>
    <svg height="5" width="300" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="0" x2="300" y2="0" style="stroke: white; stroke-width: 2" />
    </svg>
    <span class="m-3">Alternative Login</span>
    <div></div>
  </div>
</template>
