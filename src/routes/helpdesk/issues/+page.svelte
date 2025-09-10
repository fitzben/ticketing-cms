<script lang="ts">
  import { onMount } from 'svelte';
  import { activePath } from '$lib/stores/navigation';
  import { goto } from '$app/navigation';
  import IssueCard from '$lib/components/helpdesk/IssueCard.svelte';
  import CardList from '$lib/components/ui/CardList.svelte';
  import FilterModal from '$lib/components/ui/FilterModal.svelte';

  onMount(() => {
    activePath.set('/helpdesk/issues');
  });

  let showFilterModal = $state(false);
  let currentFilters = $state({});

  const issues = [
    {
      id: 'ISS8150',
      hospitalName: 'RS Cahya Medika',
      title: 'Harga Item Lab Tidak Sesuai Dengan Master Data',
      itemType: 'ISSUE' as const,
      stopper: 'NO' as const,
      status: 'RESOLVED' as const,
      reportedBy: 'Ayu Ramadhan',
      assignTo: 'Alvin Ashari',
      reportedDate: '2025-09-09T20:57:00Z',
      lastUpdated: '2025-09-09T21:14:00Z',
      lastComment: ''
    },
    {
      id: 'ISS8138',
      hospitalName: 'RTT - RS Budi Mulia',
      title: 'Tidak Dapat Proses Obat',
      itemType: 'ISSUE' as const,
      stopper: 'NO' as const,
      status: 'RESOLVED' as const,
      reportedBy: 'Budi Santoso',
      assignTo: 'Cici Wijaya',
      reportedDate: '2025-09-09T14:28:00Z',
      lastUpdated: '2025-09-09T14:50:00Z',
      lastComment: ''
    },
    {
      id: 'ISS8136',
      hospitalName: 'RTT - RS Budi Setia',
      title: 'Sistem Down',
      itemType: 'ISSUE' as const,
      stopper: 'YES' as const,
      status: 'OPEN' as const,
      reportedBy: 'Doni Pratama',
      assignTo: 'Eka Sari',
      reportedDate: '2025-09-09T13:57:00Z',
      lastUpdated: '2025-09-09T13:57:00Z',
      lastComment: ''
    },
    {
      id: 'ISS8118',
      hospitalName: 'RTT - RS Gunung Maria',
      title: 'Error Login User',
      itemType: 'ISSUE' as const,
      stopper: 'NO' as const,
      status: 'IN_PROGRESS' as const,
      reportedBy: 'Fani Putri',
      assignTo: 'Gina Lestari',
      reportedDate: '2025-09-09T10:30:00Z',
      lastUpdated: '2025-09-09T15:20:00Z',
      lastComment: 'Investigating login issue with specific user accounts'
    }
  ];

  function handleFilter() {
    showFilterModal = true;
  }

  function handleFilterApply(event?: CustomEvent) {
    if (event) {
      currentFilters = event.detail;
    }
    showFilterModal = false;
    console.log('Applied filters:', currentFilters);
  }

  function handleFilterReset() {
    currentFilters = {};
    console.log('Reset filters');
  }

  function handleFilterClose() {
    showFilterModal = false;
  }

  function handleItemClick(item: any) {
    goto(`/helpdesk/issues/${item.id}`);
  }

  function handleAddNew() {
    console.log('Add new issue');
  }

  function handleRefresh() {
    console.log('Refresh issues');
  }
</script>

<CardList
  title="Issues"
  breadcrumb={['Helpdesk', 'Issues']}
  items={issues}
  cardComponent={IssueCard}
  onFilter={handleFilter}
  onAddNew={handleAddNew}
  onRefresh={handleRefresh}
  onItemClick={handleItemClick}
/>

<FilterModal
  bind:isOpen={showFilterModal}
  title="Filter"
  type="helpdesk"
  filters={currentFilters}
  onApply={() => handleFilterApply()}
  onReset={handleFilterReset}
  onClose={handleFilterClose}
/>
