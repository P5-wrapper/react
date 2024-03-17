export function withoutKeys(
  record: Record<string, unknown>,
  keysToIgnore: Array<string>
) {
  if (keysToIgnore.length === 0) {
    return record;
  }

  return Object.keys(record)
    .filter(key => !keysToIgnore.includes(key))
    .reduce(
      (accumulator, current) => {
        accumulator[current] = record[current];

        return accumulator;
      },
      {} as Record<string, unknown>
    );
}
