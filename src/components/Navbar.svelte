<script lang="ts">
    import { fade } from 'svelte/transition';
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }
</script>

<header class="w-full bg-white">
    <div class="container mx-auto p-6 relative">
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
        <div class="relative mt-6">
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
    </div>
</header> 