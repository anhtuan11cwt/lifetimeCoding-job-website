export function formatVND(amount) {
  if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(0)} triệu ₫`;
  }
  return `${amount.toLocaleString("vi-VN")}₫`;
}

export function formatSalaryRange(min, max) {
  return `${formatVND(min)} - ${formatVND(max)}`;
}

export function formatDate(dateString) {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN");
}

export function getInitials(name) {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
