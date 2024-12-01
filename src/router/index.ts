import { createRouter, createWebHistory } from 'vue-router';
import { getAuth } from 'firebase/auth';
import WelcomeView from '@/views/Welcome/WelcomeView.vue';
import AboutView from '../views/About/AboutView.vue';
import LoginView from '@/views/Login/LoginView.vue';
import SignUpView from '@/views/SignUp/SignUpView.vue';
import HomeView from '@/views/Home/HomeView.vue';
import ExperiencesView from '@/views/Experiences/ExperiencesView.vue';
import TestingComponents from '@/views/testing-components/TestingComponents.vue';
import TouristDashboard from '@/views/TouristDashboard/TouristDashboard.vue';

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
    {
      path: '/dashboard',
      name: 'dashboard',
      component: TouristDashboard
    }
  ],
});

// Redirection
router.beforeEach(async (to, from, next) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (to.name === 'welcome' && user) {
    // redirects if user *is* logged in
    next({ name: 'home' });
  } else if (to.name === 'signup' && user) {
    next({ name: 'home' });
  } else if (to.name === 'login' && user) {
    next({ name: 'home' });
    // redirects if user is *not* logged in
  } else if (to.name === 'home' && !user) {
    next({ name: 'signup' });
  } else if (to.name === 'experiences' && !user) {
    next({ name: 'signup' });
  } else {
    // proceed normally if user is not logged in
    next();
  }
});

export default router;
