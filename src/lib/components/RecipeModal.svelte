<script lang="ts">
    import { onMount } from 'svelte';
    import { searchRecipeVideo } from '$lib/api/youtubeApi';

    export let recipe: any;
    export let isOpen = false;
    export let onClose: () => void;

    let youtubeVideo: any = null;
    let loading = true;

    onMount(async () => {
        if (recipe) {
            loading = true;
            youtubeVideo = await searchRecipeVideo(recipe.name);
            loading = false;
        }
    });

    function handleClose() {
        onClose();
    }

    function handleBackdropClick(event: MouseEvent) {
        if (event.target === event.currentTarget) {
            handleClose();
        }
    }
</script>

{#if isOpen}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div 
        class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
        on:click={handleBackdropClick}
    >
        <div class="bg-white rounded-[20px] w-[90vw] max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div class="relative">
                <!-- svelte-ignore a11y_consider_explicit_label -->
                <button 
                    class="absolute right-4 top-4 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg z-10 transition-colors duration-200"
                    on:click={handleClose}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div class="p-8">
                    <div class="flex flex-col lg:flex-row gap-8">
                        <!-- Left Column - Image/Video -->
                        <div class="w-full lg:w-1/2">
                            {#if loading}
                                <div class="animate-pulse bg-gray-200 rounded-[15px] aspect-video"></div>
                            {:else if youtubeVideo}
                                <div class="relative">
                                    <!-- svelte-ignore a11y_missing_attribute -->
                                    <iframe
                                        src={`https://www.youtube.com/embed/${youtubeVideo.videoId}?autoplay=0`}
                                        class="w-full aspect-video rounded-[15px] shadow-lg"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen
                                    ></iframe>
                                    <div class="mt-3">
                                        <p class="text-sm text-gray-600 font-medium">{youtubeVideo.channelTitle}</p>
                                    </div>
                                </div>
                            {:else}
                                <img 
                                    src={recipe.thumbnail_url} 
                                    alt={recipe.name}
                                    class="w-full aspect-video object-cover rounded-[15px] shadow-lg"
                                />
                            {/if}
                        </div>

                        <!-- Right Column - Recipe Details -->
                        <div class="w-full lg:w-1/2">
                            <h2 class="text-3xl font-bold mb-4 text-gray-800">{recipe.name}</h2>
                            
                            <!-- Recipe Stats -->
                            <div class="flex items-center gap-6 mb-6">
                                <div class="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span class="font-medium text-gray-700">{recipe.user_ratings.score.toFixed(1)}</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span class="text-gray-700">{recipe.total_time_minutes} mins</span>
                                </div>
                            </div>

                            <!-- Description -->
                            <div class="mb-8">
                                <h3 class="text-xl font-semibold mb-3 text-gray-800">Description</h3>
                                <p class="text-gray-600 leading-relaxed">{recipe.description}</p>
                            </div>

                            <!-- Ingredients -->
                            <div>
                                <h3 class="text-xl font-semibold mb-4 text-gray-800">Ingredients</h3>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {#if recipe.sections && recipe.sections[0] && recipe.sections[0].components}
                                        {#each recipe.sections[0].components as ingredient}
                                            <div class="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                                                <div class="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2"></div>
                                                <span class="text-gray-700">{ingredient.raw_text}</span>
                                            </div>
                                        {/each}
                                    {:else}
                                        <div class="col-span-2 text-gray-500 italic">
                                            No ingredients information available
                                        </div>
                                    {/if}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if} 