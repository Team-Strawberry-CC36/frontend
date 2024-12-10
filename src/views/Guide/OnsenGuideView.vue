<script setup lang="ts"></script>

<template>
  <main
    class="flex flex-col w-full bg-cover bg-center bg-fixed bg-[url('https://images.ctfassets.net/3cje8ekgzxob/1YQhSUt1tOst5IhoqJLdNi/1b33a4b1197fab23cf468160a8f6363c/onsen-hot-spring.jpg?q=85&fm=jpg')] text-white p-6"
  >
    <div class="bg-black bg-opacity-50 rounded-lg shadow-lg p-8 max-w-4xl">
      <h1 class="text-3xl font-bold text-left mb-4">♨️ Onsen Guide ♨️</h1>
      <h2 class="text-xl font-semibold text-left mb-3">What’s Onsen?</h2>
      <p class="text-white leading-7 mb-4">
        Japan’s onsens are not just baths but are deeply tied to Japanese culture, relaxation, and
        health. Onsens are a cornerstone of Japanese tradition, with mineral hot springs believed to
        have healing properties. Historically, onsens were places for communal cleansing and
        bonding.
      </p>
      <h3 class="text-lg font-semibold text-left mt-6 mb-3">Key Etiquette</h3>
      <ul class="list-disc list-inside space-y-3 text-white">
        <li>
          Use showering to wash your body thoroughly before soaking. Onsens prioritize cleanliness.
        </li>
        <li>
          Towels are allowed and should not touch the water. Place them on your head or on the side
          of the onsen.
        </li>
        <li>Speak in a low voice and avoid loud conversations.</li>
        <li>
          Don’t splash or disturb other people. Avoid submerging your head in the water, as it’s
          considered unhygienic.
        </li>
      </ul>
    </div>
    <div class="image-content w-1/3"></div>
  </main>
</template>

<style scoped>
.onsen-guide {
  display: flex;
  align-items: flex-start;
}

.text-content {
  flex: 2;
  padding-right: 1.5rem;
}

.image-content {
  flex: 1;
  margin-top: 230px;
}

img {
  object-fit: cover;
}
</style>
