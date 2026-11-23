// src/__tests__/setup.ts
import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import { expect, afterEach, beforeAll, vi } from "vitest";

// Add Jest DOM matchers
expect.extend(matchers);

// Cleanup DOM after each test
afterEach(() => cleanup());

// One-time browser mocks for jsdom environment
beforeAll(() => {
  // Ant Design matchMedia mock
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  // Optional ResizeObserver for charts or MUI
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
});
