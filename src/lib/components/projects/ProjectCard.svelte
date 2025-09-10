<script lang="ts">
  import Badge from '$lib/components/ui/Badge.svelte';
  
  type ProjectStatus = 'READY TO DEVELOP' | 'IN TESTING' | 'READY TO PRODUCTION' | 'IN PROGRESS' | 'DONE' | 'OPEN';
  type Priority = 'HIGH' | 'MEDIUM' | 'LOW';
  
  let { 
    id, 
    title, 
    priority, 
    status, 
    createdBy, 
    tech, 
    qa, 
    createdDate, 
    lastUpdated 
  }: { 
    id: string;
    title: string;
    priority: Priority;
    status: ProjectStatus;
    createdBy: string;
    tech: string;
    qa: string;
    createdDate: string;
    lastUpdated: string;
  } = $props();

  function getPriorityVariant(priority: Priority) {
    switch (priority) {
      case 'HIGH': return 'danger';
      case 'MEDIUM': return 'warning';
      case 'LOW': return 'success';
      default: return 'secondary';
    }
  }

  function getStatusVariant(status: ProjectStatus) {
    switch (status) {
      case 'READY TO DEVELOP': return 'info';
      case 'IN TESTING': return 'warning';
      case 'READY TO PRODUCTION': return 'success';
      case 'IN PROGRESS': return 'secondary';
      case 'DONE': return 'success';
      case 'OPEN': return 'info';
      default: return 'secondary';
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  function getInitials(name: string) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  function parseTechQA(techQaString: string) {
    return techQaString.split(',').map(name => name.trim());
  }
</script>

<div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
  <!-- Header Section -->
  <div class="flex items-start justify-between mb-4">
    <div class="flex-1">
      <div class="flex items-center gap-2 mb-2">
        <span class="text-sm font-semibold text-gray-900">#{id}</span>
      </div>
      <h3 class="text-lg font-bold text-gray-900 mb-2">{title}</h3>
    </div>
    <button class="text-gray-400 hover:text-gray-600">
      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>
  </div>
  
  <!-- First Row of Details -->
  <div class="grid grid-cols-5 gap-4 mb-4">
    <div>
      <div class="text-xs text-gray-500 mb-1">Priority</div>
      <Badge variant={getPriorityVariant(priority)}>{priority}</Badge>
    </div>
    <div>
      <div class="text-xs text-gray-500 mb-1">Status</div>
      <Badge variant={getStatusVariant(status)}>{status}</Badge>
    </div>
    <div>
      <div class="text-xs text-gray-500 mb-1">Created By</div>
      <div class="text-sm font-medium text-gray-900">{createdBy}</div>
    </div>
    <div>
      <div class="text-xs text-gray-500 mb-1">Tech</div>
      <div class="flex gap-1">
        {#if tech === 'Unassigned'}
          <span class="text-sm text-gray-500">Unassigned</span>
        {:else}
          {#each parseTechQA(tech) as person, index}
            <div class="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
              <span class="text-xs font-medium text-blue-600">{getInitials(person)}</span>
            </div>
          {/each}
        {/if}
      </div>
    </div>
    <div>
      <div class="text-xs text-gray-500 mb-1">QA</div>
      <div class="flex gap-1">
        {#if qa === 'Unassigned'}
          <span class="text-sm text-gray-500">Unassigned</span>
        {:else}
          {#each parseTechQA(qa) as person, index}
            <div class="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
              <span class="text-xs font-medium text-green-600">{getInitials(person)}</span>
            </div>
          {/each}
        {/if}
      </div>
    </div>
  </div>
  
  <!-- Bottom Section with Dates -->
  <div class="pt-3 border-t border-gray-100">
    <div class="flex justify-between text-xs text-gray-500">
      <span>Created Date: {formatDate(createdDate)}</span>
      <span>Last Updated: {formatDate(lastUpdated)}</span>
    </div>
  </div>
</div>
