export function formatPrice(kobo: number, currency = 'NGN'): string {
  return new Intl.NumberFormat('en-NG', {
    style:                'currency',
    currency:              currency,
    minimumFractionDigits: 0,
  }).format(kobo / 100);
}