<script lang="ts">
  import { onMount } from 'svelte';
  import { activePath } from '$lib/stores/navigation';
  import { goto } from '$app/navigation';
  import ProjectCard from '$lib/components/projects/ProjectCard.svelte';
  import CardList from '$lib/components/ui/CardList.svelte';
  import FilterModal from '$lib/components/ui/FilterModal.svelte';

  onMount(() => {
    activePath.set('/projects/backlog');
  });

  let showFilterModal = $state(false);
  let currentFilters = $state({});

  const projects = [
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
      id: 'CL946',
      title: 'Farmasi - Enhance Filter Kategori Worklist & Fixing Data Tanggal Peresepan',
      priority: 'MEDIUM' as const,
      status: 'IN TESTING' as const,
      createdBy: 'Dina Sari',
      tech: 'Eko Prasetyo',
      qa: 'Maya Indah',
      createdDate: '2025-09-04T10:23:00Z',
      lastUpdated: '2025-09-04T10:23:00Z'
    },
    {
      id: 'CL940',
      title: 'Lab & Rad - Get Komponen Lab dan Radiologi',
      priority: 'LOW' as const,
      status: 'READY TO PRODUCTION' as const,
      createdBy: 'Rizki Pratama',
      tech: 'Siti Nurhaliza',
      qa: 'Agus Wijaya',
      createdDate: '2025-09-08T09:28:00Z',
      lastUpdated: '2025-09-08T09:28:00Z'
    },
    {
      id: 'CL937',
      title: 'Operasi - Riwayat ODS Rawat Jalan pada Rekam Medis',
      priority: 'HIGH' as const,
      status: 'IN PROGRESS' as const,
      createdBy: 'Fajar Nugroho',
      tech: 'Lina Marlina',
      qa: 'Dedi Kurniawan',
      createdDate: '2025-09-07T14:15:00Z',
      lastUpdated: '2025-09-08T16:45:00Z'
    },
    {
      id: 'CL935',
      title: 'Keperawatan - Dashboard Monitoring Pasien ICU',
      priority: 'MEDIUM' as const,
      status: 'READY TO DEVELOP' as const,
      createdBy: 'Nurul Hidayati',
      tech: 'Rizki Fauzi',
      qa: 'Sari Indah',
      createdDate: '2025-09-06T11:30:00Z',
      lastUpdated: '2025-09-06T11:30:00Z'
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
    goto(`/projects/backlog/${item.id}`);
  }

  function handleRefresh() {
    console.log('Refresh projects');
  }
</script>

<CardList
  title="Backlog"
  breadcrumb={['Project', 'Backlog']}
  items={projects}
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
