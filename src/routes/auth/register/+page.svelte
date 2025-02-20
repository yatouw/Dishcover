<script lang="ts">
  import { goto } from '$app/navigation';
  import { Button, Input, Label } from 'flowbite-svelte';

  let email = '';
  let password = '';
  let confirmPassword = '';
  let errorMessage = '';

  async function handleRegister() {
    try {
      if (!email || !password || !confirmPassword) {
        errorMessage = 'Please fill in all fields';
        return;
      }

      if (password !== confirmPassword) {
        errorMessage = 'Passwords do not match';
        return;
      }

      // Here you would typically make an API call to your backend
      // For now, we'll just simulate a successful registration
      localStorage.setItem('isLoggedIn', 'true');
      goto('/userhome');
    } catch (error) {
      errorMessage = 'Registration failed. Please try again.';
    }
  }

  function navigateToLogin() {
    goto('/auth/login');
  }
</script>

<svelte:head>
  <title>Register - Dishcover</title>
</svelte:head>

<h2>Create your account</h2>

<form class="space-y-6" on:submit|preventDefault={handleRegister}>
  <div>
    <Label for="email" class="block text-sm font-medium text-gray-700">Email address</Label>
    <Input
      id="email"
      type="email"
      bind:value={email}
      required
      class="mt-1"
    />
  </div>

  <div>
    <Label for="password" class="block text-sm font-medium text-gray-700">Password</Label>
    <Input
      id="password"
      type="password"
      bind:value={password}
      required
      class="mt-1"
    />
  </div>

  <div>
    <Label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</Label>
    <Input
      id="confirmPassword"
      type="password"
      bind:value={confirmPassword}
      required
      class="mt-1"
    />
  </div>

  {#if errorMessage}
    <p class="text-red-500 text-sm">{errorMessage}</p>
  {/if}

  <div>
    <Button type="submit" color="blue" class="w-full">Register</Button>
  </div>

  <div class="text-sm text-center">
    <span class="text-gray-600">Already have an account?</span>
    <button
      type="button"
      class="ml-1 text-blue-600 hover:text-blue-500"
      on:click={navigateToLogin}
    >
      Sign in here
    </button>
  </div>
</form>
