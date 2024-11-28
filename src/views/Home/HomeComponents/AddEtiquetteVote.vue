<script setup lang="ts">
import { defineEmits } from 'vue';
const emit = defineEmits(['close-add-vote']);

</script>

<template>
    <p>Vote for etiquette!</p>
    <button @click="emit('close-add-vote')">Done!</button>
</template>