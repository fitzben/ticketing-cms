<script lang="ts">
	import { onMount } from 'svelte';
	import { activePath } from '$lib/stores/navigation';

	onMount(() => {
		activePath.set('/');
	});

	const stats = [
		{ title: 'Open Issues', value: 28, trend: 5 },
		{ title: 'In Fixing', value: 24, trend: -2 },
		{ title: 'Ready to Deploy', value: 14, trend: 8 },
		{ title: 'Ready to Test', value: 13, trend: 1 }
	];
</script>

<svelte:head>
	<title>Dashboard - MD Now Ticketing CMS</title>
</svelte:head>

<div class="space-y-6">
	<h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
	
	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
		{#each stats as stat}
			<div class="bg-white overflow-hidden shadow rounded-lg">
				<div class="p-5">
					<div class="flex items-center">
						<div class="flex-shrink-0">
							<div class="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
								<span class="text-white text-sm font-medium">{stat.value}</span>
							</div>
						</div>
						<div class="ml-5 w-0 flex-1">
							<dl>
								<dt class="text-sm font-medium text-gray-500 truncate">{stat.title}</dt>
								<dd class="flex items-baseline">
									<div class="text-2xl font-semibold text-gray-900">{stat.value}</div>
									<div class="ml-2 flex items-baseline text-sm font-semibold {stat.trend > 0 ? 'text-green-600' : 'text-red-600'}">
										{stat.trend > 0 ? '+' : ''}{stat.trend}%
									</div>
								</dd>
							</dl>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
		<div class="bg-white shadow rounded-lg p-6">
			<h3 class="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
			<div class="space-y-3">
				<div class="flex items-center space-x-3">
					<div class="w-2 h-2 bg-green-400 rounded-full"></div>
					<span class="text-sm text-gray-600">New issue ISS8150 created</span>
				</div>
				<div class="flex items-center space-x-3">
					<div class="w-2 h-2 bg-blue-400 rounded-full"></div>
					<span class="text-sm text-gray-600">Project CL933 updated</span>
				</div>
				<div class="flex items-center space-x-3">
					<div class="w-2 h-2 bg-yellow-400 rounded-full"></div>
					<span class="text-sm text-gray-600">Issue ISS8138 resolved</span>
				</div>
			</div>
		</div>
		
		<div class="bg-white shadow rounded-lg p-6">
			<h3 class="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
			<div class="space-y-3">
				<a href="/helpdesk/issues/add" class="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md">
					+ Create New Issue
				</a>
				<a href="/projects/clinical/my-board" class="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md">
					View My Projects
				</a>
				<a href="/helpdesk/issues" class="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md">
					View All Issues
				</a>
			</div>
		</div>
	</div>
</div>
