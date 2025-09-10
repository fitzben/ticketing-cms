<script lang="ts">
  import Card from '$lib/components/ui/Card.svelte';
  let { title, value, trend = 0 } = $props<{ title: string; value: number | string; trend?: number }>();
</script>

<Card class="flex items-center justify-between">
  <div>
    <p class="text-sm text-gray-500">{title}</p>
    <p class="mt-1 text-2xl font-semibold">{value}</p>
  </div>
  <div class={`text-sm ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>{trend >= 0 ? '+' : ''}{trend}%</div>
</Card>


