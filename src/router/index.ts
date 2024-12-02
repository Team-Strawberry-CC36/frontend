import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import WelcomeView from '@/views/Welcome/WelcomeView.vue';
import AboutView from '../views/About/AboutView.vue';
import LoginView from '@/views/Login/LoginView.vue';
import SignUpView from '@/views/SignUp/SignUpView.vue';
import HomeView from '@/views/Home/HomeView.vue';
import ExperiencesView from '@/views/Experiences/ExperiencesView.vue';
import TestingComponents from '@/views/testing-components/TestingComponents.vue';
import TouristDashboard from '@/views/TouristDashboard/TouristDashboardView.vue';

const auth = getAuth();

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

// Sets initial login state check variable to false
let isAuthInitialized = false;

// Promise function to check current login state
function checkAuthState() {
  return new Promise((resolve) => {
    if (isAuthInitialized) {
      resolve(auth.currentUser);
    } else {
      // If initial state is false, swap to true then check login
      onAuthStateChanged(auth, (user) => {
        isAuthInitialized = true;
        resolve(user);
      });
    }
  });
}

// Entry restrictions for log in status
// Unaccessible pages for logged in users
const logInRestrictions = ['welcome', 'login', 'signup'];
// Unaccessible pages for logged out users
const logOutRestrictions = ['home', 'experiences', 'dashboard'];

// Redirects the user when logging in and logging out
onAuthStateChanged(auth, (user) => {
  const currentRouteName = router.currentRoute.value.name;

  if (user) {
    // User is logged in, redirect to the home page
    if (logInRestrictions.includes(currentRouteName as string)) {
      router.push({ name: 'home' });
    }
  } else {
    // User is logged out, redirect to the login page
    if (logOutRestrictions.includes(currentRouteName as string)) {
      router.push({ name: 'login' });
    }
  }
});

// Redirection
router.beforeEach(async (to, from, next) => {
  // Checks login state first before redirection
  const user = await checkAuthState();

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
  } else if (to.name === 'dashboard' && !user) {
    next({ name: 'signup' });
  } else {
    // proceed normally if user is not logged in
    next();
  }
});

export default router;
