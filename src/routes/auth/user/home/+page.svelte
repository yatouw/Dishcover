<script lang="ts">
    import type { PageData } from './$types.js';
    import { fade } from 'svelte/transition';
    import { goto } from '$app/navigation';
    import { getRecipesList, getTrendingRecipes } from '$lib/api/tastyApi';
    import { onMount } from 'svelte';
    import RecipeModal from '$lib/components/RecipeModal.svelte';
    import { searchResults, isSearching, searchError, clearSearch } from '$lib/stores/searchStore';

    let isMenuOpen = false;
    let recommendedRecipes: any[] = [];
    let trendingRecipes: any[] = [];
    let loading = true;
    let recommendedPage = 0;
    let trendingPage = 0;
    const recipesPerPage = 3;
    let selectedRecipe: any = null;
    let isModalOpen = false;


    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }

    function navigateToLogin() {
        clearSearch();
        goto('/auth/login');
    }

    function navigateToRegister() {
        clearSearch();
        goto('/auth/register');
    }


    async function loadRecommendedRecipes() {
        try {
            const response = await getRecipesList('under_30_minutes', recommendedPage * recipesPerPage, recipesPerPage);
            if (!response.error) {
                recommendedRecipes = response.data;
            }
        } catch (error) {
            console.error('Error loading recommended recipes:', error);
        }
    }

    async function loadTrendingRecipes() {
        try {
            const response = await getTrendingRecipes(trendingPage * recipesPerPage, recipesPerPage);
            if (!response.error) {
                trendingRecipes = response.data;
            }
        } catch (error) {
            console.error('Error loading trending recipes:', error);
        }
    }

    async function handleRecommendedPageChange(direction: 'prev' | 'next') {
        if (direction === 'prev' && recommendedPage > 0) {
            recommendedPage--;
        } else if (direction === 'next') {
            recommendedPage++;
        }
        await loadRecommendedRecipes();
    }

    async function handleTrendingPageChange(direction: 'prev' | 'next') {
        if (direction === 'prev' && trendingPage > 0) {
            trendingPage--;
        } else if (direction === 'next') {
            trendingPage++;
        }
        await loadTrendingRecipes();
    }

    function handleRecipeClick(recipe: any) {
        selectedRecipe = recipe;
        isModalOpen = true;
    }

    function handleModalClose() {
        isModalOpen = false;
        selectedRecipe = null;
    }

    onMount(async () => {
        clearSearch();
        await Promise.all([loadRecommendedRecipes(), loadTrendingRecipes()]);
        loading = false;
    });
</script>


<header class="w-full bg-white">
    <div class="container mx-auto p-6 relative">
        <!-- Menu Button -->
        <div class="absolute top-2 right-4">
            <div class="relative">
                <!-- svelte-ignore a11y_consider_explicit_label -->
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
                        on:click={navigateToLogin}
                    >
                        Login
                    </button>
                    <button 
                        class="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
                        on:click={navigateToRegister}
                    >
                        Sign up
                    </button>
                </div>
                {/if}
            </div>
        </div>

      
