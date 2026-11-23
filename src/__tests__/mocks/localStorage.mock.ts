import { vi } from "vitest";

/**
 * Mock localStorage for testing
 */
class LocalStorageMock {
  private store: Record<string, string> = {};

  clear() {
    this.store = {};
  }

  getItem(key: string): string | null {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = String(value);
  }

  removeItem(key: string) {
    delete this.store[key];
  }

  get length() {
    return Object.keys(this.store).length;
  }

  key(index: number): string | null {
    const keys = Object.keys(this.store);
    return keys[index] || null;
  }
}

/**
 * Setup localStorage mock
 */
export const setupLocalStorageMock = () => {
  const localStorageMock = new LocalStorageMock();
  global.localStorage = localStorageMock as Storage;
  return localStorageMock;
};

/**
 * Spy on localStorage methods
 */
export const spyOnLocalStorage = () => {
  return {
    setItem: vi.spyOn(Storage.prototype, "setItem"),
    getItem: vi.spyOn(Storage.prototype, "getItem"),
    removeItem: vi.spyOn(Storage.prototype, "removeItem"),
    clear: vi.spyOn(Storage.prototype, "clear"),
  };
};

/**
 * Mock localStorage with initial data
 */
export const mockLocalStorageWithData = (data: Record<string, string>) => {
  const mock = setupLocalStorageMock();
  Object.entries(data).forEach(([key, value]) => {
    mock.setItem(key, value);
  });
  return mock;
};

/**
 * Clear localStorage mock
 */
export const clearLocalStorageMock = () => {
  global.localStorage.clear();
};
