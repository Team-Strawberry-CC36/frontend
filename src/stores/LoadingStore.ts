import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useLoadingStore = defineStore('loadScreenStore', () => {
  const loading = ref(false);

  return { loading };
});
