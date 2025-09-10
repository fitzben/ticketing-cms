<script lang="ts">
  let { class: className = '', children } = $props<{ class?: string; children: any }>();
</script>

<div class={`bg-white rounded-lg shadow-md p-4 ${className}`}>
  {@render children()}
</div>


