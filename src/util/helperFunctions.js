export function areEqualShallow(a, b) {
  for (var key in a) {
    if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}