</header> 
<div class="min-h-screen bg-white">
   
    
    <main class="container mx-auto px-6 pt-6">
        {#if $searchError}
            <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span class="block sm:inline">{$searchError}</span>
            </div>
        {/if}

        {#if $isSearching}
            <div class="grid grid-cols-3 gap-6">
                {#each Array(3) as _, i}
                    <div class="animate-pulse">
                        <div class="bg-gray-200 h-48 rounded-[15px] mb-4"></div>
                        <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                {/each}
            </div>
        {:else if $searchResults.length > 0}
            <div class="grid grid-cols-3 gap-6">
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                {#each $searchResults as recipe}
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div 
                        class="relative bg-white p-4 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 cursor-pointer"
                        on:click={() => handleRecipeClick(recipe)}
                    >
                        <div class="relative bg-gray-200 h-48 rounded-[15px] mb-4">
                            <img src={recipe.thumbnail_url} alt={recipe.name} class="w-full h-full object-cover rounded-[15px]" />
                            <div class="absolute right-3 top-3">
                                <!-- svelte-ignore a11y_consider_explicit_label -->
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
                                <span class="text-sm">{recipe.total_time_minutes}mins</span>
                            </div>
                        </div>
                        <div class="flex justify-between items-center">
                            <h3 class="text-lg font-medium">{recipe.name}</h3>
                            <div class="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span class="font-medium">{recipe.user_ratings.score.toFixed(1)}</span>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        {:else}
        <div class="flex justify-center">
            <div class="w-[147vh]">
                <div class="flex justify-between items-center mb-4">
                    <div>
                        <h2 class="text-2xl font-semibold">Recommended Recipes</h2>
                        <p class="text-gray-500 text-sm mt-1">Based on your preferences</p>
                    </div>
                    <div class="flex gap-2">
                        <!-- svelte-ignore a11y_consider_explicit_label -->
                        <button 
                            class="p-2 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.1)] disabled:opacity-50" 
                            on:click={() => handleRecommendedPageChange('prev')}
                            disabled={recommendedPage === 0}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <!-- svelte-ignore a11y_consider_explicit_label -->
                        <button 
                            class="p-2 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.1)]" 
                            on:click={() => handleRecommendedPageChange('next')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {#if loading}
                    <div class="grid grid-cols-3 gap-6">
                        {#each Array(3) as _, i}
                            <div class="animate-pulse">
                                <div class="bg-gray-200 h-48 rounded-[15px] mb-4"></div>
                                <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div class="h-4 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        {/each}
                    </div>
                {:else}
                    <div class="grid grid-cols-3 gap-6">
                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                        {#each recommendedRecipes as recipe}
                            <!-- svelte-ignore a11y_no_static_element_interactions -->
                            <div 
                                class="relative bg-white p-4 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 cursor-pointer"
                                on:click={() => handleRecipeClick(recipe)}
                            >
                                <div class="relative bg-gray-200 h-48 rounded-[15px] mb-4">
                                    <img src={recipe.thumbnail_url} alt={recipe.name} class="w-full h-full object-cover rounded-[15px]" />
                                    <div class="absolute right-3 top-3">
                                        <!-- svelte-ignore a11y_consider_explicit_label -->
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
                                        <span class="text-sm">{recipe.total_time_minutes}mins</span>
                                    </div>
                                </div>
                                <div class="flex justify-between items-center">
                                    <h3 class="text-lg font-medium">{recipe.name}</h3>
                                    <div class="flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span class="font-medium">{recipe.user_ratings.score.toFixed(1)}</span>
                                    </div>
                                </div>
                            </div>
                        {/each}
                    </div>
                {/if}
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
                        <!-- svelte-ignore a11y_consider_explicit_label -->
                        <button 
                            class="p-2 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.1)] disabled:opacity-50" 
                            on:click={() => handleTrendingPageChange('prev')}
                            disabled={trendingPage === 0}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <!-- svelte-ignore a11y_consider_explicit_label -->
                        <button 
                            class="p-2 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.1)]" 
                            on:click={() => handleTrendingPageChange('next')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {#if loading}
                    <div class="grid grid-cols-3 gap-6">
                        {#each Array(3) as _, i}
                            <div class="animate-pulse">
                                <div class="bg-gray-200 h-48 rounded-[15px] mb-4"></div>
                                <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div class="h-4 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        {/each}
                    </div>
                {:else}
                    <div class="grid grid-cols-3 gap-6">
                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                        <!-- svelte-ignore a11y_no_static_element_interactions -->
                        {#each trendingRecipes as recipe}
                            <!-- svelte-ignore a11y_click_events_have_key_events -->
                            <div 
                                class="relative bg-white p-4 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 cursor-pointer"
                                on:click={() => handleRecipeClick(recipe)}
                            >
                                <div class="relative bg-gray-200 h-48 rounded-[15px] mb-4">
                                    <img src={recipe.thumbnail_url} alt={recipe.name} class="w-full h-full object-cover rounded-[15px]" />
                                    <div class="absolute right-3 top-3">
                                        <!-- svelte-ignore a11y_consider_explicit_label -->
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
                                        <span class="text-sm">{recipe.total_time_minutes}mins</span>
                                    </div>
                                </div>
                                <div class="flex justify-between items-center">
                                    <h3 class="text-lg font-medium">{recipe.name}</h3>
                                    <div class="flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span class="font-medium">{recipe.user_ratings.score.toFixed(1)}</span>
                                    </div>
                                </div>
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>
        {/if}
    </main>

    <RecipeModal 
        recipe={selectedRecipe} 
        isOpen={isModalOpen} 
        onClose={handleModalClose} 
    />
</div>