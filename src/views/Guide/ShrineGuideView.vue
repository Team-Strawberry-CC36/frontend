<script setup lang="ts"></script>

<template>
  <main
    class="flex flex-col w-full bg-cover bg-center bg-fixed bg-[url('https://prd-static.gltjp.com/glt/data/article/21000/20446/20230928_135548_0da1a377_w1920.webp')] text-white p-6"
  >
    <div class="bg-black bg-opacity-50 rounded-lg shadow-lg p-8 max-w-4xl text-center">
      <h1 class="text-3xl font-bold text-left mb-4">⛩️ Shrine Guide ⛩️</h1>
      <h2 class="text-xl font-semibold text-left mb-3">What’s Shrine?</h2>
      <p class="leading-7 mb-4">
        Shrines are sacred spaces dedicated to a god. Shrines are places to pray for good fortune,
        give thanks, and connect with Japan’s gods. Common features include torii (gates),
        purification fountains, and the main worship hall (haiden).
      </p>
      <h3 class="text-lg font-semibold text-left mt-6 mb-3">Key Etiquette</h3>
      <ul class="list-disc list-inside space-y-3">
        <li>Bow once before passing through the torii gates.</li>
        <li>
          <span class="font-medium">Temizuya (Purification Ritual):</span> Cleanse your hands and
          mouth:
          <ul class="list-decimal list-inside mt-2 pl-5">
            <li>Use the ladle to pour water over your left hand, then your right hand.</li>
            <li>Pour water into your left hand to rinse your mouth (don’t swallow it).</li>
            <li>Let the remaining water flow down the handle before placing the ladle back.</li>
          </ul>
        </li>
        <li>
          At the offering box (<span class="font-medium">saisenbako</span>), follow this:
          <ul class="list-decimal list-inside mt-2 pl-5">
            <li>Bow twice.</li>
            <li>Clap twice.</li>
            <li>Say your prayer silently.</li>
            <li>Bow once to conclude.</li>
          </ul>
          <span class="text-sm italic">
            * If you’re at a temple, this sequence is not performed. It’s only for shrines.
          </span>
        </li>
        <li>
          Try to visit shrines before 4pm. There’s a legend that the god leaves the shrine after
          4pm, so Japanese people usually visit earlier.
        </li>
      </ul>
    </div>
    <div class="image-content w-1/3"></div>
  </main>
</template>

<style scoped>
.shrine-guide {
  display: flex;
  align-items: flex-start;
}

.text-content {
  flex: 2;
  padding-right: 1.5rem;
}

.image-content {
  flex: 1;
}

img {
  object-fit: cover;
}
</style>
