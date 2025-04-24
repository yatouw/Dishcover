<script lang="ts">
    import { fade } from 'svelte/transition';
    import { goto } from '$app/navigation';
    import { getRecipesList } from '$lib/api/tastyApi';
    import { onMount } from 'svelte';
    import RecipeModal from '$lib/components/RecipeModal.svelte';
    import { searchResults, isSearching, searchError, clearSearch, searchQuery } from '$lib/stores/searchStore';

    let isMenuOpen = false;
    let localSearchQuery = '';
    let randomRecipes: any[] = [];
    let loading = true;
    let currentPage = 0;
    let hasMoreRecipes = true;
    const recipesPerPage = 9;
    let error: string | null = null;
    let selectedRecipe: any = null;
    let isModalOpen = false;

    async function loadRandomRecipes() {
        loading = true;
        error = null;
        
        try {
            const response = await getRecipesList('', currentPage * recipesPerPage, recipesPerPage);
            if (!response.error) {
                randomRecipes = response.data;
                // Check if we have more recipes for pagination
                const nextPageResponse = await getRecipesList('', (currentPage + 1) * recipesPerPage, 1);
                hasMoreRecipes = !nextPageResponse.error && nextPageResponse.data.length > 0;
            } else {
                error = response.error;
            }
        } catch (err) {
            console.error('Error loading random recipes:', err);
            error = 'Failed to load recipes. Please try again later.';
        } finally {
            loading = false;
        }
    }

    async function handlePageChange(direction: 'prev' | 'next') {
        if (direction === 'prev' && currentPage > 0) {
            currentPage--;
            await loadRandomRecipes();
        } else if (direction === 'next' && hasMoreRecipes) {
            currentPage++;
            await loadRandomRecipes();
        }
    }

    async function handleSearch() {
        if (!localSearchQuery.trim()) {
            clearSearch();
            await loadRandomRecipes();
            return;
        }

        isSearching.set(true);
        searchError.set(null);

        try {
            const response = await getRecipesList(localSearchQuery, 0, 20);
            if (!response.error) {
                searchResults.set(response.data);
                searchQuery.set(localSearchQuery);
            } else {
                searchError.set(response.error);
                searchResults.set([]);
            }
        } catch (error) {
            console.error('Search error:', error);
            searchError.set('Failed to search recipes. Please try again later.');
            searchResults.set([]);
        } finally {
            isSearching.set(false);
        }
    }

    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            handleSearch();
        }
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
        await loadRandomRecipes();
    });

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
                        bind:value={localSearchQuery}
                        on:keydown={handleKeyDown}
                    >
                </div>
                <button 
                    class="p-4 hover:bg-gray-50 rounded-[15px] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.1)]"
                    on:click={handleSearch}
                >
                    <img src="/assets/settings.png" alt="filter" class="w-6 h-6">
                </button>
            </div>
        </div>
    </div>
</header> 

<div class="min-h-screen bg-white">
    <main class="container mx-auto px-6 pt-6">
        <!-- Add Title Section -->
        <div class="flex justify-center mb-8">
            <div class="w-[147vh]">
                <h2 class="text-2xl font-semibold">Explore Recipes</h2>
                <p class="text-gray-500 text-sm mt-1">Discover new and exciting recipes</p>
            </div>
        </div>

        {#if $searchError}
            <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span class="block sm:inline">{$searchError}</span>
            </div>
        {/if}

        {#if $isSearching}
            <div class="grid grid-cols-3 gap-6">
                {#each Array(9) as _, i}
                    <div class="animate-pulse">
                        <div class="bg-gray-200 h-48 rounded-[15px] mb-4"></div>
                        <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                {/each}
            </div>
        {:else if $searchResults.length > 0}
            <div class="grid grid-cols-3 gap-6">
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
                        </div>
                        <div class="flex justify-between items-center">
                            <h3 class="text-lg font-medium">{recipe.name}</h3>
                        </div>
                    </div>
                {/each}
            </div>
        {:else}
            <div class="grid grid-cols-3 gap-6">
                {#each randomRecipes as recipe}
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
                        </div>
                        <div class="flex justify-between items-center">
                            <h3 class="text-lg font-medium">{recipe.name}</h3>
                        </div>
                    </div>
                {/each}
            </div>

            <div class="flex justify-center mt-6 gap-4">
                <button 
                    class="px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-50"
                    on:click={() => handlePageChange('prev')}
                    disabled={currentPage === 0}
                >
                    Previous
                </button>
                <button 
                    class="px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-50"
                    on:click={() => handlePageChange('next')}
                    disabled={!hasMoreRecipes}
                >
                    Next
                </button>
            </div>
        {/if}
    </main>

    <RecipeModal 
        recipe={selectedRecipe} 
        isOpen={isModalOpen} 
        onClose={handleModalClose} 
    />
</div>
