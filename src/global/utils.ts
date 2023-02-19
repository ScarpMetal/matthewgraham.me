/**
 * Compares two values of any type to see if they are equal
 * @param {*} original
 * @param {*} value
 */
export function isEqual(original: any, value: any): boolean {
  if (Array.isArray(original) && Array.isArray(value)) {
    return (
      original.length === value.length &&
      !original.some((item, i) => !isEqual(item, value[i]))
    );
  }
  if (typeof original === "object" && typeof value === "object") {
    if (Object.keys(original).length !== Object.keys(value).length) {
      return false;
    }

    for (let key in original) {
      if (!isEqual(original[key], value[key])) {
        return false;
      }
    }
    return true;
  }
  return original === value;
}
