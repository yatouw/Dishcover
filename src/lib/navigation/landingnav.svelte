<script>
  import { Button } from 'flowbite-svelte';
  import { goto } from '$app/navigation';

  function navigateToLogin() {
    goto('/auth/login');
  }

  function navigateToRegister() {
    goto('/auth/register');
  }
</script>

<nav class="bg-white border-gray-200 px-4 py-3 shadow-sm">
  <div class="flex justify-between items-center">
    <div class="text-xl font-semibold">Dishcover</div>
    <div class="flex gap-4">
      <Button color="light" on:click={navigateToLogin}>Login</Button>
      <Button color="blue" on:click={navigateToRegister}>Sign Up</Button>
    </div>
  </div>
</nav>
