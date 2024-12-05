import './assets/main.css';
import "vue-toastification/dist/index.css";

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Toast from "vue-toastification";
import type { PluginOptions } from "vue-toastification";

import App from './App.vue';
import router from './router';

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

const toastOptions: PluginOptions = {
  // Toast display options
};

app.use(pinia);
app.use(router);
app.use(Toast, toastOptions);

app.mount('#app');
