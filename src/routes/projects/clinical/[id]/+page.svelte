<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { activePath } from '$lib/stores/navigation';
  import { goto } from '$app/navigation';
  import TabInterface from '$lib/components/ui/TabInterface.svelte';
  import RichTextEditor from '$lib/components/ui/RichTextEditor.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';

  onMount(() => {
    activePath.set('/projects/clinical');
  });

  let { data } = $props();
  let projectId = $page.params.id;
  let newTask = $state('');
  let newComment = $state('');
  let tasks = $state([
    { id: 1, title: 'Setup database schema', completed: true },
    { id: 2, title: 'Create API endpoints', completed: false },
    { id: 3, title: 'Implement frontend components', completed: false },
    { id: 4, title: 'Write unit tests', completed: false }
  ]);

  // Mock project data
  const project = {
    id: projectId,
    title: 'Operasi - Cetak Laporan Operasi',
    priority: 'HIGH',
    status: 'READY TO DEVELOP',
    createdBy: 'Restu Putri',
    tech: 'Ahmad Rizki, Budi Santoso',
    qa: 'Sari Dewi, Lina Marlina',
    createdDate: '2025-08-04T15:55:00Z',
    lastUpdated: '2025-08-04T15:55:00Z',
    description: 'Implement functionality to generate and print operation reports for the hospital management system.'
  };

  function getPriorityVariant(priority: string) {
    switch (priority) {
      case 'HIGH': return 'danger';
      case 'MEDIUM': return 'warning';
      case 'LOW': return 'success';
      default: return 'secondary';
    }
  }

  function getStatusVariant(status: string) {
    switch (status) {
      case 'READY TO DEVELOP': return 'info';
      case 'IN PROGRESS': return 'secondary';
      case 'IN TESTING': return 'warning';
      case 'READY TO PRODUCTION': return 'success';
      case 'DONE': return 'success';
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

  function addTask() {
    if (newTask.trim()) {
      tasks = [...tasks, {
        id: tasks.length + 1,
        title: newTask.trim(),
        completed: false
      }];
      newTask = '';
    }
  }

  function toggleTask(id: number) {
    tasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
  }

  function handleCommentChange(event: CustomEvent) {
    newComment = event.detail;
  }

  function submitComment() {
    if (newComment.trim()) {
      console.log('Submitting comment:', newComment);
      newComment = '';
    }
  }

  // Tab components
  const HomeTab = () => {
    return `
      <div class="space-y-6">
        <!-- Project Details -->
        <div class="bg-white rounded-lg border border-gray-200 p-6">
          <div class="flex items-start justify-between mb-4">
            <div>
              <h2 class="text-xl font-bold text-gray-900 mb-2">#{project.id}</h2>
              <h3 class="text-lg text-gray-700 mb-4">${project.title}</h3>
            </div>
            <div class="flex gap-2">
              <Badge variant="${getPriorityVariant(project.priority)}">${project.priority}</Badge>
              <Badge variant="${getStatusVariant(project.status)}">${project.status}</Badge>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label class="text-sm font-medium text-gray-500">Created By</label>
              <p class="text-sm text-gray-900">${project.createdBy}</p>
            </div>
            <div>
              <label class="text-sm font-medium text-gray-500">Created Date</label>
              <p class="text-sm text-gray-900">${formatDate(project.createdDate)}</p>
            </div>
            <div>
              <label class="text-sm font-medium text-gray-500">Last Updated</label>
              <p class="text-sm text-gray-900">${formatDate(project.lastUpdated)}</p>
            </div>
          </div>
          
          <div>
            <label class="text-sm font-medium text-gray-500 mb-2 block">Description</label>
            <p class="text-sm text-gray-700">${project.description}</p>
          </div>
        </div>

        <!-- Team Assignment -->
        <div class="bg-white rounded-lg border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Team Assignment</h3>
          <div class="grid grid-cols-2 gap-6">
            <div>
              <label class="text-sm font-medium text-gray-500 mb-2 block">Tech Team</label>
              <div class="flex gap-2">
                ${parseTechQA(project.tech).map(person => `
                  <div class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span class="text-xs font-medium text-blue-600">${getInitials(person)}</span>
                  </div>
                `).join('')}
              </div>
            </div>
            <div>
              <label class="text-sm font-medium text-gray-500 mb-2 block">QA Team</label>
              <div class="flex gap-2">
                ${parseTechQA(project.qa).map(person => `
                  <div class="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <span class="text-xs font-medium text-green-600">${getInitials(person)}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- Sub-tasks -->
        <div class="bg-white rounded-lg border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Sub-tasks</h3>
            <button class="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              + Add Task
            </button>
          </div>
          
          <div class="space-y-3">
            ${tasks.map(task => `
              <div class="flex items-center gap-3 p-3 border border-gray-200 rounded-md">
                <input 
                  type="checkbox" 
                  ${task.completed ? 'checked' : ''}
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span class="flex-1 text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}">${task.title}</span>
              </div>
            `).join('')}
          </div>
          
          <div class="mt-4 flex gap-2">
            <input
              type="text"
              placeholder="Add new task..."
              class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
              Add
            </button>
          </div>
        </div>
      </div>
    `;
  };

  const CommentsTab = () => {
    return `
      <div class="space-y-6">
        <!-- Comment Form -->
        <div class="bg-white rounded-lg border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Leave a reply</h3>
          <div class="mb-4">
            <div class="border border-gray-300 rounded-md p-3 min-h-[200px] focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
              <div contenteditable="true" class="outline-none" placeholder="Write your comment here..."></div>
            </div>
          </div>
          <button class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
            Reply
          </button>
        </div>

        <!-- Comments List -->
        <div class="space-y-4">
          <div class="bg-white rounded-lg border border-gray-200 p-6">
            <div class="flex items-start gap-3">
              <div class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span class="text-xs font-medium text-blue-600">BS</span>
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-sm font-medium text-gray-900">Benjamin Sitompul</span>
                  <span class="text-xs text-gray-500">2 hours ago</span>
                </div>
                <p class="text-sm text-gray-700">This looks good to proceed with development. Please ensure all database migrations are included.</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-lg border border-gray-200 p-6">
            <div class="flex items-start gap-3">
              <div class="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <span class="text-xs font-medium text-green-600">RP</span>
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-sm font-medium text-gray-900">Restu Putri</span>
                  <span class="text-xs text-gray-500">1 day ago</span>
                </div>
                <p class="text-sm text-gray-700">Initial requirements have been documented. Ready for technical review.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  const StatusTimelineTab = () => {
    return `
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Status Timeline</h3>
        <div class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">Status Timeline</h3>
          <p class="mt-1 text-sm text-gray-500">This feature is coming soon.</p>
        </div>
      </div>
    `;
  };

  const tabs = [
    { id: 'home', label: 'Home', content: HomeTab },
    { id: 'comments', label: 'Comments', content: CommentsTab },
    { id: 'timeline', label: 'Status Timeline', content: StatusTimelineTab }
  ];
</script>

<svelte:head>
  <title>Project #{projectId} - MD Now Ticketing CMS</title>
</svelte:head>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <div>
      <button 
        onclick={() => goto('/projects/clinical/my-board')}
        class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 mb-4"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Back to My Board
      </button>
      <h1 class="text-2xl font-bold text-gray-900">Project #{projectId}</h1>
      <nav class="flex" aria-label="Breadcrumb">
        <ol class="flex items-center space-x-2">
          <li>
            <span class="text-gray-500">/</span>
          </li>
          <li>
            <span class="text-gray-500">Project</span>
          </li>
          <li>
            <span class="text-gray-500">/</span>
          </li>
          <li>
            <span class="text-gray-500">Clinical</span>
          </li>
          <li>
            <span class="text-gray-500">/</span>
          </li>
          <li>
            <span class="text-gray-900 font-medium">#{projectId}</span>
          </li>
        </ol>
      </nav>
    </div>
  </div>

  <!-- Tab Interface -->
  <TabInterface {tabs} />
</div>
