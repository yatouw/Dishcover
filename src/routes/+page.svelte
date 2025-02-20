<script>
// @ts-nocheck

  import AuthLayout from './auth/+layout.svelte';
  import Login from './auth/login/+page.svelte';
  import Register from './auth/register/+page.svelte';
import Landing from '../App.svelte';

$: isLoggedIn = false;
  let currentPage = '';
</script>

{#if isLoggedIn}
<h1>Page</h1>
<p>This is a protected page</p>
{:else}
{#if currentPage === 'login' || currentPage === 'register'}
  <AuthLayout data={{}} >
    {#if currentPage === 'login'}
      <Login data={{}} />
    {:else if currentPage === 'register'}
      <Register data={{}} />
    {/if}
  </AuthLayout>
{:else}
  <Landing />
{/if}
{/if}