<script lang="ts">
    import type { PageData } from './$types.js';
    import { fade } from 'svelte/transition';
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }
</script>

<div class="container mx-auto p-6">
    <!-- Menu Button -->
    <div class="absolute top-2 right-4">
        <div class="relative">
            <button 
                class="p-2 hover:bg-gray-100 rounded-lg transition-colors" 
                on:click={toggleMenu}
            >
                <div class="w-6 h-5 flex flex-col justify-between">
                    <div class="w-full h-0.5 bg-gray-600 rounded-full"></div>
                    <div class="w-full h-0.5 bg-gray-600 rounded-full"></div>
                    <div class="w-full h-0.5 bg-gray-600 rounded-full"></div>
                </div>
            </button>

            {#if isMenuOpen}
            <div 
                class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
                transition:fade
            >
                <button 
                    class="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
                >
                    Login
                </button>
                <button 
                    class="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
                >
                    Sign up
                </button>
            </div>
            {/if}
        </div>
    </div>

    <!-- Search Bar -->
    <div class="relative mt-6 mb-12">
        <div class="flex items-center justify-center gap-3">
            <div class="flex items-center bg-white rounded-[15px] shadow-[0_2px_10px_rgba(0,0,0,0.1)] w-[140vh]">
                <div class="pl-5">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input 
                    type="text" 
                    placeholder="What do you want to cook today?" 
                    class="w-full py-4 px-4 rounded-[15px] focus:outline-none text-[15px] placeholder-gray-500"
                >
            </div>
            <button class="p-4 hover:bg-gray-50 rounded-[15px] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
                <img src="/assets/settings.png" alt="filter" class="w-6 h-6">
            </button>
        </div>
    </div>

    <!-- <div class="flex flex-col items-center">
        <h1 class="text-[32px] font-bold mb-4">Welcome to Dishcover</h1>
        <p class="text-gray-600 text-lg mb-8">Discover delicious recipes and culinary experiences!</p>
        
        <div class="grid grid-cols-2 gap-6 w-full max-w-4xl">
            <div class="bg-white p-6 rounded-[15px] shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
                <h2 class="text-xl font-semibold mb-3">Featured Recipe</h2>
                <p class="text-gray-600">Spicy Chicken Tacos</p>
            </div>
            <div class="bg-white p-6 rounded-[15px] shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
                <h2 class="text-xl font-semibold mb-3">Trending</h2>
                <p class="text-gray-600">Mediterranean Salad</p>
            </div>
        </div>
    </div> -->

    <div class="flex justify-center">
        <div class="w-[147vh]">
            <div class="flex justify-between items-center mb-4">
                <div>
                    <h2 class="text-2xl font-semibold">Recommended Recipes</h2>
                    <p class="text-gray-500 text-sm mt-1">Based on your preferences</p>
                </div>
                <div class="flex gap-2">
                    <button class="p-2 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button class="p-2 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-3 gap-6">
                {#each Array(3) as _, i}
                <div class="relative bg-white p-4 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300">
                    <div class="relative bg-gray-200 h-48 rounded-[15px] mb-4">
                        <div class="absolute right-3 top-3">
                            <button class="p-2 rounded-full bg-white/80 hover:bg-white">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        </div>
                        <div class="absolute left-3 bottom-3 bg-white rounded-full px-3 py-1 flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span class="text-sm">30mins</span>
                        </div>
                    </div>
                    <div class="flex justify-between items-center">
                        <h3 class="text-lg font-medium">Italian Spaghetti</h3>
                        <div class="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span class="font-medium">4.5</span>
                        </div>
                    </div>
                </div>
                {/each}
            </div>
        </div>
    </div>

    <div class="flex justify-center mt-12">
        <div class="w-[147vh]">
            <div class="flex justify-between items-center mb-4">
                <div>
                    <h2 class="text-2xl font-semibold">Trending Recipes</h2>
                    <p class="text-gray-500 text-sm mt-1">Cooked by people with similar preferences</p>
                </div>
                <div class="flex gap-2">
                    <button class="p-2 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button class="p-2 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-3 gap-6">
                {#each Array(3) as _, i}
                <div class="relative bg-white p-4 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300">
                    <div class="relative bg-gray-200 h-48 rounded-[15px] mb-4">
                        <div class="absolute right-3 top-3">
                            <button class="p-2 rounded-full bg-white/80 hover:bg-white">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        </div>
                        <div class="absolute left-3 bottom-3 bg-white rounded-full px-3 py-1 flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span class="text-sm">30mins</span>
                        </div>
                    </div>
                    <div class="flex justify-between items-center">
                        <h3 class="text-lg font-medium">Italian Spaghetti</h3>
                        <div class="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span class="font-medium">4.5</span>
                        </div>
                    </div>
                </div>
                {/each}
            </div>
        </div>
    </div>
</div>