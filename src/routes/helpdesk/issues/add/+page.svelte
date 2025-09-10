<script lang="ts">
  import { onMount } from 'svelte';
  import { activePath } from '$lib/stores/navigation';
  import { goto } from '$app/navigation';
  import RichTextEditor from '$lib/components/ui/RichTextEditor.svelte';

  onMount(() => {
    activePath.set('/helpdesk/issues');
  });

  let title = $state('');
  let itemType = $state('ISSUE');
  let stopper = $state('NO');
  let teamRoles = $state('Product & Tech');
  let hospital = $state('');
  let module = $state('');
  let description = $state('');
  let isLoading = $state(false);

  const itemTypes = [
    { value: 'ISSUE', label: 'Issue' },
    { value: 'BUG', label: 'Bug' },
    { value: 'FEATURE', label: 'Feature' },
    { value: 'ENHANCEMENT', label: 'Enhancement' }
  ];

  const stopperOptions = [
    { value: 'NO', label: 'No' },
    { value: 'YES', label: 'Yes' }
  ];

  const teamRolesOptions = [
    { value: 'Product & Tech', label: 'Product & Tech' },
    { value: 'QA', label: 'QA' },
    { value: 'DevOps', label: 'DevOps' }
  ];

  const hospitals = [
    { value: '', label: 'Select hospital' },
    { value: 'rs-cahya-medika', label: 'RS Cahya Medika' },
    { value: 'rtt-rs-budi-mulia', label: 'RTT - RS Budi Mulia' },
    { value: 'rtt-rs-budi-setia', label: 'RTT - RS Budi Setia' },
    { value: 'rtt-rs-gunung-maria', label: 'RTT - RS Gunung Maria' }
  ];

  const modules = [
    { value: '', label: 'Select module' },
    { value: 'farmasi', label: 'Farmasi' },
    { value: 'operasi', label: 'Operasi' },
    { value: 'lab-rad', label: 'Lab & Radiologi' },
    { value: 'rekam-medis', label: 'Rekam Medis' },
    { value: 'keperawatan', label: 'Keperawatan' },
    { value: 'rawat-inap', label: 'Rawat Inap' }
  ];

  function handleDescriptionChange(event: CustomEvent) {
    description = event.detail;
  }

  async function handleSubmit(event: Event) {
    event.preventDefault();
    isLoading = true;

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would submit the form data to your API
      console.log('Submitting issue:', {
        title,
        itemType,
        stopper,
        teamRoles,
        hospital,
        module,
        description
      });

      // Redirect back to issues list
      goto('/helpdesk/issues');
    } catch (error) {
      console.error('Error creating issue:', error);
    } finally {
      isLoading = false;
    }
  }

  function handleBack() {
    goto('/helpdesk/issues');
  }
</script>

<svelte:head>
  <title>Add New Issue - MD Now Ticketing CMS</title>
</svelte:head>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <div>
      <button 
        onclick={handleBack}
        class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 mb-4"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Back
      </button>
      <h1 class="text-2xl font-bold text-gray-900">Add New Issue</h1>
      <nav class="flex" aria-label="Breadcrumb">
        <ol class="flex items-center space-x-2">
          <li>
            <span class="text-gray-500">/</span>
          </li>
          <li>
            <span class="text-gray-500">Helpdesk</span>
          </li>
          <li>
            <span class="text-gray-500">/</span>
          </li>
          <li>
            <span class="text-gray-500">Issues</span>
          </li>
          <li>
            <span class="text-gray-500">/</span>
          </li>
          <li>
            <span class="text-gray-900 font-medium">Add New</span>
          </li>
        </ol>
      </nav>
    </div>
  </div>

  <!-- Form -->
  <div class="bg-white shadow rounded-lg">
    <form onsubmit={handleSubmit} class="p-6 space-y-6">
      <!-- Title -->
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
          Title <span class="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          bind:value={title}
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter issue title"
        />
      </div>

      <!-- Form Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Item Type -->
        <div>
          <label for="itemType" class="block text-sm font-medium text-gray-700 mb-2">
            Item Type <span class="text-red-500">*</span>
          </label>
          <select
            id="itemType"
            bind:value={itemType}
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {#each itemTypes as type}
              <option value={type.value}>{type.label}</option>
            {/each}
          </select>
        </div>

        <!-- Stopper -->
        <div>
          <label for="stopper" class="block text-sm font-medium text-gray-700 mb-2">
            Stopper <span class="text-red-500">*</span>
          </label>
          <select
            id="stopper"
            bind:value={stopper}
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {#each stopperOptions as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>
        </div>

        <!-- Team Roles -->
        <div>
          <label for="teamRoles" class="block text-sm font-medium text-gray-700 mb-2">
            Team Roles <span class="text-red-500">*</span>
          </label>
          <select
            id="teamRoles"
            bind:value={teamRoles}
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {#each teamRolesOptions as role}
              <option value={role.value}>{role.label}</option>
            {/each}
          </select>
        </div>

        <!-- Hospital -->
        <div>
          <label for="hospital" class="block text-sm font-medium text-gray-700 mb-2">
            Select Hospital <span class="text-red-500">*</span>
          </label>
          <select
            id="hospital"
            bind:value={hospital}
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {#each hospitals as hosp}
              <option value={hosp.value}>{hosp.label}</option>
            {/each}
          </select>
        </div>

        <!-- Module -->
        <div>
          <label for="module" class="block text-sm font-medium text-gray-700 mb-2">
            Select Module <span class="text-red-500">*</span>
          </label>
          <select
            id="module"
            bind:value={module}
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {#each modules as mod}
              <option value={mod.value}>{mod.label}</option>
            {/each}
          </select>
        </div>
      </div>

      <!-- Description -->
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
          Description <span class="text-red-500">*</span>
        </label>
        <RichTextEditor
          value={description}
          placeholder="Enter detailed description of the issue..."
          height="300px"
          on:change={handleDescriptionChange}
        />
      </div>

      <!-- Form Actions -->
      <div class="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          onclick={handleBack}
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {#if isLoading}
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          {/if}
          {isLoading ? 'Creating Issue...' : 'Create Issue'}
        </button>
      </div>
    </form>
  </div>
</div>
