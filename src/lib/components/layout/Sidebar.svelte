<script lang="ts">
  import { activePath, expandedMenus } from '$lib/stores/navigation';
  import { get } from 'svelte/store';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let { 
    userName = 'Benjamin Sitompul',
    userEmail = 'benjamin.sitompul@bithealth.co.id',
    isCollapsed = false
  } = $props<{
    userName?: string;
    userEmail?: string;
    isCollapsed?: boolean;
  }>();

  let showUserDropdown = $state(false);
  let showProjectDropdown = $state(false);
  let selectedProject = $state('Maintenance & Supports');

  type MenuItem = {
    id: string;
    label: string;
    href?: string;
    icon?: string;
    children?: Array<{ id: string; label: string; href: string }>;
  };

  const menus: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', href: '/', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z' },
    {
      id: 'helpdesk',
      label: 'Helpdesk',
      icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z',
      children: [
        { id: 'issues', label: 'Issues', href: '/helpdesk/issues' }
      ]
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
      children: [
        { id: 'clinical', label: 'Clinical', href: '/projects/clinical' },
        { id: 'maintenance', label: 'Maintenance & Supports', href: '/projects/maintenance' }
      ]
    },
    { id: 'cicd', label: 'CI / CD', href: '/cicd', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
    { id: 'calendar', label: 'Calendar', href: '/calendar', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' }
  ];

  const clinicalSubMenus = [
    { id: 'backlog', label: 'Backlog', href: '/projects/clinical/backlog' },
    { id: 'board', label: 'Board', href: '/projects/clinical/board' },
    { id: 'my-board', label: 'My Board', href: '/projects/clinical/my-board' }
  ];

  const projectEnvironments = ['Maintenance & Supports', 'MD Now - Development', 'MD Now - Staging', 'MD Now - Production'];

  function toggleExpand(id: string) {
    const setCopy = new Set(get(expandedMenus));
    if (setCopy.has(id)) setCopy.delete(id);
    else setCopy.add(id);
    expandedMenus.set(setCopy);
  }

  function setActive(path: string) {
    activePath.set(path);
  }

  function handleUserMenuClick() {
    showUserDropdown = !showUserDropdown;
  }

  function handleProjectSelect(project: string) {
    selectedProject = project;
    showProjectDropdown = false;
  }

  function handleLogout() {
    dispatch('logout');
  }

  function getInitials(name: string) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }
</script>

<aside class="hidden w-64 shrink-0 border-r bg-white md:block">
  <!-- Project Environment Switcher -->
  <div class="p-4 border-b">
    <div class="relative">
      <label class="block text-xs font-medium text-gray-500 mb-2">Project Environment</label>
      <button
        onclick={() => showProjectDropdown = !showProjectDropdown}
        class="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span>{selectedProject}</span>
        <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      
      {#if showProjectDropdown}
        <div class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {#each projectEnvironments.filter(project => project !== selectedProject) as project}
            <button
              onclick={() => handleProjectSelect(project)}
              class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
            >
              {project}
            </button>
          {/each}
        </div>
      {/if}
    </div>
  </div>

  <!-- User Area -->
  <div class="p-4 border-b">
    <div class="relative">
      <button
        onclick={handleUserMenuClick}
        class="w-full flex items-center gap-3 p-2 text-left hover:bg-gray-50 rounded-md transition-colors"
      >
        <div class="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
          {getInitials(userName)}
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 truncate">Welcome, {userName}</p>
          <p class="text-xs text-gray-500 truncate">{userEmail}</p>
        </div>
        <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      
      {#if showUserDropdown}
        <div class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          <a href="/profile" class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-md">My Profile</a>
          <a href="/messages" class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">Messages</a>
          <a href="/settings" class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
          <button onclick={handleLogout} class="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-md">Logout</button>
        </div>
      {/if}
    </div>
  </div>

  <!-- Navigation Menu -->
  <nav class="p-4 space-y-1">
    {#each menus as menu}
      {#if menu.children}
        <div>
          <button 
            class="w-full flex items-center gap-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md transition-colors" 
            onclick={() => toggleExpand(menu.id)}
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={menu.icon}></path>
            </svg>
            <span class="flex-1">{menu.label}</span>
            <svg class={`h-4 w-4 transition-transform ${$expandedMenus.has(menu.id) ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          {#if $expandedMenus.has(menu.id)}
            <div class="mt-1 space-y-1 pl-8">
              {#each menu.children as item}
                {#if item.id === 'clinical'}
                  <!-- Clinical submenu -->
                  <div>
                    <a 
                      href={item.href} 
                      class={`block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors ${$activePath === item.href ? 'bg-blue-50 text-blue-700 font-medium' : ''}`} 
                      onclick={() => setActive(item.href)}
                    >
                      {item.label}
                    </a>
                    {#if $expandedMenus.has('clinical')}
                      <div class="mt-1 space-y-1 pl-4">
                        {#each clinicalSubMenus as subItem}
                          <a 
                            href={subItem.href} 
                            class={`block px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded-md transition-colors ${$activePath === subItem.href ? 'bg-blue-50 text-blue-700 font-medium' : ''}`} 
                            onclick={() => setActive(subItem.href)}
                          >
                            {subItem.label}
                          </a>
                        {/each}
                      </div>
                    {/if}
                  </div>
                {:else}
                  <a 
                    href={item.href} 
                    class={`block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors ${$activePath === item.href ? 'bg-blue-50 text-blue-700 font-medium' : ''}`} 
                    onclick={() => setActive(item.href)}
                  >
                    {item.label}
                  </a>
                {/if}
              {/each}
            </div>
          {/if}
        </div>
      {:else}
        <a 
          href={menu.href} 
          class={`flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors ${$activePath === menu.href ? 'bg-blue-50 text-blue-700 font-medium' : ''}`} 
          onclick={() => menu.href && setActive(menu.href)}
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={menu.icon}></path>
          </svg>
          <span>{menu.label}</span>
        </a>
      {/if}
    {/each}
  </nav>
</aside>


