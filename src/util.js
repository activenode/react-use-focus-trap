export function convertToIntOrFallback(stringToConvert) {
  const parsed = parseInt(stringToConvert);
  return parsed ? parsed : 0;
}
