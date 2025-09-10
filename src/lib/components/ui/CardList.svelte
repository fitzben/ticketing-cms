<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  let { 
    title = "Items",
    breadcrumb = [],
    items = [],
    cardComponent,
    showFilter = true,
    showAddNew = true,
    addNewText = "+ Add New",
    filterText = "Filter",
    refreshText = "Refresh",
    onFilter = () => {},
    onAddNew = () => {},
    onRefresh = () => {},
    onItemClick = (item: any) => {}
  } = $props<{
    title?: string;
    breadcrumb?: string[];
    items?: any[];
    cardComponent?: any;
    showFilter?: boolean;
    showAddNew?: boolean;
    addNewText?: string;
    filterText?: string;
    refreshText?: string;
    onFilter?: () => void;
    onAddNew?: () => void;
    onRefresh?: () => void;
    onItemClick?: (item: any) => void;
  }>();

  function handleItemClick(item: any) {
    dispatch('itemClick', item);
    onItemClick(item);
  }

  function handleFilter() {
    dispatch('filter');
    onFilter();
  }

  function handleAddNew() {
    dispatch('addNew');
    onAddNew();
  }

  function handleRefresh() {
    dispatch('refresh');
    onRefresh();
  }
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">{title}</h1>
      {#if breadcrumb.length > 0}
        <nav class="flex" aria-label="Breadcrumb">
          <ol class="flex items-center space-x-2">
            {#each breadcrumb as crumb, index}
              <li>
                {#if index > 0}
                  <span class="text-gray-500">/</span>
                {/if}
                <span class={index === breadcrumb.length - 1 ? "text-gray-900 font-medium" : "text-gray-500"}>
                  {crumb}
                </span>
              </li>
            {/each}
          </ol>
        </nav>
      {/if}
    </div>
    
    <div class="flex items-center gap-3">
      {#if showFilter}
        <button 
          onclick={handleFilter}
          class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
          </svg>
          {filterText}
        </button>
      {/if}
      
      <button 
        onclick={handleRefresh}
        class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
        </svg>
        {refreshText}
      </button>
      
      {#if showAddNew}
        <button 
          onclick={handleAddNew}
          class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          {addNewText}
        </button>
      {/if}
    </div>
  </div>

  <!-- Filter Section (if needed) -->
  <div class="bg-gray-50 p-4 rounded-lg">
    <div class="flex items-center gap-4">
      <span class="text-sm font-medium text-gray-700">Filter By:</span>
      <button class="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 border border-blue-200 rounded-md">
        Product & Tech
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  </div>

  <!-- Items List -->
  <div class="grid grid-cols-1 gap-4">
    {#each items as item (item.id || item.key || item)}
      <div onclick={() => handleItemClick(item)} class="cursor-pointer" role="button" tabindex="0">
        {#if cardComponent}
          <svelte:component this={cardComponent} {...item} />
        {:else}
          <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="text-sm text-gray-600">
              {JSON.stringify(item)}
            </div>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>

<!-- Floating Action Button -->
<button 
  class="fixed bottom-6 right-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 transition-colors" 
  aria-label="Quick contact"
  onclick={() => dispatch('quickContact')}
>
  <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
  </svg>
</button>
