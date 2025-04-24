<script lang="ts">
  import { goto } from '$app/navigation';
  import { Button, Input, Label } from 'flowbite-svelte';
  import { user } from '$lib/user';

  let name = '';
  let email = '';
  let password = '';
  let confirmPassword = '';
  let errorMessage = '';

  async function handleRegister() {
    console.log('Registration attempt with:', { name, email, password });
    try {
      if (!name || !email || !password || !confirmPassword) {
        errorMessage = 'Please fill in all fields';
        console.log('Validation failed: Missing fields');
        return;
      }

      if (password !== confirmPassword) {
        errorMessage = 'Passwords do not match';
        console.log('Validation failed: Passwords do not match');
        return;
      }

      console.log('Attempting to register user...');
      await user.register(email, password, name);
      console.log('Registration successful');
    } catch (error) {
      console.error('Registration error:', error);
      errorMessage = error instanceof Error ? error.message : 'Registration failed. Please try again.';
    }
  }

  function navigateToLogin() {
    goto('/auth/login');
  }

  function navigateBack() {
    goto('/');
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 relative">
  <!-- Back button -->
  <button 
    on:click={navigateBack}
    class="absolute top-4 left-4 flex items-center text-gray-600 hover:text-orange-600"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
    <span class="ml-2">Back</span>
  </button>

  <div class="max-w-md w-full m-4 space-y-8 bg-white p-8 rounded-xl shadow-lg">
    <div>
      <img class="mx-auto h-12 w-auto" src="/assets/dishcover_logo.png" alt="Dishcover Logo">
      <h2 class="mt-6 text-center text-3xl font-bold text-gray-900">Create Account</h2>
      <p class="mt-2 text-center text-sm text-gray-600">Join Dishcover today</p>
    </div>

    <form class="mt-8 space-y-6" on:submit|preventDefault={handleRegister}>
      <div class="rounded-md space-y-4">
        <div>
          <Label for="name" class="block text-sm font-medium text-gray-700">Full Name</Label>
          <Input
            id="name"
            type="text"
            bind:value={name}
            required
            class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <Label for="email" class="block text-sm font-medium text-gray-700">Email address</Label>
          <Input
            id="email"
            type="email"
            bind:value={email}
            required
            class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <Label for="password" class="block text-sm font-medium text-gray-700">Password</Label>
          <Input
            id="password"
            type="password"
            bind:value={password}
            required
            class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
            placeholder="Create a password"
          />
        </div>

        <div>
          <Label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            bind:value={confirmPassword}
            required
            class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
            placeholder="Confirm your password"
          />
        </div>
      </div>

      {#if errorMessage}
        <p class="text-red-500 text-sm text-center">{errorMessage}</p>
      {/if}

      <div>
        <Button type="submit" class="w-full py-2.5 px-4 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors">
          Create Account
        </Button>
      </div>

      <div class="text-sm text-center">
        <span class="text-gray-600">Already have an account?</span>
        <button
          type="button"
          class="ml-1 text-orange-600 hover:text-orange-500 font-medium"
          on:click={navigateToLogin}
        >
          Sign in here
        </button>
      </div>
    </form>
  </div>
</div>
