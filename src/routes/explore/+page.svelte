<script lang="ts">
    import type { PageData } from './$types.js';
    import Navbar from '../../components/Navbar.svelte';

    const cuisineTypes = [
        { name: 'Italian Cuisine', image: '/assets/italian-food.jpg', time: '30mins', rating: '4.5' },
        { name: 'Japanese Cuisine', image: '/assets/japanese-food.jpg', time: '45mins', rating: '4.7' },
        { name: 'Indian Cuisine', image: '/assets/indian-food.jpg', time: '40mins', rating: '4.6' },
        { name: 'Mexican Cuisine', image: '/assets/mexican-food.jpg', time: '35mins', rating: '4.4' },
        { name: 'Thai Cuisine', image: '/assets/thai-food.jpg', time: '25mins', rating: '4.3' },
        { name: 'French Cuisine', image: '/assets/french-food.jpg', time: '50mins', rating: '4.8' },
        { name: 'Chinese Cuisine', image: '/assets/chinese-food.jpg', time: '30mins', rating: '4.5' },
        { name: 'Mediterranean', image: '/assets/mediterranean-food.jpg', time: '35mins', rating: '4.6' },
        { name: 'Korean Cuisine', image: '/assets/korean-food.jpg', time: '40mins', rating: '4.7' }
    ];
</script>

<div class="min-h-screen bg-white">
    <Navbar />
    
    <main class="container mx-auto px-6 pt-6">
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

                <div class="mt-12">
                    <div class="flex justify-between items-center mb-4">
                        <div>
                            <h2 class="text-2xl font-semibold">Explore World Cuisines</h2>
                            <p class="text-gray-500 text-sm mt-1">Discover recipes from around the world</p>
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
                        {#each cuisineTypes as cuisine}
                        <div class="relative bg-white p-4 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300">
                            <div class="relative bg-gray-200 h-48 rounded-[15px] mb-4">
                                <img 
                                    src={cuisine.image} 
                                    alt={cuisine.name} 
                                    class="w-full h-full object-cover rounded-[15px]"
                                />
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
                                    <span class="text-sm">{cuisine.time}</span>
                                </div>
                            </div>
                            <div class="flex justify-between items-center">
                                <h3 class="text-lg font-medium">{cuisine.name}</h3>
                                <div class="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span class="font-medium">{cuisine.rating}</span>
                                </div>
                            </div>
                        </div>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>
