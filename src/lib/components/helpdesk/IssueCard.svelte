<script lang="ts">
  import Badge from '$lib/components/ui/Badge.svelte';
  
  type IssueStatus = 'OPEN' | 'RESOLVED' | 'IN_PROGRESS' | 'CLOSED';
  type ItemType = 'ISSUE' | 'BUG' | 'FEATURE' | 'ENHANCEMENT';
  type Stopper = 'YES' | 'NO';
  
  let { 
    id, 
    hospitalName, 
    title, 
    itemType, 
    stopper, 
    status, 
    reportedBy, 
    assignTo, 
    reportedDate, 
    lastUpdated, 
    lastComment 
  }: { 
    id: string;
    hospitalName: string;
    title: string;
    itemType: ItemType;
    stopper: Stopper;
    status: IssueStatus;
    reportedBy: string;
    assignTo: string;
    reportedDate: string;
    lastUpdated: string;
    lastComment: string;
  } = $props();

  function getItemTypeVariant(type: ItemType) {
    switch (type) {
      case 'ISSUE': return 'danger';
      case 'BUG': return 'danger';
      case 'FEATURE': return 'primary';
      case 'ENHANCEMENT': return 'secondary';
      default: return 'secondary';
    }
  }

  function getStopperVariant(stopper: Stopper) {
    return stopper === 'YES' ? 'danger' : 'primary';
  }

  function getStatusVariant(status: IssueStatus) {
    switch (status) {
      case 'OPEN': return 'warning';
      case 'RESOLVED': return 'info';
      case 'IN_PROGRESS': return 'secondary';
      case 'CLOSED': return 'primary';
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
</script>

<div class="bg-white border-t-2 border-b-2 border-teal-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
  <!-- Header Section -->
  <div class="flex items-start justify-between mb-4">
    <div class="flex-1">
      <div class="flex items-center gap-2 mb-2">
        <span class="text-sm font-semibold text-gray-900">#{id}</span>
        <span class="text-sm text-blue-600 font-medium">{hospitalName}</span>
      </div>
      <h3 class="text-lg font-bold text-gray-900 mb-2">{title}</h3>
    </div>
    <button class="text-gray-400 hover:text-gray-600">
      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>
  </div>
  
  <!-- Details Section - First Row -->
  <div class="grid grid-cols-5 gap-4 mb-4">
    <div >
      <div class="text-xs text-gray-500 mb-1">Item Type</div>
      <Badge variant={getItemTypeVariant(itemType)}>{itemType}</Badge>
    </div>
    <div >
      <div class="text-xs text-gray-500 mb-1">Stopper</div>
      <Badge variant={getStopperVariant(stopper)}>{stopper}</Badge>
    </div>
    <div >
      <div class="text-xs text-gray-500 mb-1">Status</div>
      <Badge variant={getStatusVariant(status)}>{status}</Badge>
    </div>
    <div >
      <div class="text-xs text-gray-500 mb-1">Reported By</div>
      <div class="flex gap-1">
        <div class="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
          <span class="text-xs font-medium text-blue-600">{getInitials(reportedBy)}</span>
        </div>
        <div class="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
          <span class="text-xs font-medium text-green-600">{getInitials(reportedBy)}</span>
        </div>
      </div>
    </div>
    <div >
      <div class="text-xs text-gray-500 mb-1">Assign To</div>
      <div class="flex">
        <div class="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
          <span class="text-xs font-medium text-blue-600">{getInitials(assignTo)}</span>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Details Section - Second Row -->
  <div class="grid grid-cols-3 gap-4 pt-3 border-t border-gray-100">
    <div>
      <div class="text-xs text-gray-500 mb-1">Reported Date</div>
      <div class="text-sm font-medium text-gray-900">{formatDate(reportedDate)}</div>
    </div>
    <div>
      <div class="text-xs text-gray-500 mb-1">Last Updated</div>
      <div class="text-sm font-medium text-gray-900">{formatDate(lastUpdated)}</div>
    </div>
    <div>
      <div class="text-xs text-gray-500 mb-1">Last Comment</div>
      <div class="text-sm text-gray-900">{lastComment || '-'}</div>
    </div>
  </div>
</div>
