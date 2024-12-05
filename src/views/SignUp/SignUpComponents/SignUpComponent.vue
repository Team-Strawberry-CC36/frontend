<script setup lang="ts">
import { ref, computed } from 'vue';
import { registerUserThroughFirebase } from '@/auth/auth';
import router from '@/router';
import authService from '@/services/auth.service';
import { useToast } from 'vue-toastification';

// Form inputs
const displayName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

// Computed validation logic
const usernameError = computed(() => {
  if (!displayName.value) return 'Username is required';
  if (!/^[a-zA-Z0-9]{4,}$/.test(displayName.value)) {
    return 'Username must be at least 4 characters and only contain letters and numbers';
  }
  return null;
});

const passwordError = computed(() => {
  if (!password.value) return 'Password is required';
  if (!/^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,}$/.test(password.value)) {
    return 'Password must be at least 8 characters and contain only letters, numbers, or special characters';
  }
  return null;
});

const confirmPasswordError = computed(() => {
  if (password.value !== confirmPassword.value) {
    return 'Passwords do not match';
  }
  return null;
});

const isEmailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value));

const isFormValid = computed(
  () =>
    !usernameError.value &&
    isEmailValid.value &&
    !passwordError.value &&
    !confirmPasswordError.value,
);

// Form submission
const handleSignUp = async () => {
  if (!isFormValid.value) {
    toast.error('Please fix the errors before submitting.', {
      timeout: 3000
    });
    return;
  }

  try {
    const { uid } = await registerUserThroughFirebase(
      email.value,
      password.value,
      displayName.value,
    );

    const response = await authService.createUser(uid);
    if (response.status === 201) {
      await router.push({ name: 'login' });
    } else {
      toast.error('Failed to create user in the database.', {
      timeout: 3000
      });
    }
  } catch (error) {
    toast.error('An error occurred during sign-up. Please try again.', {
      timeout: 3000
    });
    console.error('Sign-up error:', error);
  }
};

const toast = useToast();

</script>

<template>
  <div class="flex flex-col p-3 items-center h-fit sm:w-1/4 rounded-xl bg-frostWhite shadow-2xl">
    <span class="m-3 text-center">Sign up for Jappuri</span>
    <form class="flex flex-col w-full sm:w-4/5" @submit.prevent="handleSignUp">
      <!-- Username Field -->
      <div class="relative">
        <input
          type="text"
          v-model="displayName"
          placeholder="Username"
          :class="{
            'mb-0': usernameError,
            'mb-3': !usernameError,
          }"
          class="block p-1 border border-slate-400 rounded-xl w-full"
        />
        <p v-if="usernameError" class="text-red-500 text-sm">
          {{ usernameError }}
        </p>
      </div>

      <!-- Email Field -->
      <div class="relative">
        <input
          type="email"
          v-model="email"
          placeholder="Email"
          class="block p-1 mb-3 border border-slate-400 rounded-xl w-full"
        />
        <p v-if="!isEmailValid && email" class="text-red-500 text-sm absolute -bottom-4 left-1">
          Please enter a valid email
        </p>
      </div>

      <!-- Password Field -->
      <div class="relative">
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          :class="{
            'mb-0': passwordError,
            'mb-3': !passwordError,
          }"
          class="block p-1 border border-slate-400 rounded-xl w-full"
        />
        <p v-if="passwordError" class="text-red-500 text-sm">
          {{ passwordError }}
        </p>
      </div>

      <!-- Confirm Password Field -->
      <div class="relative">
        <input
          type="password"
          v-model="confirmPassword"
          placeholder="Confirm password"
          :class="{
            'mb-0': confirmPasswordError,
            'mb-3': !confirmPasswordError,
          }"
          class="block p-1 border border-slate-400 rounded-xl w-full"
        />
        <p v-if="confirmPasswordError" class="text-red-500 text-sm">
          {{ confirmPasswordError }}
        </p>
      </div>

      <!-- Submit Button -->
      <div class="mb-3 mx-auto">
        <button
          class="bg-charcoal text-frostWhite px-3 py-1 rounded-xl hover:animate-pulse disabled:opacity-50"
          :disabled="!isFormValid"
        >
          Sign Up
        </button>
      </div>
    </form>
    <RouterLink class="mb-3 text-center underline" to="/login"> To login </RouterLink>
  </div>
</template>
