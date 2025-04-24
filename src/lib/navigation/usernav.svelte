<script lang="ts">
   import { goto } from '$app/navigation';
	import { user } from '$lib/user';
	import { Button } from 'flowbite-svelte';

    // Function to navigate to different pages
    function navigateTo(page: string) {
        // Convert page name to lowercase and replace spaces with hyphens for route matching
        const route = page.toLowerCase().replace(/\s+/g, '-');
        goto(`/auth/user/${route}`);
    }

    async function handleLogout() {
        try {
            await user.logout();
            // Redirect to login page after successful logout
            goto('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    }
</script>

<button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-lg text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
   <span class="sr-only">Open sidebar</span>
   <img src="https://via.placeholder.com/24" alt="Menu Icon" class="w-8 h-8" />
</button>

<aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-70 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-white shadow-lg" aria-label="Sidebar">
   <div class="h-full px-3 py-4 overflow-y-auto">
      <div class="flex items-center justify-center mb-5">
         <img src="/assets/dishcover_logo.png" class="h-18 me-3 sm:h-22" alt="Dishcover Logo" />
      </div>
      <ul class="space-y-7 mt-20 px-5 font-medium">
         <li>
            <a href="/auth/user/home" on:click|preventDefault={() => navigateTo('home')} class="flex items-center p-2 text-lg text-gray-900 rounded-lg hover:bg-gray-100 group">
               <img src="/assets/home.png" alt="Home Icon" class="w-6 h-6" />
               <span class="ms-3">Home</span>
            </a>
         </li>
         <li>
            <a href="/auth/user/explore" on:click|preventDefault={() => navigateTo('explore')} class="flex items-center p-2 text-lg text-gray-900 rounded-lg hover:bg-gray-100 group">
               <img src="/assets/direction.png" alt="Explore Icon" class="w-6 h-6" />
               <span class="ms-3">Explore</span>
            </a>
         </li>
         <li>
            <a href="/auth/user/favorites" on:click|preventDefault={() => navigateTo('favorites')} class="flex items-center p-2 text-lg text-gray-900 rounded-lg hover:bg-gray-100 group">
               <img src="/assets/heart.png" alt="Favorites Icon" class="w-6 h-6" />
               <span class="ms-3">Favorites</span>
            </a>
         </li>
         <li>
            <a href="/auth/user/ar" on:click|preventDefault={() => navigateTo('ar')} class="flex items-center p-2 text-lg text-gray-900 rounded-lg hover:bg-gray-100 group">
               <img src="/assets/augmented-reality.png" alt="Community Icon" class="w-6 h-6" />
               <span class="ms-3">AR Experience</span>
            </a>
         </li>
         <li>
            <a href="/auth/user/subscription" on:click|preventDefault={() => navigateTo('subscription')} class="flex items-center p-2 text-lg text-gray-900 rounded-lg hover:bg-gray-100 group">
               <img src="/assets/subscribe.png" alt="Subscription Icon" class="w-6 h-6" />
               <span class="ms-3">Subscription</span>
            </a>
         </li>
      </ul>
      <div class="mt-45 p-4 text-center">
         <p class="text-sm text-gray-600">Subscribe Now to get the premium access!</p>
         <button  class="w-full mt-2 bg-orange-600 text-white py-2 rounded-lg text-md hover:bg-orange-700 transition-colors">SUBSCRIBE NOW</button>
         
         <!-- <div class="mt-4 space-y-2">

            <a href="/auth/login" on:click|preventDefault={() => navigateTo('auth/login')} class="w-full inline-block bg-white border-2 border-orange-600 text-orange-600 py-2 rounded-lg text-md hover:bg-orange-50 transition-colors">
               Login
            </a>
   
            <a href="/auth/register" on:click|preventDefault={() => navigateTo('auth/register')} class="w-full inline-block bg-orange-600 text-white py-2 rounded-lg text-md hover:bg-orange-700 transition-colors">
               Sign Up
            </a>
         </div>  -->
      </div>
      <hr class="border-gray-300 my-3 mx-3 w-58" />
      <div class="px-2">
         <Button 
            color="red" 
            on:click={handleLogout}
            class="w-full"
         >
            Logout
         </Button>
</aside>

<div class="p-4 sm:ml-64">
   <slot />
</div>