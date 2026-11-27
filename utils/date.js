export function formatDate(
  date,
  options = { day: "2-digit", month: "short", year: "numeric" },
) {
  return new Intl.DateTimeFormat("en-IN", options).format(date);
}

export function localDateInputValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function moveDate(date, amount, period) {
  const next = new Date(date);
  if (period === "Weekly") next.setDate(next.getDate() + amount * 7);
  else if (period === "Monthly") next.setMonth(next.getMonth() + amount);
  else next.setDate(next.getDate() + amount);
  return next;
}
