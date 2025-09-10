<script lang="ts">
  import { onMount } from 'svelte';
  import { activePath } from '$lib/stores/navigation';
  import { page } from '$app/stores';
  import Badge from '$lib/components/ui/Badge.svelte';

  onMount(() => {
    activePath.set('/helpdesk/issues');
  });

  let activeTab = $state('home');

  // Mock data - in real app this would come from API
  const issue = {
    id: 'ISS8150',
    title: 'Harga Item Lab Tidak Sesuai Dengan Master Data',
    itemType: 'ISSUE',
    stopper: 'NO',
    status: 'RESOLVED',
    reporter: 'Ayu Ramadhan',
    reportDate: '09 Sep, 2025 20:57',
    module: '-',
    teamRoles: 'AIDO Care, Product & Tech',
    assignToTech: 'Alvin Ashari',
    hospital: 'RS Cahya Medika',
    assignToQA: '-',
    description: `Pasien Rawat Jalan a.n. KRISNA PUTRA ALFARESQI (MR 000312), Kunjungan 9 September 2025, No. Reg OPD090925003 / TRN202509090014. Di tagihan pembayaran pada item laboratorium DARAH LENGKAP, harga yang tertera di sistem sebesar Rp22.000, sedangkan sesuai master data seharusnya Rp71.500.`
  };

  function getItemTypeVariant(type: string) {
    switch (type) {
      case 'ISSUE': return 'danger';
      case 'BUG': return 'danger';
      case 'FEATURE': return 'primary';
      case 'ENHANCEMENT': return 'secondary';
      default: return 'secondary';
    }
  }

  function getStopperVariant(stopper: string) {
    return stopper === 'YES' ? 'danger' : 'primary';
  }

  function getStatusVariant(status: string) {
    switch (status) {
      case 'OPEN': return 'warning';
      case 'RESOLVED': return 'success';
      case 'IN_PROGRESS': return 'secondary';
      case 'CLOSED': return 'primary';
      default: return 'secondary';
    }
  }
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Issues</h1>
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
            <span class="text-gray-900 font-medium">Detail</span>
          </li>
        </ol>
      </nav>
    </div>
    
    <div class="flex items-center gap-3">
      <button class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        ← Back
      </button>
      <button class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-yellow-700 bg-yellow-100 border border-yellow-300 rounded-md hover:bg-yellow-200">
        Need Fixing
      </button>
      <button class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        Close
      </button>
    </div>
  </div>

  <!-- Main Content Card -->
  <div class="bg-white border border-gray-200 rounded-lg shadow-sm">
    <!-- Tabs -->
    <div class="border-b border-gray-200">
      <nav class="flex space-x-8 px-6">
        <button 
          class="py-4 px-1 border-b-2 font-medium text-sm {activeTab === 'home' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
          onclick={() => activeTab = 'home'}
        >
          Home
        </button>
        <button 
          class="py-4 px-1 border-b-2 font-medium text-sm {activeTab === 'timeline' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
          onclick={() => activeTab = 'timeline'}
        >
          Status Timeline
        </button>
      </nav>
    </div>

    <!-- Tab Content -->
    <div class="p-6">
      {#if activeTab === 'home'}
        <!-- Issue Details -->
        <div class="space-y-6">
          <!-- Title -->
          <div>
            <h2 class="text-xl font-semibold text-gray-900 mb-4">{issue.title}</h2>
          </div>

          <!-- Key Information Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Item Type / Stopper / Status -->
            <div class="space-y-3">
              <h3 class="text-sm font-medium text-gray-700">Item Type / Stopper / Status</h3>
              <div class="flex flex-wrap gap-2">
                <Badge variant={getItemTypeVariant(issue.itemType)}>{issue.itemType}</Badge>
                <Badge variant={getStopperVariant(issue.stopper)}>{issue.stopper}</Badge>
                <Badge variant={getStatusVariant(issue.status)}>{issue.status}</Badge>
              </div>
            </div>

            <!-- Reporter -->
            <div>
              <h3 class="text-sm font-medium text-gray-700">Reporter</h3>
              <p class="text-sm text-gray-900">{issue.reporter}</p>
            </div>

            <!-- Report Date -->
            <div>
              <h3 class="text-sm font-medium text-gray-700">Report Date</h3>
              <p class="text-sm text-gray-900">{issue.reportDate}</p>
            </div>

            <!-- Module -->
            <div>
              <h3 class="text-sm font-medium text-gray-700">Module</h3>
              <p class="text-sm text-gray-900">{issue.module}</p>
            </div>

            <!-- Team Roles -->
            <div>
              <h3 class="text-sm font-medium text-gray-700">Team Roles</h3>
              <p class="text-sm text-gray-900">{issue.teamRoles}</p>
            </div>

            <!-- Assign To Tech -->
            <div>
              <h3 class="text-sm font-medium text-gray-700">Assign To Tech</h3>
              <p class="text-sm text-gray-900">{issue.assignToTech}</p>
            </div>

            <!-- Hospital -->
            <div>
              <h3 class="text-sm font-medium text-gray-700">Hospital</h3>
              <p class="text-sm text-gray-900">{issue.hospital}</p>
            </div>

            <!-- Assign To QA -->
            <div>
              <h3 class="text-sm font-medium text-gray-700">Assign To QA</h3>
              <p class="text-sm text-gray-900">{issue.assignToQA}</p>
            </div>
          </div>

          <!-- Description -->
          <div class="space-y-3">
            <h3 class="text-sm font-medium text-gray-700">Description - Condition</h3>
            <div class="bg-gray-50 p-4 rounded-md">
              <p class="text-sm text-gray-900 leading-relaxed">{issue.description}</p>
            </div>
          </div>

          <!-- HOSPITA Section (Mock) -->
          <div class="border border-gray-200 rounded-lg p-4">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="h-8 w-8 bg-green-600 rounded flex items-center justify-center">
                  <span class="text-white font-bold text-sm">H</span>
                </div>
                <span class="font-semibold text-gray-900">HOSPITA</span>
              </div>
              <div class="flex items-center gap-2">
                <button class="p-2 text-gray-500 hover:text-gray-700" aria-label="Menu">
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                </button>
                <select class="text-sm border border-gray-300 rounded px-2 py-1">
                  <option>Rumah Sakit Cahya Medika</option>
                </select>
              </div>
            </div>
            
            <!-- Table -->
            <div class="overflow-x-auto">
              <table class="min-w-full text-sm">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-3 py-2 text-left font-medium text-gray-700">Laboratorium</th>
                    <th class="px-3 py-2 text-left font-medium text-gray-700">Quantity</th>
                    <th class="px-3 py-2 text-left font-medium text-gray-700">Harga</th>
                    <th class="px-3 py-2 text-left font-medium text-gray-700">Penyesuaian Harga</th>
                    <th class="px-3 py-2 text-left font-medium text-gray-700">Sub Total</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr>
                    <td class="px-3 py-2 flex items-center gap-2">
                      <span>Darah Lengkap</span>
                      <svg class="h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                      </svg>
                    </td>
                    <td class="px-3 py-2">1</td>
                    <td class="px-3 py-2">Rp 22.000</td>
                    <td class="px-3 py-2">0</td>
                    <td class="px-3 py-2">Rp 22.000</td>
                  </tr>
                  <tr>
                    <td class="px-3 py-2 text-gray-500" colspan="5">Tidak ada data</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- Grand Total -->
            <div class="mt-4 flex justify-end">
              <div class="bg-gray-100 px-4 py-2 rounded">
                <span class="font-medium text-gray-900">Grand Total: Rp. 652.200</span>
              </div>
            </div>
          </div>
        </div>
      {:else if activeTab === 'timeline'}
        <!-- Status Timeline Content -->
        <div class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">Status Timeline</h3>
          <p class="mt-1 text-sm text-gray-500">Timeline will be displayed here.</p>
        </div>
      {/if}
    </div>
  </div>
</div>
