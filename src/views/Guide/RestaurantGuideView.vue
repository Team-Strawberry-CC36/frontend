<script setup lang="ts"></script>

<template>
  <main
    class="flex flex-col w-full bg-cover bg-center bg-fixed bg-[url('https://images.www.kateigaho.com/media/article/35398/images/main_b8e5c5c64a2d5c9818adc38ef4a10257ffa5bef2.jpg?w=960')] text-white p-6"
  >
    <div class="bg-black bg-opacity-50 rounded-lg shadow-lg p-8 max-w-4xl">
      <h1 class="text-3xl font-bold text-left mb-4">🍽️ Restaurant Guide 🍽️</h1>
      <h2 class="text-xl font-semibold text-left mb-3">
        What’s are the specific rules at a Japanese Restaurant?
      </h2>
      <ul class="list-disc list-inside space-y-3">
        <li>
          <span class="font-medium">Using Chopsticks:</span> Don’t point, wave, or stick chopsticks
          upright on rice, and avoid passing food from chopstick to chopstick (which symbolizes a
          funeral ritual).
        </li>
        <li>
          <span class="font-medium">Handling Dishes:</span> If there are small bowls, hold them with
          one hand and eat directly from them.
        </li>
        <li>
          <span class="font-medium">No Tipping:</span> Tipping is not customary and may even be
          considered rude. Instead, express gratitude verbally (e.g., "arigatougozaimasita",
          "gochisousamadeshita").
        </li>
        <li>
          <span class="font-medium">Slurping is ok:</span> It’s common to slurp noodles like ramen
          or soba, as it shows enjoyment.
        </li>
      </ul>
    </div>
    <div class="image-content w-1/3"></div>
  </main>
</template>

<style scoped>
.restaurant-guide {
  display: flex;
  align-items: flex-start;
}

.text-content {
  flex: 2;
  padding-right: 1.5rem;
}

.image-content {
  flex: 1;
  margin-top: 300px;
}

img {
  object-fit: cover;
}
</style>
