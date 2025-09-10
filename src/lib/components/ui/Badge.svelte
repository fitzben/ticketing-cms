<script lang="ts">
  type Variant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  let { variant = 'primary', children } = $props<{ variant?: Variant; children: any }>();

  const classesByVariant: Record<Variant, string> = {
    primary: 'bg-blue-600 text-white',
    secondary: 'bg-gray-600 text-white',
    success: 'bg-green-600 text-white',
    warning: 'bg-yellow-500 text-black',
    danger: 'bg-red-600 text-white',
    info: 'bg-cyan-100 text-cyan-800 border border-cyan-200'
  };
</script>

<span class={`inline-flex items-center rounded px-2 py-1 text-xs font-medium ${classesByVariant[variant as Variant]}`}>
  {@render children()}
</span>


