<script lang="ts">
import Landingnav from "$lib/navigation/landingnav.svelte";
</script>

<Landingnav />

<div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-4">
      Welcome to Our Platform
    </h1>
    <p class="text-gray-600 text-lg">
      Get started by logging in or creating a new account.
    </p>
  </div>
  
  <style lang="postcss">
    @reference "tailwindcss/theme";
    :global(html) {
      background-color: theme(--color-gray-200);
    }
  </style>