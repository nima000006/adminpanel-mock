import { vi } from "vitest";

/**
 * Global test setup for SignIn pages
 * Import this in your test files to get all necessary mocks configured
 */

// Mock react-toastify
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
    info: vi.fn(),
    dismiss: vi.fn(),
  },
  ToastContainer: () => null,
}));

// Mock react-icons
vi.mock("react-icons/pi", () => ({
  PiFingerprint: () => null,
  PiPassword: () => null,
  PiSignInLight: () => null,
  PiUserPlus: () => null,
  PiUserThin: () => null,
  PiArrowRight: () => null,
}));

/**
 * Setup function to be called in beforeEach
 */
export const setupAuthTests = () => {
  // Clear all mocks before each test
  vi.clearAllMocks();

  // Setup localStorage
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  };

  global.localStorage = localStorageMock as any;

  return {
    localStorage: localStorageMock,
  };
};

/**
 * Cleanup function to be called in afterEach
 */
export const cleanupAuthTests = () => {
  vi.clearAllMocks();
  localStorage.clear();
};
