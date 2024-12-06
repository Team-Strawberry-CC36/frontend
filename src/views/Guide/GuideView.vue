<script setup lang="ts">
</script>

<template>
  <main class="flex flex-col sm:h-fit h-screen sm:m-5 items-center">
    <div class="sm:w-3/4 bg-frostWhite sm:rounded-xl h-full sm:border border-slate-400">
      <h1 class="text-center text-3xl font-semibold m-3">Tourist Guides</h1>
      <p class="p-5 font-light text-center">First time in Japan? Japuri's comprehensive guides will get you up to speed on the proper etiquette for a variety of culturally sensitive locations!</p>
      <section class="flex flex-col sm:flex-row">
        <RouterLink to="/guides/onsen" class="block sm:basis-1/3 bg-velvet text-frostWhite border border-slate-400 m-3 p-3 text-center rounded-xl hover:animate-pulse">
          Onsen Guide
        </RouterLink>
        <RouterLink to="/guides/shrine" class="block sm:basis-1/3 bg-velvet text-frostWhite border border-slate-400 m-3 p-3 text-center rounded-xl hover:animate-pulse">
          Shrine Guide
        </RouterLink>
        <RouterLink to="/guides/restaurant" class="block sm:basis-1/3 bg-velvet text-frostWhite border border-slate-400 m-3 p-3 text-center rounded-xl hover:animate-pulse">
          Restaurant Guide
        </RouterLink>
      </section>
    </div>
  </main>
</template>
