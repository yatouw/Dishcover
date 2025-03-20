<script>
    let { children } = $props();
    import "../app.css";

    // Step 1: Create a state variable for the selected page
    let selectedPage = 'Home';

    // Step 2: Function to change the selected page
    function changePage(page) {
        selectedPage = page;
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
            <a href="#" on:click={() => changePage('Home')} class="flex items-center p-2 text-lg text-gray-900 rounded-lg hover:bg-gray-100 group">
               <img src="/assets/home.png" alt="Home Icon" class="w-6 h-6" />
               <span class="ms-3">Home</span>
            </a>
         </li>
         <li>
            <a href="#" on:click={() => changePage('Explore')} class="flex items-center p-2 text-lg text-gray-900 rounded-lg hover:bg-gray-100 group">
               <img src="/assets/direction.png" alt="Explore Icon" class="w-6 h-6" />
               <span class="ms-3">Explore</span>
            </a>
         </li>
         <li>
            <a href="#" on:click={() => changePage('Favorites')} class="flex items-center p-2 text-lg text-gray-900 rounded-lg hover:bg-gray-100 group">
               <img src="/assets/heart.png" alt="Favorites Icon" class="w-6 h-6" />
               <span class="ms-3">Favorites</span>
            </a>
         </li>
         <li>
            <a href="#" on:click={() => changePage('AR Experience')} class="flex items-center p-2 text-lg text-gray-900 rounded-lg hover:bg-gray-100 group">
               <img src="/assets/augmented-reality.png" alt="Community Icon" class="w-6 h-6" />
               <span class="ms-3">AR Experience</span>
            </a>
         </li>
         <li>
            <a href="#" on:click={() => changePage('Subscription')} class="flex items-center p-2 text-lg text-gray-900 rounded-lg hover:bg-gray-100 group">
               <img src="/assets/subscribe.png" alt="Subscription Icon" class="w-6 h-6" />
               <span class="ms-3">Subscription</span>
            </a>
         </li>
      </ul>
      <div class="mt-45 p-4 text-center">
         <p class="text-sm text-gray-600">Subscribe Now to get the premium access!</p>
         <button class="w-full mt-2 bg-orange-600 text-white py-2 rounded-lg text-md">SUBSCRIBE NOW</button>
      </div>
      <hr class="border-gray-300 my-3 mx-3 w-58" />
      <a href="#" class="flex items-center p-2 text-lg text-gray-900 rounded-lg hover:bg-gray-100 group">
         <img src="https://via.placeholder.com/24" alt="Profile Icon" class="w-6 h-6" />
         <span class="ms-3">Rodge Romer Muni</span>
      </a>
   </div>
</aside>

<div class="p-4 sm:ml-64">
   
         <!-- Step 3: Render content based on selectedPage -->
         <div class="col-span-3">
            {#if selectedPage === 'Home'}
               <h2 class="text-xl">Welcome to Home!</h2>
            {:else if selectedPage === 'Explore'}
               <h2 class="text-xl">Explore the World!</h2>
            {:else if selectedPage === 'Favorites'}
               <h2 class="text-xl">Your Favorites!</h2>
            {:else if selectedPage === 'AR Experience'}
               <h2 class="text-xl">Experience AR!</h2>
            {:else if selectedPage === 'Subscription'}
               <h2 class="text-xl">Subscription Details!</h2>
            {/if}
         </div>
      
</div>

{@render children()}