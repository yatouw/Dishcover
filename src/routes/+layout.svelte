<script lang="ts">
    import { goto } from '$app/navigation';
    import "../app.css";
    import LandingNav from '$lib/navigation/landingnav.svelte';
    import { page } from '$app/stores';
    import UserNav from '$lib/navigation/usernav.svelte';
    
    let { children } = $props();
    
    // Subscribe to the current path using derived
    const currentPath = $derived($page.url.pathname);
    
    // Function to navigate to different pages
    function navigateTo(page: string) {
        // Convert page name to lowercase and replace spaces with hyphens for route matching
        const route = page.toLowerCase().replace(/\s+/g, '-');
        goto(`/${route}`);
    }
</script>

{#if currentPath.startsWith('/auth/login') || currentPath.startsWith('/auth/register')}
    <!-- Render auth pages without navigation -->
    {@render children()}
{:else if currentPath.startsWith('/auth/user/home')}
    <!-- Render user pages with user navigation -->
    <UserNav>
        {@render children()}
    </UserNav>
{:else}
    <!-- Render landing pages with landing navigation -->
    <LandingNav>
        {@render children()}
    </LandingNav>
{/if}