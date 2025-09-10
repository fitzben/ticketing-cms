import { writable } from 'svelte/store';

// Menyimpan path menu yang aktif saat ini
export const activePath = writable<string>('/');

// Menyimpan ID menu yang sedang di-expand (terbuka)
export const expandedMenus = writable<Set<string>>(new Set(['helpdesk', 'projects']));

// User information
export const currentUser = writable({
  name: 'Benjamin Sitompul',
  avatar: '/api/placeholder/40/40'
});


