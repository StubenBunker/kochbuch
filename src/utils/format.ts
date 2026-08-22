export function formatAmount(n: number): string {
  const rounded = Math.round(n * 10) / 10;
  if (rounded % 1 === 0) return String(rounded);
  return rounded.toFixed(1).replace('.', ',');
}
