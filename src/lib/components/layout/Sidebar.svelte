<script lang="ts">
  import { activePath, expandedMenus } from '$lib/stores/navigation';
  import { get } from 'svelte/store';

  let { 
    isCollapsed = false,
    userName = 'Benjamin Sitompul',
    userEmail = 'benjamin.sitompul@bithealth.co.id'
  } = $props<{
    isCollapsed?: boolean;
    userName?: string;
    userEmail?: string;
  }>();

  // Top pill navbar state
  type TopTab = 'menu' | 'docs' | 'settings' | 'help';
  let activeTab: TopTab = 'menu';

  // Settings: selected project environment
  type ProjectEnv = { project: string; env: string };
  const projectEnvironments: ProjectEnv[] = [
    { project: 'Hospita', env: 'Development' },
    { project: 'Hospita', env: 'Production' },
    { project: 'Klinika', env: 'Development' },
    { project: 'Klinika', env: 'Production' }
  ];
  let selectedProject = $state<ProjectEnv>({ project: 'Hospita', env: 'Development' });

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

  function toggleExpand(id: string) {
    const setCopy = new Set(get(expandedMenus));
    if (setCopy.has(id)) setCopy.delete(id);
    else setCopy.add(id);
    expandedMenus.set(setCopy);
  }

  function setActive(path: string) {
    activePath.set(path);
  }

  function handleProjectSelect(project: ProjectEnv) {
    selectedProject = project;
  }

  function getInitials(name: string) {
    return name
      .split(' ')
      .filter(Boolean)
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  }
</script>

<aside class="hidden w-64 shrink-0 border-r bg-white md:block">
  <!-- Top pill navbar -->
  <div class="p-4">
    <div class="flex items-center justify-between rounded-full bg-slate-800 px-4 py-2">
      <button
        class={`flex items-center gap-2 text-sm font-medium px-2 py-1 rounded-full transition-colors ${activeTab === 'menu' ? 'text-teal-300' : 'text-slate-300 hover:text-white'}`}
        onclick={() => activeTab = 'menu'}
        aria-label="Menu"
      >
        <span>Menu</span>
      </button>
      <button
        class={`p-1 rounded-full transition-colors ${activeTab === 'docs' ? 'text-teal-300' : 'text-slate-400 hover:text-white'}`}
        onclick={() => activeTab = 'docs'}
        aria-label="Docs"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12m-6-6h12M4 7a2 2 0 012-2h8l4 4v9a2 2 0 01-2 2H6a2 2 0 01-2-2V7z"></path>
        </svg>
      </button>
      <button
        class={`p-1 rounded-full transition-colors ${activeTab === 'settings' ? 'text-teal-300' : 'text-slate-400 hover:text-white'}`}
        onclick={() => activeTab = 'settings'}
        aria-label="Settings"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
        </svg>
      </button>
      <button
        class={`p-1 rounded-full transition-colors ${activeTab === 'help' ? 'text-teal-300' : 'text-slate-400 hover:text-white'}`}
        onclick={() => activeTab = 'help'}
        aria-label="Help"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10a4 4 0 118 0c0 2-4 2-4 5m0 3h.01M12 2a10 10 0 100 20 10 10 0 000-20z"></path>
        </svg>
      </button>
    </div>
  </div>

  {#if activeTab === 'menu'}
    <!-- User welcome -->
    <div class="px-4">
      <div class="w-full flex items-center gap-3 p-2 text-left rounded-md">
        <div class="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
          {getInitials(userName)}
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 truncate">Welcome, {userName}</p>
          <p class="text-xs text-gray-500 truncate">{userEmail}</p>
        </div>
      </div>
    </div>
    <!-- Navigation Menu (Image 2 style) -->
    <nav class="p-4 space-y-1">
      {#each menus as menu}
        {#if menu.children}
          <div class="rounded-lg">
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
              <div class="mt-1 space-y-1 pl-8 border border-teal-300 rounded-xl p-2">
                {#each menu.children as item}
                  {#if item.id === 'clinical'}
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
  {:else if activeTab === 'settings'}
    <!-- Settings view (Image 3 style) -->
    <div class="px-4">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">Project Environment</h2>
      <div class="flex flex-col gap-3">
        {#each projectEnvironments as env}
          <button
            class={`text-left border rounded-md px-4 py-3 hover:bg-gray-50 transition-colors ${env.project === selectedProject.project && env.env === selectedProject.env ? 'border-teal-400 ring-1 ring-teal-200 bg-teal-50' : 'border-gray-200'}`}
            onclick={() => handleProjectSelect(env)}
          >
            <div class="flex items-start justify-between">
              <div>
                <p class="text-lg text-gray-800">{env.project}</p>
                <p class="text-sm text-gray-500">{env.env}</p>
              </div>
              {#if env.project === selectedProject.project && env.env === selectedProject.env}
                <svg class="h-5 w-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              {/if}
            </div>
          </button>
        {/each}
      </div>
    </div>
  {:else if activeTab === 'docs'}
    <div class="p-4 text-sm text-gray-600">Documentation coming soon.</div>
  {:else}
    <div class="p-4 text-sm text-gray-600">Help & Support coming soon.</div>
  {/if}
</aside>


