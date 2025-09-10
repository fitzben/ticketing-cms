export function formatDateToShort(input: Date | string | number): string {
  const date = input instanceof Date ? input : new Date(input);
  return new Intl.DateTimeFormat('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' }).format(date);
}

export function formatNumberCompact(value: number): string {
  return new Intl.NumberFormat('en', { notation: 'compact' }).format(value);
}


