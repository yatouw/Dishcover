<script lang="ts">
    import type { PageData } from './$types.js';
    import { goto } from '$app/navigation';


</script>

<div class="min-h-screen bg-white">
    
    <main class="container mx-auto px-6 pt-6">
        <h1 class="text-3xl font-bold mb-4">Subscription Plans</h1>
        <div class="grid md:grid-cols-3 gap-6">
            <div class="bg-white shadow-md rounded-lg p-6 text-center">
                <h2 class="text-xl font-semibold">Basic Plan</h2>
                <p class="text-2xl font-bold mt-4">$4.99/month</p>
                <ul class="mt-4 space-y-2">
                    <li>Access to 100+ Recipes</li>
                    <li>Basic AR Features</li>
                </ul>
                <button  class="mt-4 bg-orange-600 text-white px-4 py-2 rounded-lg w-full">
                    Choose Basic
                </button>
            </div>
            <div class="bg-white shadow-md rounded-lg p-6 text-center">
                <h2 class="text-xl font-semibold">Pro Plan</h2>
                <p class="text-2xl font-bold mt-4">$9.99/month</p>
                <ul class="mt-4 space-y-2">
                    <li>Unlimited Recipes</li>
                    <li>Full AR Experience</li>
                    <li>Personalized Recommendations</li>
                </ul>
                <button class="mt-4 bg-orange-600 text-white px-4 py-2 rounded-lg w-full">
                    Choose Pro
                </button>
            </div>
            <div class="bg-white shadow-md rounded-lg p-6 text-center">
                <h2 class="text-xl font-semibold">Family Plan</h2>
                <p class="text-2xl font-bold mt-4">$14.99/month</p>
                <ul class="mt-4 space-y-2">
                    <li>5 User Accounts</li>
                    <li>All Pro Features</li>
                    <li>Family Meal Planning</li>
                </ul>
                <button  class="mt-4 bg-orange-600 text-white px-4 py-2 rounded-lg w-full">
                    Choose Family
                </button>
            </div>
        </div>
    </main>
</div>