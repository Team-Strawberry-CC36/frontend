<script setup lang="ts"></script>

<template>
  <div class="shrine-guide p-6 rounded-lg border border-gray-200 shadow-sm flex">
    <div class="text-content w-2/3 pr-6">
      <h1 class="text-3xl font-bold text-left mb-4">⛩️ Shrine Guide ⛩️</h1>
      <h2 class="text-xl font-semibold text-left mb-3">What’s Shrine?</h2>
      <p class="text-gray-800 leading-7 mb-4">
        Shrines are sacred spaces dedicated to a god. Shrines are places to pray for good fortune,
        give thanks, and connect with Japan’s gods. Common features include torii (gates),
        purification fountains, and the main worship hall (haiden).
      </p>
      <h3 class="text-lg font-semibold text-left mt-6 mb-3">Key Etiquette</h3>
      <ul class="list-disc list-inside space-y-3 text-gray-700">
        <li>Bow once before passing through the torii gates.</li>
        <li>
          <span class="font-medium">Temizuya (Purification Ritual):</span> Cleanse your hands and
          mouth:
          <ul class="list-decimal list-inside mt-2 pl-5 text-gray-600">
            <li>Use the ladle to pour water over your left hand, then your right hand.</li>
            <li>Pour water into your left hand to rinse your mouth (don’t swallow it).</li>
            <li>Let the remaining water flow down the handle before placing the ladle back.</li>
          </ul>
        </li>
        <li>
          At the offering box (<span class="font-medium">saisenbako</span>), follow this:
          <ul class="list-decimal list-inside mt-2 pl-5 text-gray-600">
            <li>Bow twice.</li>
            <li>Clap twice.</li>
            <li>Say your prayer silently.</li>
            <li>Bow once to conclude.</li>
          </ul>
          <span class="text-sm italic text-gray-600">
            * If you’re at a temple, this sequence is not performed. It’s only for shrines.
          </span>
        </li>
        <li>
          Try to visit shrines before 4pm. There’s a legend that the god leaves the shrine after
          4pm, so Japanese people usually visit earlier.
        </li>
      </ul>
    </div>
    <div class="image-content w-1/3">
      <img
        src="https://prd-static.gltjp.com/glt/data/article/21000/20446/20230928_135548_0da1a377_w1920.webp"
        alt="Shrine image"
        class="w-full h-auto object-cover rounded-lg"
      />
    </div>
  </div>
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
