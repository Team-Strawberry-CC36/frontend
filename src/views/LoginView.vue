<script setup lang="ts"></script>

<template>
  <main class="flex flex-col items-center justify-center h-screen w-full bg-roseQuartz">
    <div class="flex flex-col items-center h-1/2 w-1/4 rounded-xl bg-tiffanyBlue shadow-xl">
      <span class="m-3">Login with Username</span>
      <div>
        <input class="block mb-3" />
        <input class="block mb-3" />
      </div>
      <div class="mb-3">
        <button>Login</button>
      </div>
      <svg height="5" width="300" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="0" x2="300" y2="0" style="stroke: white; stroke-width: 2" />
      </svg>
      <span class="m-3">Alternative Login</span>
      <div></div>
    </div>
  </main>
</template>
