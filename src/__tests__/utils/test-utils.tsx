import { ReactElement, ReactNode } from "react";

import { configureStore } from "@reduxjs/toolkit";
import { render, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter, MemoryRouter } from "react-router";
import { vi } from "vitest";

// Mock the Redux store
export const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      // Add your reducers here - for now using a simple reducer
      auth: (state = initialState) => state,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  initialState?: any;
  store?: any;
  route?: string;
  initialEntries?: string[];
}

/**
 * Custom render function that wraps components with necessary providers
 * @param ui - Component to render
 * @param options - Custom render options
 */
export const renderWithProviders = (
  ui: ReactElement,
  {
    initialState = {},
    store = createMockStore(initialState),
    route = "/",
    initialEntries = [route],
    ...renderOptions
  }: CustomRenderOptions = {}
) => {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={initialEntries} initialIndex={0}>
          {children}
        </MemoryRouter>
      </Provider>
    );
  };

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};

/**
 * Render with BrowserRouter for simple routing tests
 */
export const renderWithRouter = (ui: ReactElement, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return render(ui, { wrapper: BrowserRouter });
};

/**
 * Wait for async operations with timeout
 */
export const waitForAsync = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Mock form submission
 */
export const mockFormSubmit = (form: HTMLFormElement) => {
  const submitEvent = new Event("submit", { bubbles: true, cancelable: true });
  form.dispatchEvent(submitEvent);
};

/**
 * Mock window.matchMedia for Ant Design components
 */
export const mockMatchMedia = () => {
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
};

// Re-export everything from React Testing Library
// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
