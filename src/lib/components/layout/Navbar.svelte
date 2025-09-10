<script lang="ts">
  import { activePath } from '$lib/stores/navigation';
  import { page } from '$app/stores';
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  let { 
    environment = 'Maintenance & Supports'
  } = $props<{
    environment?: string;
  }>();

  let showNotifications = $state(false);
  let showSettings = $state(false);

  $effect(() => {
    activePath.set($page.url.pathname);
  });

  const notifications = [
    {
      id: 1,
      title: 'New issue assigned to you',
      message: 'ISS8150 - Harga Item Lab Tidak Sesuai Dengan Master Data',
      time: '2 minutes ago',
      unread: true
    },
    {
      id: 2,
      title: 'Project status updated',
      message: 'CL933 - Operasi - Cetak Laporan Operasi is now READY TO DEVELOP',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 3,
      title: 'Comment added',
      message: 'New comment on CL924 - Operasi - Cancel Order Operasi',
      time: '3 hours ago',
      unread: false
    },
    {
      id: 4,
      title: 'System maintenance scheduled',
      message: 'Scheduled maintenance on Sunday, 2:00 AM - 4:00 AM',
      time: '1 day ago',
      unread: false
    }
  ];

  function toggleNotifications() {
    showNotifications = !showNotifications;
    showSettings = false;
  }

  function toggleSettings() {
    showSettings = !showSettings;
    showNotifications = false;
  }

  function handleLogout() {
    dispatch('logout');
  }
</script>

<header class="flex items-center justify-between bg-white px-6 shadow-sm border-b">
  <div class="flex items-center gap-4">
    <div class="flex flex-col">
      <h1 class="text-xl font-bold text-gray-900">MD Corp</h1>
      <p class="text-sm text-gray-500">{environment}</p>
    </div>
  </div>
  
  <div class="flex items-center gap-4">
    <!-- Notifications -->
    <div class="relative">
      <button 
        onclick={toggleNotifications}
        class="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md" 
        aria-label="Notifications"
      >
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
        </svg>
        <span class="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
      </button>
      
      {#if showNotifications}
        <div class="absolute right-0 mt-2 w-80 bg-white border border-gray-300 rounded-md shadow-lg z-50">
          <div class="p-4 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">Notifications</h3>
          </div>
          <div class="max-h-96 overflow-y-auto">
            {#each notifications as notification}
              <div class="p-4 border-b border-gray-100 hover:bg-gray-50 {notification.unread ? 'bg-blue-50' : ''}">
                <div class="flex items-start gap-3">
                  <div class="flex-shrink-0">
                    {#if notification.unread}
                      <div class="h-2 w-2 bg-blue-500 rounded-full mt-2"></div>
                    {/if}
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900">{notification.title}</p>
                    <p class="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <p class="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                </div>
              </div>
            {/each}
          </div>
          <div class="p-4 border-t border-gray-200">
            <a href="/notifications" class="text-sm text-blue-600 hover:text-blue-800">View all notifications</a>
          </div>
        </div>
      {/if}
    </div>

    <!-- Settings -->
    <div class="relative">
      <button 
        onclick={toggleSettings}
        class="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md" 
        aria-label="Settings"
      >
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
        </svg>
      </button>
      
      {#if showSettings}
        <div class="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
          <div class="py-1">
            <a href="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Profile</a>
            <a href="/settings" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
            <a href="/help" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Help & Support</a>
            <div class="border-t border-gray-100"></div>
            <button onclick={handleLogout} class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
          </div>
        </div>
      {/if}
    </div>
  </div>
</header>


