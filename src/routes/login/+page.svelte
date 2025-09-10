<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let email = $state('');
  let password = $state('');
  let rememberMe = $state(false);
  let isLoading = $state(false);
  let error = $state('');

  function handleLogin(event: Event) {
    event.preventDefault();
    isLoading = true;
    error = '';

    // Simple static login for demo
    setTimeout(() => {
      if (email === 'benjamin@mdcorp.com' && password === 'adminpassword') {
        // Store login state
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', 'Benjamin Sitompul');
        
        // Force page reload to update layout
        window.location.href = '/';
      } else {
        error = 'Invalid email or password';
        isLoading = false;
      }
    }, 500);
  }

  onMount(() => {
    // Check if already logged in
    if (localStorage.getItem('isLoggedIn') === 'true') {
      goto('/');
    }
  });
</script>

<svelte:head>
  <title>Login - MD Now Ticketing CMS</title>
</svelte:head>

<div class="min-h-screen flex">
  <!-- Left Side - Login Form -->
  <div class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <div class="mx-auto h-12 w-auto flex items-center justify-center">
          <div class="h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          MD Now Ticketing CMS
        </p>
      </div>
      
      <form class="mt-8 space-y-6" onsubmit={handleLogin}>
        <div class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              bind:value={email}
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              bind:value={password}
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Enter your password"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              bind:checked={rememberMe}
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>
        </div>

        {#if error}
          <div class="rounded-md bg-red-50 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">
                  {error}
                </h3>
              </div>
            </div>
          </div>
        {/if}

        <div>
          <button
            type="submit"
            disabled={isLoading}
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {#if isLoading}
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            {/if}
            {isLoading ? 'Signing in...' : 'LOGIN'}
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Right Side - Graphic -->
  <div class="hidden lg:block lg:flex-1 bg-gradient-to-br from-blue-600 to-blue-800">
    <div class="h-full flex items-center justify-center p-12">
      <div class="text-center text-white">
        <div class="mb-8">
          <svg class="mx-auto h-32 w-32 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h1 class="text-4xl font-bold mb-4">MD Now</h1>
        <h2 class="text-2xl font-semibold mb-6">Ticketing CMS</h2>
        <p class="text-xl text-blue-100 max-w-md mx-auto">
          Streamline your helpdesk operations and project management with our comprehensive ticketing system.
        </p>
        <div class="mt-8 grid grid-cols-2 gap-6 text-left max-w-md mx-auto">
          <div class="flex items-center">
            <svg class="h-6 w-6 text-blue-200 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="text-blue-100">Issue Tracking</span>
          </div>
          <div class="flex items-center">
            <svg class="h-6 w-6 text-blue-200 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="text-blue-100">Project Management</span>
          </div>
          <div class="flex items-center">
            <svg class="h-6 w-6 text-blue-200 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="text-blue-100">Team Collaboration</span>
          </div>
          <div class="flex items-center">
            <svg class="h-6 w-6 text-blue-200 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="text-blue-100">Real-time Updates</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
