import { vi, expect } from "vitest";

/**
 * Mock react-toastify
 */
export const mockToast = {
  success: vi.fn(),
  error: vi.fn(),
  warning: vi.fn(),
  info: vi.fn(),
  dismiss: vi.fn(),
};

/**
 * Setup toast mock
 */
export const setupToastMock = () => {
  vi.mock("react-toastify", () => ({
    toast: mockToast,
    ToastContainer: vi.fn(() => null),
  }));

  return mockToast;
};

/**
 * Reset toast mocks
 */
export const resetToastMocks = () => {
  Object.values(mockToast).forEach((fn) => fn.mockReset());
};

/**
 * Verify toast was called with message
 */
export const expectToastCalled = (type: keyof typeof mockToast, message?: string) => {
  const mockFn = mockToast[type] as ReturnType<typeof vi.fn>;
  expect(mockFn).toHaveBeenCalled();
  if (message) {
    expect(mockFn).toHaveBeenCalledWith(message, expect.objectContaining({}));
  }
};
