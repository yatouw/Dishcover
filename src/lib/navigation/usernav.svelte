<script>
  import { Button } from 'flowbite-svelte';
  import { goto } from '$app/navigation';

  function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    goto('/');
  }

  function goToHome() {
    goto('/auth/user');
  }
</script>

<nav class="fixed top-0 left-0 right-0 bg-white border-gray-200 px-4 py-3 shadow-sm z-50">
  <div class="flex justify-between items-center">
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="text-xl font-semibold cursor-pointer" on:click={goToHome}>Dishcover</div>
    <div class="flex gap-4">
      <Button color="red" on:click={handleLogout}>Logout</Button>
    </div>
  </div>
</nav>

<!-- Add spacing to prevent content from hiding under the fixed nav -->
<div class="h-16"></div>
