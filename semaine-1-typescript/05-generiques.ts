export function first<T>(items: T[]): T | undefined {
  return items[0];
}

export function last<T>(items: T[]): T | undefined {
  return items[items.length - 1];
}

export function groupBy<T, K extends keyof T>(
  items: T[],
  key: K,
): Record<string, T[]> {
  let groups: Record<string, T[]> = {};
  items.forEach((item) => {
    const groupKey = String(item[key]);
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
  });
  return groups;
}
