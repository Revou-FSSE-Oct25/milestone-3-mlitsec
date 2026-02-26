export function formatCurrencyUSDToIDR(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount * 16000);
}

export function joinClassName(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
