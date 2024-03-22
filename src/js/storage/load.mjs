export function load(key) {
    try {
      const serializedData = localStorage.getItem(key);
      return JSON.parse(serializedData);
    } catch {
      return undefined;
    }
  }
  