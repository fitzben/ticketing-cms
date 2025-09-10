<script lang="ts">
  import Card from '$lib/components/ui/Card.svelte';
  let { title } = $props<{ title: string }>();
</script>

<Card>
  <h4 class="mb-3 text-sm font-medium text-gray-600">{title}</h4>
  <div class="h-40 w-full rounded-md bg-gradient-to-tr from-blue-50 to-violet-50"></div>
</Card>


