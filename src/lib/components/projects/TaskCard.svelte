<script lang="ts">
  import Card from '$lib/components/ui/Card.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';
  type Status = 'New' | 'In Progress' | 'In Testing' | 'High' | 'Done';
  
  let { title, assignee, status }: { title: string; assignee: string; status: Status } = $props();

  function variantFor(status: Status) {
    if (status === 'High') return 'danger';
    if (status === 'In Testing') return 'warning';
    if (status === 'Done') return 'success';
    return 'secondary';
  }
</script>

<Card class="space-y-2">
  <div class="flex items-start justify-between">
    <h4 class="font-medium">{title}</h4>
    <Badge variant={variantFor(status)}>{status}</Badge>
  </div>
  <div class="text-sm text-gray-500">Assignee: {assignee}</div>
</Card>


