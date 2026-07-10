export const formatValue = (value, unit) => {
  if (value == null) return "—";
  const number = Number.isInteger(value) ? value : value.toFixed(value < 10 ? 2 : 1);
  if (unit === "%") return `${number}%`;
  return `${number}`;
};

export const formatSignedValue = (value, unit) => {
  if (value == null || Number.isNaN(value)) return "—";
  const sign = value > 0 ? "+" : "";
  const number = Math.abs(value) < 10 ? value.toFixed(2) : value.toFixed(1);
  if (unit === "%") return `${sign}${number}%p`;
  if (unit === "Elo") return `${sign}${number} Elo`;
  return `${sign}${number}`;
};
