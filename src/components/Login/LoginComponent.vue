<script setup lang="ts"></script>

<template>
  <div class="flex flex-col items-center sm:h-1/2 sm:w-1/4 rounded-xl bg-tiffanyBlue shadow-xl">
    <span class="m-3">Login with your Japuri account</span>
    <div>
      <input class="block mb-3" placeholder="Email" />
      <input class="block mb-3" placeholder="Password" />
    </div>
    <div class="mb-3">
      <button class="bg-blueGreen px-3 py-1 rounded-xl hover:animate-pulse">Login</button>
    </div>
    <RouterLink class="mb-3" to="/signup">Don't have an account? Sign up!</RouterLink>
    <svg height="5" width="300" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="0" x2="300" y2="0" style="stroke: white; stroke-width: 2" />
    </svg>
    <span class="m-3">Alternative Login</span>
    <div></div>
  </div>
</template>
