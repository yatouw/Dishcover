<script lang="ts">
  import { goto } from '$app/navigation';
  import { Button, Input, Label } from 'flowbite-svelte';

  let email = '';
  let password = '';
  let errorMessage = '';

  async function handleLogin() {
    try {
      // Here you would typically make an API call to your backend
      // For now, we'll just simulate a successful login
      if (email && password) {
        // Simulate successful login
        localStorage.setItem('isLoggedIn', 'true');
        goto('/userhome');
      } else {
        errorMessage = 'Please fill in all fields';
      }
    } catch (error) {
      errorMessage = 'Login failed. Please try again.';
    }
  }

  function navigateToRegister() {
    goto('/auth/register');
  }
</script>

<svelte:head>
  <title>Login - Dishcover</title>
</svelte:head>

<h2>Sign in to your account</h2>   

<form class="space-y-6" on:submit|preventDefault={handleLogin}>
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

  {#if errorMessage}
    <p class="text-red-500 text-sm">{errorMessage}</p>
  {/if}

  <div>
    <Button type="submit" color="blue" class="w-full">Sign in</Button>
  </div>

  <div class="text-sm text-center">
    <span class="text-gray-600">Don't have an account?</span>
    <button
      type="button"
      class="ml-1 text-blue-600 hover:text-blue-500"
      on:click={navigateToRegister}
    >
      Register here
    </button>
  </div>
</form>
