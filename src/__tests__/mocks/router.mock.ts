import { vi } from "vitest";

/**
 * Mock react-router hooks
 */
export const mockNavigate = vi.fn();
export const mockUseLocation = vi.fn();
export const mockUseParams = vi.fn();
export const mockUseSearchParams = vi.fn();

/**
 * Setup router mocks
 */
export const setupRouterMocks = () => {
  return {
    navigate: mockNavigate,
    useLocation: mockUseLocation,
    useParams: mockUseParams,
    useSearchParams: mockUseSearchParams,
  };
};

/**
 * Reset all router mocks
 */
export const resetRouterMocks = () => {
  mockNavigate.mockReset();
  mockUseLocation.mockReset();
  mockUseParams.mockReset();
  mockUseSearchParams.mockReset();
};

/**
 * Mock useNavigate return value
 */
export const mockUseNavigateReturnValue = () => {
  vi.mock("react-router", async () => {
    const actual = await vi.importActual("react-router");
    return {
      ...actual,
      useNavigate: () => mockNavigate,
    };
  });
};

/**
 * Mock location with search params
 */
export const mockLocationWithSearch = (search: string) => {
  mockUseLocation.mockReturnValue({
    pathname: "/signin",
    search,
    hash: "",
    state: null,
    key: "default",
  });
};
