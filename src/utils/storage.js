export const checkStorage = (itemName) =>
  localStorage.getItem(itemName)
    ? JSON.parse(localStorage.getItem(itemName))
    : null;

export const saveToStorage = (itemName, data) =>
  localStorage.setItem(itemName, JSON.stringify(data));
