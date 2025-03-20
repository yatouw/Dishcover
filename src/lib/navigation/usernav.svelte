<script lang="ts">
    import { goto } from '$app/navigation';

    // Function to navigate to different pages
    function navigateTo(page: string) {
        // Convert page name to lowercase and replace spaces with hyphens for route matching
        const route = page.toLowerCase().replace(/\s+/g, '-');
        goto(`/${route}`);
    }
</script>

<button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-lg text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
   <span class="sr-only">Open sidebar</span>
   <img src="https://via.placeholder.com/24" alt="Menu Icon" class="w-8 h-8" />
</button>

<aside id="logo-sidebar" class="fixed top-6 left-0 z-40 w-70 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-white shadow-lg" aria-label="Sidebar">
   <div class="h-full px-3 py-4 overflow-y-auto">
      <div class="flex items-center justify-center mb-5">
         <img src="/assets/dishcover_logo.png" class="h-18 me-3 sm:h-22" alt="Dishcover Logo" />
      </div>
      <ul class="space-y-7 mt-20 px-5 font-medium">
         <li>
            <!-- svelte-ignore event_directive_deprecated -->
            <a href="/" on:click|preventDefault={() => navigateTo('Home')} class="flex items-center p-2 text-lg text-gray-900 rounded-lg hover:bg-gray-100 group">
               <img src="/assets/home.png" alt="Home Icon" class="w-6 h-6" />
               <span class="ms-3">Home</span>
            </a>
         </li>
         <li>
            <!-- svelte-ignore event_directive_deprecated -->
            <a href="/explore" on:click|preventDefault={() => navigateTo('Explore')} class="flex items-center p-2 text-lg text-gray-900 rounded-lg hover:bg-gray-100 group">
               <img src="/assets/direction.png" alt="Explore Icon" class="w-6 h-6" />
               <span class="ms-3">Explore</span>
            </a>
         </li>
         <li>
            <!-- svelte-ignore event_directive_deprecated -->
            <a href="/favorites" on:click|preventDefault={() => navigateTo('Favorites')} class="flex items-center p-2 text-lg text-gray-900 rounded-lg hover:bg-gray-100 group">
               <img src="/assets/heart.png" alt="Favorites Icon" class="w-6 h-6" />
               <span class="ms-3">Favorites</span>
            </a>
         </li>
         <li>
            <!-- svelte-ignore event_directive_deprecated -->
            <a href="/ar" on:click|preventDefault={() => navigateTo('Ar')} class="flex items-center p-2 text-lg text-gray-900 rounded-lg hover:bg-gray-100 group">
               <img src="/assets/augmented-reality.png" alt="Community Icon" class="w-6 h-6" />
               <span class="ms-3">AR Experience</span>
            </a>
         </li>
         <li>
            <!-- svelte-ignore event_directive_deprecated -->
            <a href="/subscription" on:click|preventDefault={() => navigateTo('Subscription')} class="flex items-center p-2 text-lg text-gray-900 rounded-lg hover:bg-gray-100 group">
               <img src="/assets/subscribe.png" alt="Subscription Icon" class="w-6 h-6" />
               <span class="ms-3">Subscription</span>
            </a>
         </li>
      </ul>
    
      <hr class="border-gray-300 my-3 mx-3 w-58" />
      <!-- svelte-ignore a11y_invalid_attribute -->
      <a href="#" class="flex items-center p-2 text-lg text-gray-900 rounded-lg hover:bg-gray-100 group">
          <img src="https://via.placeholder.com/24" alt="Profile Icon" class="w-6 h-6" />
          <span class="ms-3">Guess</span>
      </a>
   </div>
</aside>

<!-- svelte-ignore slot_element_deprecated -->
<div class="p-4 sm:ml-64">
   <slot />
</div>