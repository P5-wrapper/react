export function withoutKeys(
  record: Record<string, unknown>,
  keysToIgnore: string[]
) {
  if (keysToIgnore.length === 0) {
    return record;
  }

  return Object.keys(record)
    .filter(key => !keysToIgnore.includes(key))
    .reduce<Record<string, unknown>>((accumulator, current) => {
      accumulator[current] = record[current];

      return accumulator;
    }, {});
}
