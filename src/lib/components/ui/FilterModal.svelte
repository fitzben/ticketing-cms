<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  let { 
    isOpen = $bindable(false), 
    title = "Filter",
    filters = {},
    type = "helpdesk", // "helpdesk" or "projects"
    onApply = () => {},
    onReset = () => {},
    onClose = () => {}
  } = $props<{
    isOpen?: boolean;
    title?: string;
    filters?: Record<string, any>;
    type?: "helpdesk" | "projects";
    onApply?: () => void;
    onReset?: () => void;
    onClose?: () => void;
  }>();

  let searchKeyword = $state(filters.searchKeyword || '');
  let startDate = $state(filters.startDate || '');
  let endDate = $state(filters.endDate || '');
  let hospital = $state(filters.hospital || '');
  let reporter = $state(filters.reporter || '');
  let itemType = $state(filters.type || '');
  let teamRoles = $state(filters.teamRoles || '');
  let stopper = $state(filters.stopper || '');
  let assignToTech = $state(filters.assignToTech || '');
  let status = $state(filters.status || '');
  let assignToQA = $state(filters.assignToQA || '');
  let priority = $state(filters.priority || '');

  function handleApply() {
    const filterData = {
      searchKeyword,
      startDate,
      endDate,
      hospital,
      reporter,
      type: itemType,
      teamRoles,
      stopper,
      assignToTech,
      status,
      assignToQA,
      priority
    };
    
    dispatch('apply', filterData);
    onApply();
  }

  function handleReset() {
    searchKeyword = '';
    startDate = '';
    endDate = '';
    hospital = '';
    reporter = '';
    itemType = '';
    teamRoles = '';
    stopper = '';
    assignToTech = '';
    status = '';
    assignToQA = '';
    priority = '';
    
    dispatch('reset');
    onReset();
  }

  function handleClose() {
    dispatch('close');
    onClose();
  }

  function clearSearch() {
    searchKeyword = '';
  }
</script>

{#if isOpen}
  <!-- Modal Backdrop -->
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <!-- Modal Content -->
    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <!-- Modal Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-900">{title}</h2>
        <button 
          onclick={handleClose}
          class="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Modal Body -->
      <div class="p-6 space-y-6">
        <!-- Search Keyword -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
          <div class="relative">
            <input
              type="text"
              bind:value={searchKeyword}
              placeholder="Search issue number or title"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {#if searchKeyword}
              <button
                onclick={clearSearch}
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            {/if}
          </div>
        </div>

        {#if type === "helpdesk"}
          <!-- Helpdesk-specific filters -->
          <!-- Date Range -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Created Date (Start)</label>
              <div class="relative">
                <input
                  type="date"
                  bind:value={startDate}
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Created Date (End)</label>
              <div class="relative">
                <input
                  type="date"
                  bind:value={endDate}
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Filter Options Grid -->
          <div class="grid grid-cols-2 gap-4">
            <!-- Hospital / Clinic -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Hospital / Clinic</label>
              <select
                bind:value={hospital}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">None selected</option>
                <option value="all">All</option>
                <option value="rs-cahya-medika">RS Cahya Medika</option>
                <option value="rtt-rs-budi-mulia">RTT - RS Budi Mulia</option>
                <option value="rtt-rs-budi-setia">RTT - RS Budi Setia</option>
                <option value="rtt-rs-gunung-maria">RTT - RS Gunung Maria</option>
              </select>
            </div>

            <!-- Reporter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Reporter</label>
              <select
                bind:value={reporter}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All</option>
                <option value="ayu-ramadhan">Ayu Ramadhan</option>
                <option value="budi-santoso">Budi Santoso</option>
                <option value="doni-pratama">Doni Pratama</option>
                <option value="fani-putri">Fani Putri</option>
              </select>
            </div>

            <!-- Type -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                bind:value={itemType}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All</option>
                <option value="issue">Issue</option>
                <option value="bug">Bug</option>
                <option value="feature">Feature</option>
                <option value="enhancement">Enhancement</option>
              </select>
            </div>

            <!-- Team Roles -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Team Roles</label>
              <select
                bind:value={teamRoles}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="product-tech">Product & Tech</option>
                <option value="qa">QA</option>
                <option value="all">All</option>
              </select>
            </div>

            <!-- Stopper -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Stopper?</label>
              <select
                bind:value={stopper}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <!-- Assign To Tech -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Assign To Tech</label>
              <select
                bind:value={assignToTech}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All</option>
                <option value="alvin-ashari">Alvin Ashari</option>
                <option value="cici-wijaya">Cici Wijaya</option>
                <option value="eka-sari">Eka Sari</option>
                <option value="gina-lestari">Gina Lestari</option>
              </select>
            </div>

            <!-- Status -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                bind:value={status}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">None selected</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <!-- Assign To QA -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Assign To QA</label>
              <select
                bind:value={assignToQA}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All</option>
                <option value="sari-dewi">Sari Dewi</option>
                <option value="budi-santoso">Budi Santoso</option>
                <option value="lina-marlina">Lina Marlina</option>
                <option value="dedi-kurniawan">Dedi Kurniawan</option>
              </select>
            </div>
          </div>
        {:else}
          <!-- Projects-specific filters (simpler) -->
          <div class="grid grid-cols-2 gap-4">
            <!-- Priority -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                bind:value={priority}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <!-- Hospital / Clinic -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Hospital / Clinic</label>
              <select
                bind:value={hospital}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All</option>
                <option value="rs-cahya-medika">RS Cahya Medika</option>
                <option value="rtt-rs-budi-mulia">RTT - RS Budi Mulia</option>
                <option value="rtt-rs-budi-setia">RTT - RS Budi Setia</option>
                <option value="rtt-rs-gunung-maria">RTT - RS Gunung Maria</option>
              </select>
            </div>

            <!-- Status -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                bind:value={status}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">None selected</option>
                <option value="open">Open</option>
                <option value="ready-to-develop">Ready to Develop</option>
                <option value="in-progress">In Progress</option>
                <option value="in-testing">In Testing</option>
                <option value="ready-to-production">Ready to Production</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>
        {/if}
      </div>

      <!-- Modal Footer -->
      <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
        <button
          onclick={handleReset}
          class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
        >
          RESET
        </button>
        <button
          onclick={handleApply}
          class="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors"
        >
          APPLY
        </button>
      </div>
    </div>
  </div>
{/if}
