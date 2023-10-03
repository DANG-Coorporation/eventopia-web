// localStorage.ts

// Define a function to check if we are in a browser environment
const isBrowser = () => typeof window !== "undefined";

// Get an item from localStorage
export const getLocalStorage = (key: string): string | null => {
  if (isBrowser()) {
    return localStorage.getItem(key);
  }
  return null; // Return null for SSR
};

// Set an item in localStorage
export const setLocalStorage = (key: string, value: string): void => {
  if (isBrowser()) {
    localStorage.setItem(key, value);
  }
  // No-op for SSR
};

// Remove an item from localStorage
export const removeLocalStorage = (key: string): void => {
  if (isBrowser()) {
    localStorage.removeItem(key);
  }
  // No-op for SSR
};
