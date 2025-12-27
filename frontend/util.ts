/**
 * Format tanggal ke format Indonesia
 * Contoh: 2025-12-25 -> 25 Desember 2025
 */
export function formatDate(
  date: Date | string | number,
  locale: string = "id-ID"
): string {
  if (!date) return "-";

  const d = new Date(date);
  if (isNaN(d.getTime())) return "-";

  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);
}

/**
 * Format angka ke Rupiah
 * Contoh: 1500000 -> Rp 1.500.000
 */
export function formatRupiah(
  value: number | string,
  withSymbol: boolean = true
): string {
  if (value === null || value === undefined || value === "") return "Rp 0";

  const number = Number(value);
  if (isNaN(number)) return "Rp 0";

  const formatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);

  return withSymbol ? formatted : formatted.replace("Rp", "").trim();
}

export function formatDateTime(dateInput: Date | string | number): string {
  const date = new Date(dateInput);

  const pad = (n: number) => n.toString().padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hour = pad(date.getHours());
  const minute = pad(date.getMinutes());
  const second = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
