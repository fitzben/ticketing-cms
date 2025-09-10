<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  let { 
    value = '',
    placeholder = 'Enter your text here...',
    height = '200px'
  } = $props<{
    value?: string;
    placeholder?: string;
    height?: string;
  }>();

  let content = $state(value);
  let editorRef: HTMLDivElement;

  function handleInput() {
    content = editorRef.innerHTML;
    dispatch('change', content);
  }

  function formatText(command: string, value?: string) {
    document.execCommand(command, false, value);
    editorRef.focus();
    handleInput();
  }

  function insertLink() {
    const url = prompt('Enter URL:');
    if (url) {
      formatText('createLink', url);
    }
  }

  function insertList(type: 'insertOrderedList' | 'insertUnorderedList') {
    formatText(type);
  }

  // Update content when value prop changes
  $effect(() => {
    if (value !== content) {
      content = value;
      if (editorRef) {
        editorRef.innerHTML = content;
      }
    }
  });
</script>

<div class="rich-text-editor border border-gray-300 rounded-md">
  <!-- Toolbar -->
  <div class="toolbar border-b border-gray-300 p-2 flex flex-wrap gap-1 bg-gray-50">
    <!-- Text Formatting -->
    <button
      type="button"
      onclick={() => formatText('bold')}
      class="p-2 hover:bg-gray-200 rounded text-sm font-bold"
      title="Bold"
    >
      B
    </button>
    <button
      type="button"
      onclick={() => formatText('italic')}
      class="p-2 hover:bg-gray-200 rounded text-sm italic"
      title="Italic"
    >
      I
    </button>
    <button
      type="button"
      onclick={() => formatText('underline')}
      class="p-2 hover:bg-gray-200 rounded text-sm underline"
      title="Underline"
    >
      U
    </button>
    
    <div class="w-px h-6 bg-gray-300 mx-1"></div>
    
    <!-- Lists -->
    <button
      type="button"
      onclick={() => insertList('insertUnorderedList')}
      class="p-2 hover:bg-gray-200 rounded"
      title="Bullet List"
    >
      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
      </svg>
    </button>
    <button
      type="button"
      onclick={() => insertList('insertOrderedList')}
      class="p-2 hover:bg-gray-200 rounded"
      title="Numbered List"
    >
      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
      </svg>
    </button>
    
    <div class="w-px h-6 bg-gray-300 mx-1"></div>
    
    <!-- Link -->
    <button
      type="button"
      onclick={insertLink}
      class="p-2 hover:bg-gray-200 rounded"
      title="Insert Link"
    >
      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
      </svg>
    </button>
    
    <div class="w-px h-6 bg-gray-300 mx-1"></div>
    
    <!-- Clear Formatting -->
    <button
      type="button"
      onclick={() => formatText('removeFormat')}
      class="p-2 hover:bg-gray-200 rounded text-sm"
      title="Clear Formatting"
    >
      Clear
    </button>
  </div>
  
  <!-- Editor -->
  <div
    bind:this={editorRef}
    contenteditable="true"
    oninput={handleInput}
    onpaste={handleInput}
    class="editor p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    style="min-height: {height}; max-height: 400px; overflow-y: auto;"
    data-placeholder={placeholder}
  ></div>
</div>

<style>
  .editor:empty:before {
    content: attr(data-placeholder);
    color: #9ca3af;
    pointer-events: none;
  }
  
  .editor:focus:empty:before {
    content: attr(data-placeholder);
    color: #9ca3af;
  }
  
  .editor ul, .editor ol {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
  }
  
  .editor li {
    margin: 0.25rem 0;
  }
  
  .editor a {
    color: #2563eb;
    text-decoration: underline;
  }
  
  .editor a:hover {
    color: #1d4ed8;
  }
</style>
