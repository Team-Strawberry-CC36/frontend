<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

const photolinks = [
  "https://gaijinpot.scdn3.secure.raxcdn.com/app/uploads/sites/6/2017/09/Ginzan-Onsen-Yamagata2.jpg",
  "https://travel.rakuten.com/contents/sites/contents/files/styles/max_1300x1300/public/2024-10/meiji-jingu-shrine_2.jpg?itok=HkxmWd-C",
  "https://d36tnp772eyphs.cloudfront.net/blogs/1/2019/02/Red-Torii-gates-in-Fushimi-Inari-shrine-in-Kyoto-Japan.jpg",
  "https://jw-webmagazine.com/wp-content/uploads/2019/06/jw-5d147f249c2d87.14657341.jpeg",
  "https://images.microcms-assets.io/assets/619bb8ae3f944560ae00d12e05c6b72c/14249ba27ac441279e22605d4d1ec2ad/the%20SUSHI_concept_text.webp"
]
</script>

<template>
  <div class="relative overflow-hidden w-screen bg-charcoal">
    <!-- Carousel -->
    <div v-if="photolinks.length" class="relative sm:absolute">
      <Carousel
        :wrapAround="true"
        :itemsToShow="1"
        :autoplay="5000"
        :mouseDrag="false"
        :touchDrag="false"
      >
        <Slide v-for="url in photolinks" :key="url">
          <img :src="url" alt="Place Photo" class="h-full"/>
        </Slide>
      </Carousel>
    </div>
    <div v-else>
      <p>No photos available</p>
    </div>

    <!-- Main content -->
    <main
      class="relative sm:absolute sm:top-1/4 w-full h-1/2 flex flex-col items-center justify-center z-10 bg-charcoal bg-opacity-80 text-white"
    >
      <div class="text-center px-5">
        <h1 class="text-5xl">Welcome to Jappuri</h1>
        <h2 class="mt-5">Cultural appreciation begins with understanding</h2>
      </div>
      <div class="mx-auto mt-10">
        <RouterLink
          class="bg-velvet text-frostWhite p-3 rounded-xl mx-5 hover:animate-pulse"
          to="/login"
        >
          Login
        </RouterLink>
        <RouterLink
          class="bg-velvet text-frostWhite p-3 rounded-xl mx-5 hover:animate-pulse"
          to="/signup"
        >
          Sign Up
        </RouterLink>
      </div>
    </main>
  </div>
</template>
