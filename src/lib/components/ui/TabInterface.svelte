<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  let { 
    tabs = [],
    activeTab = 0
  } = $props<{
    tabs: Array<{ id: string; label: string; content: any }>;
    activeTab?: number;
  }>();

  let currentTab = $state(activeTab);

  function setActiveTab(index: number) {
    currentTab = index;
    dispatch('tabChange', { index, tab: tabs[index] });
  }

  // Update currentTab when activeTab prop changes
  $effect(() => {
    currentTab = activeTab;
  });
</script>

<div class="tab-interface">
  <!-- Tab Headers -->
  <div class="border-b border-gray-200">
    <nav class="-mb-px flex space-x-8" aria-label="Tabs">
      {#each tabs as tab, index}
        <button
          type="button"
          onclick={() => setActiveTab(index)}
          class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 {currentTab === index 
            ? 'border-blue-500 text-blue-600' 
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
        >
          {tab.label}
        </button>
      {/each}
    </nav>
  </div>
  
  <!-- Tab Content -->
  <div class="tab-content mt-6">
    {#if tabs[currentTab]}
      <svelte:component this={tabs[currentTab].content} />
    {/if}
  </div>
</div>
