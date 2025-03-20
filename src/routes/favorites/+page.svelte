<script lang="ts">
    import type { PageData } from './$types.js';
</script>

<div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-4">Your Favorite Recipes</h1>
    <div class="space-y-4">
        <div class="bg-white shadow-md rounded-lg p-6 flex items-center">
            <img src="/assets/pasta.jpg" alt="Pasta" class="w-24 h-24 object-cover rounded-lg mr-4">
            <div>
                <h2 class="text-xl font-semibold">Creamy Carbonara</h2>
                <p class="text-gray-600">Added on: June 15, 2023</p>
            </div>
        </div>
        <div class="bg-white shadow-md rounded-lg p-6 flex items-center">
            <img src="/assets/sushi.jpg" alt="Sushi" class="w-24 h-24 object-cover rounded-lg mr-4">
            <div>
                <h2 class="text-xl font-semibold">Salmon Nigiri</h2>
                <p class="text-gray-600">Added on: May 22, 2023</p>
            </div>
        </div>
    </div>
</div>