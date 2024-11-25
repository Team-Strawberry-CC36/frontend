import { createRouter, createWebHistory } from 'vue-router';
import WelcomeView from '@/views/Welcome/WelcomeView.vue';
import AboutView from '../views/About/AboutView.vue';
import LoginView from '@/views/Login/LoginView.vue';
import SignUpView from '@/views/SignUp/SignUpView.vue';
import HomeView from '@/views/Home/HomeView.vue';
import ExperiencesView from '@/views/Experiences/ExperiencesView.vue';
import TestingComponents from '@/views/testing-components/TestingComponents.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: WelcomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/experiences',
      name: 'experiences',
      component: ExperiencesView,
    },
    {
      path: '/testing-components',
      name: 'testing',
      component: TestingComponents,
    },
  ],
});

export default router;
