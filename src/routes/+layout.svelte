<script lang="ts">
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import '../app.css';

	let { children } = $props();
	let isLoggedIn = $state(false);
	let userName = $state('');
	let userEmail = $state('');

	onMount(() => {
		// Check if user is logged in
		isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
		userName = localStorage.getItem('userName') || '';
		userEmail = localStorage.getItem('userEmail') || '';

		// Only redirect to login if not authenticated and not already on login page
		if (!isLoggedIn && typeof window !== 'undefined' && !window.location.pathname.startsWith('/login')) {
			goto('/login');
		}
	});

	function handleLogout() {
		localStorage.removeItem('isLoggedIn');
		localStorage.removeItem('userName');
		localStorage.removeItem('userEmail');
		goto('/login');
	}
</script>

{#if isLoggedIn}
	<div class="flex h-screen bg-gray-50">
		<Sidebar {userName} {userEmail} on:logout={handleLogout} />
		<div class="flex flex-1 flex-col overflow-hidden">
			<Navbar {userName} on:logout={handleLogout} />
			<main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
				<div class="container mx-auto px-6 py-8">
					{@render children()}
				</div>
			</main>
		</div>
	</div>
{:else if typeof window !== 'undefined' && window.location.pathname.startsWith('/login')}
	<!-- Show login page without layout -->
	{@render children()}
{:else}
	<!-- Show loading or redirect to login -->
	<div class="flex h-screen bg-gray-50 items-center justify-center">
		<div class="text-center">
			<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
			<p class="mt-4 text-gray-600">Loading...</p>
		</div>
	</div>
{/if}
