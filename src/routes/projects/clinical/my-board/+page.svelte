<script lang="ts">
  import { onMount } from 'svelte';
  import { activePath } from '$lib/stores/navigation';
  import { goto } from '$app/navigation';
  import ProjectCard from '$lib/components/projects/ProjectCard.svelte';
  import CardList from '$lib/components/ui/CardList.svelte';
  import FilterModal from '$lib/components/ui/FilterModal.svelte';

  onMount(() => {
    activePath.set('/projects/clinical/my-board');
  });

  let showFilterModal = $state(false);
  let currentFilters = $state({});

  const myProjects = [
    {
      id: 'CL933',
      title: 'Operasi - Cetak Laporan Operasi',
      priority: 'HIGH' as const,
      status: 'OPEN' as const,
      createdBy: 'Restu Putri',
      tech: 'Unassigned',
      qa: 'Unassigned',
      createdDate: '2025-08-04T15:55:00Z',
      lastUpdated: '2025-08-04T15:55:00Z'
    },
    {
      id: 'CL924',
      title: 'Operasi - Cancel Order Operasi',
      priority: 'HIGH' as const,
      status: 'READY TO DEVELOP' as const,
      createdBy: 'Restu Putri',
      tech: 'Ahmad Rizki, Budi Santoso',
      qa: 'Sari Dewi, Lina Marlina',
      createdDate: '2025-07-21T02:13:00Z',
      lastUpdated: '2025-07-29T01:45:00Z'
    },
    {
      id: 'CL948',
      title: 'Farmasi Rawat Inap - Menambahkan Tugas dan Catatan Farmasi Rawat Inap',
      priority: 'HIGH' as const,
      status: 'READY TO DEVELOP' as const,
      createdBy: 'Restu Putri',
      tech: 'Ahmad Rizki',
      qa: 'Sari Dewi, Budi Santoso',
      createdDate: '2025-09-08T17:29:00Z',
      lastUpdated: '2025-09-08T17:29:00Z'
    },
    {
      id: 'CL804',
      title: 'Rawat Inap - Order Operasi',
      priority: 'HIGH' as const,
      status: 'READY TO DEVELOP' as const,
      createdBy: 'Restu Putri',
      tech: 'Ahmad Rizki',
      qa: 'Sari Dewi, Budi Santoso',
      createdDate: '2025-04-24T11:08:00Z',
      lastUpdated: '2025-07-29T01:45:00Z'
    },
    {
      id: 'CL571',
      title: 'Rekam Medis - Menampilkan Informasi Detail Racikan Obat',
      priority: 'MEDIUM' as const,
      status: 'IN PROGRESS' as const,
      createdBy: 'Fajar Nugroho',
      tech: 'Lina Marlina',
      qa: 'Dedi Kurniawan',
      createdDate: '2025-06-11T15:02:00Z',
      lastUpdated: '2025-06-11T15:02:00Z'
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
    goto(`/projects/clinical/${item.id}`);
  }

  function handleRefresh() {
    console.log('Refresh projects');
  }
</script>

<CardList
  title="My Board"
  breadcrumb={['Project', 'Clinical', 'My Board']}
  items={myProjects}
  cardComponent={ProjectCard}
  showAddNew={false}
  onFilter={handleFilter}
  onRefresh={handleRefresh}
  onItemClick={handleItemClick}
/>

<FilterModal
  bind:isOpen={showFilterModal}
  title="Filter"
  type="projects"
  filters={currentFilters}
  onApply={() => handleFilterApply()}
  onReset={handleFilterReset}
  onClose={handleFilterClose}
/>
