export function listsShareItem<T>(l1: T[], l2: T[]) {
  return l1.some((item1) => l2.includes(item1));
}
