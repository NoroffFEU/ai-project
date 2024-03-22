export function save(key, data) {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  }
  