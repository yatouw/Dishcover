<script lang="ts">
    import type { PageData } from './$types.js';
    import { searchRecipeVideo } from '$lib/api/youtubeApi';
    import { webXRManager } from '$lib/api/webxrApi';
    import { onMount } from 'svelte';

    let loading = false;
    let youtubeVideo: any = null;
    let isARActive = false;
    let selectedRecipe = 'Chicken Alfredo';
    let isVRMode = false;
    let xrSupported = false;

    const demoRecipes = [
        'Chicken Alfredo',
        'Spaghetti Carbonara',
        'Beef Stir Fry',
        'Vegetable Curry',
        'Chocolate Cake'
    ];

    onMount(async () => {
        xrSupported = await webXRManager.checkSupport();
    });

    async function startARExperience() {
        loading = true;
        try {
            youtubeVideo = await searchRecipeVideo(selectedRecipe);
            isARActive = true;
        } catch (error) {
            console.error('Error loading video:', error);
        } finally {
            loading = false;
        }
    }

    async function toggleVRMode() {
        if (!xrSupported) {
            alert('WebXR is not supported on your device. Please try a different browser or device.');
            return;
        }

        try {
            if (!isVRMode) {
                await webXRManager.startSession();
                isVRMode = true;
            } else {
                await webXRManager.endSession();
                isVRMode = false;
            }
        } catch (error) {
            console.error('Error toggling VR mode:', error);
        }
    }

    function handleRecipeSelect(recipe: string) {
        selectedRecipe = recipe;
        isARActive = false;
        isVRMode = false;
    }
</script>

<div class="min-h-screen bg-white">
    
    <main class="container mx-auto px-6 pt-6">
        <h1 class="text-3xl font-bold mb-4">AR/VR Cooking Experience</h1>
        
        {#if !isARActive}
            <div class="bg-white shadow-lg rounded-[20px] p-8">
                <div class="grid lg:grid-cols-2 gap-8">
                    <div class="space-y-6">
                        <div>
                            <h2 class="text-2xl font-semibold text-gray-800 mb-2">Immersive Cooking Lessons</h2>
                            <p class="text-gray-600 leading-relaxed">
                                Experience cooking in virtual reality! Watch cooking tutorials in an immersive 360° environment, 
                                with step-by-step instructions floating around you. Perfect for hands-free cooking guidance.
                            </p>
                        </div>

                        <div>
                            <h3 class="text-lg font-medium text-gray-800 mb-3">Select a Recipe</h3>
                            <div class="flex flex-wrap gap-3">
                                {#each demoRecipes as recipe}
                                    <button
                                        class="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                                            {selectedRecipe === recipe 
                                                ? 'bg-orange-600 text-white' 
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
                                        on:click={() => handleRecipeSelect(recipe)}
                                    >
                                        {recipe}
                                    </button>
                                {/each}
                            </div>
                        </div>

                        <button 
                            class="w-full bg-orange-600 text-white px-6 py-3 rounded-lg font-medium
                                hover:bg-orange-700 transition-colors duration-200 flex items-center justify-center gap-2"
                            on:click={startARExperience}
                            disabled={loading}
                        >
                            {#if loading}
                                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Loading...
                            {:else}
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                </svg>
                                Start VR Experience
                            {/if}
                        </button>
                    </div>

                    <div class="relative">
                        <img src="/assets/ar-cooking.jpg" alt="VR Cooking" class="rounded-[15px] shadow-lg">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-[15px]"></div>
                        <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <h3 class="text-xl font-semibold mb-2">Watch & Cook in VR</h3>
                            <p class="text-sm opacity-90">Follow along with the video tutorial in virtual reality</p>
                        </div>
                    </div>
                </div>
            </div>
        {:else}
            <div class="bg-white shadow-lg rounded-[20px] p-8">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-semibold text-gray-800">VR Cooking Mode</h2>
                    <!-- svelte-ignore a11y_consider_explicit_label -->
                    <div class="flex items-center gap-4">
                        <button 
                            class="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-700 transition-colors duration-200"
                            on:click={toggleVRMode}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                            </svg>
                            {isVRMode ? 'Exit VR' : 'Enter VR'}
                        </button>
                        <!-- svelte-ignore a11y_consider_explicit_label -->
                        <button 
                            class="text-gray-600 hover:text-gray-800 transition-colors duration-200"
                            on:click={() => isARActive = false}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {#if youtubeVideo}
                    <div class="relative">
                        <!-- svelte-ignore a11y_missing_attribute -->
                        <iframe
                            src={`https://www.youtube.com/embed/${youtubeVideo.videoId}?autoplay=1&controls=1&vr=1&rel=0`}
                            class="w-full aspect-video rounded-[15px] shadow-lg"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; xr-spatial-tracking"
                            allowfullscreen
                        ></iframe>
                        <div class="mt-3">
                            <p class="text-sm text-gray-600 font-medium">{youtubeVideo.channelTitle}</p>
                        </div>
                    </div>

                    <div class="mt-6 bg-gray-50 rounded-[15px] p-6">
                        <h3 class="text-lg font-semibold text-gray-800 mb-3">VR Controls</h3>
                        <div class="grid grid-cols-2 gap-4">
                            <button class="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                <span class="text-gray-700">Pin Video</span>
                            </button>
                            <button class="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                <span class="text-gray-700">Add Notes</span>
                            </button>
                        </div>
                    </div>
                {:else}
                    <div class="text-center py-12">
                        <p class="text-gray-500">No video available for this recipe.</p>
                    </div>
                {/if}
            </div>
        {/if}
    </main>
</div>