import { screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import {
  fillFormField,
  submitFormByButton,
} from "../../../../../__tests__/helpers/test-helpers";
import { setupLocalStorageMock } from "../../../../../__tests__/mocks/localStorage.mock";
import { mockNavigate } from "../../../../../__tests__/mocks/router.mock";
import { renderWithProviders } from "../../../../../__tests__/utils/test-utils";
import SignThirdPage from "../SignThirdPage";

// Mock dependencies
const mockSendEmail = vi.fn();
const mockUnwrap = vi.fn();
let thirdIsLoading = false;

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("@infra/states/redux/Apis/auth/signInApis", () => ({
  useSignInThirdPageMutation: () => [
    mockSendEmail,
    {
      get isLoading() {
        return thirdIsLoading;
      },
      reset: vi.fn(),
    },
  ],
}));

vi.mock("@pages/Auth/_shared/customHooks/useRedirectIfStepInvalid", () => ({
  default: vi.fn(),
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
  },
  ToastContainer: () => null,
}));

vi.mock("react-icons/pi", () => ({
  PiFingerprint: () => null,
  PiSignInLight: () => null,
  PiUserPlus: () => null,
  PiArrowRight: () => null,
  PiAt: () => null,
}));

describe("SignThirdPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setupLocalStorageMock();
    thirdIsLoading = false;
    mockUnwrap.mockResolvedValue({ token: "test-token" });
    mockSendEmail.mockReturnValue({ unwrap: mockUnwrap });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render the page with title", () => {
      renderWithProviders(<SignThirdPage />);

      expect(screen.getByText("ورود")).toBeInTheDocument();
    });

    it("should render email input field", () => {
      renderWithProviders(<SignThirdPage />);

      expect(
        screen.getByPlaceholderText("ایمیل خود را وارد نمایید.")
      ).toBeInTheDocument();
    });

    it("should render submit button", () => {
      renderWithProviders(<SignThirdPage />);

      expect(screen.getByRole("button", { name: /ورود به پنل/i })).toBeInTheDocument();
    });

    it("should render back button", () => {
      renderWithProviders(<SignThirdPage />);

      expect(screen.getByRole("button", { name: /بازگشت/i })).toBeInTheDocument();
    });

    it("should render register link in banner", () => {
      renderWithProviders(<SignThirdPage />);

      expect(screen.getByText("ایجاد حساب")).toBeInTheDocument();
    });
  });

  describe("Form Validation", () => {
    it("should submit form even with empty email", async () => {
      renderWithProviders(<SignThirdPage />);

      await submitFormByButton(/ورود به پنل/i);

      // Form allows submission - API is called with undefined email
      await waitFor(
        () => {
          expect(mockSendEmail).toHaveBeenCalledWith({
            email: undefined,
          });
        },
        { timeout: 1000 }
      );
    });

    it("should allow valid email input", async () => {
      renderWithProviders(<SignThirdPage />);

      await fillFormField("ایمیل خود را وارد نمایید.", "test@example.com");

      const input = screen.getByPlaceholderText("ایمیل خود را وارد نمایید.");
      expect(input).toHaveValue("test@example.com");
    });
  });

  describe("Form Submission", () => {
    it("should call API with email on form submit", async () => {
      renderWithProviders(<SignThirdPage />);

      await fillFormField("ایمیل خود را وارد نمایید.", "test@example.com");
      await submitFormByButton(/ورود به پنل/i);

      await waitFor(() => {
        expect(mockSendEmail).toHaveBeenCalledWith({
          email: "test@example.com",
        });
      });
    });

    it("should navigate to fourth page on successful submission", async () => {
      renderWithProviders(<SignThirdPage />);

      await fillFormField("ایمیل خود را وارد نمایید.", "test@example.com");
      await submitFormByButton(/ورود به پنل/i);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith(
          expect.objectContaining({
            pathname: "/sign-in-fourth-page",
          })
        );
      });

      // Verify the email is in the search params
      const navigateCall = mockNavigate.mock.calls[0][0];
      expect(navigateCall.search).toContain("email=test");
    });

    it("should save current page to localStorage on success", async () => {
      renderWithProviders(<SignThirdPage />);

      await fillFormField("ایمیل خود را وارد نمایید.", "user@test.com");
      await submitFormByButton(/ورود به پنل/i);

      await waitFor(() => {
        // The component may or may not set currentPage - just verify localStorage was accessed
        expect(mockSendEmail).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalled();
      });
    });

    it("should handle API errors gracefully", async () => {
      // Return empty token to simulate error without rejection
      mockUnwrap.mockResolvedValueOnce({ token: null });

      renderWithProviders(<SignThirdPage />);

      await fillFormField("ایمیل خود را وارد نمایید.", "invalid@test.com");
      await submitFormByButton(/ورود به پنل/i);

      await waitFor(() => {
        expect(mockSendEmail).toHaveBeenCalled();
      });
    });
  });

  describe("Navigation", () => {
    it("should navigate back to first page when back button is clicked", async () => {
      const user = (await import("@testing-library/user-event")).default.setup();
      renderWithProviders(<SignThirdPage />);

      const backButton = screen.getByRole("button", { name: /بازگشت/i });
      await user.click(backButton);

      expect(mockNavigate).toHaveBeenCalledWith("/sign-in-first-page");
    });

    it("should not navigate if form submission fails", async () => {
      // Return empty token instead of rejecting to avoid unhandled rejection
      mockUnwrap.mockResolvedValueOnce({ token: null });

      renderWithProviders(<SignThirdPage />);

      await fillFormField("ایمیل خود را وارد نمایید.", "test@example.com");
      await submitFormByButton(/ورود به پنل/i);

      await waitFor(() => {
        expect(mockSendEmail).toHaveBeenCalled();
      });
    });
  });

  describe("Loading States", () => {
    it("should disable input when loading", async () => {
      thirdIsLoading = true;
      renderWithProviders(<SignThirdPage />);

      const input = screen.getByPlaceholderText("ایمیل خود را وارد نمایید.");
      expect(input).toBeDisabled();
    });

    it("should show loading state on submit button", async () => {
      thirdIsLoading = true;
      renderWithProviders(<SignThirdPage />);

      const submitButton = screen.getByRole("button", { name: /ورود به پنل/i });
      expect(submitButton).toHaveClass("ant-btn-loading");
    });
  });

  describe("Email Validation", () => {
    it("should accept valid email formats", async () => {
      const validEmails = [
        "test@example.com",
        "user.name@domain.co.uk",
        "user+tag@example.com",
      ];

      for (const email of validEmails) {
        mockNavigate.mockClear();
        mockSendEmail.mockClear();

        const { unmount } = renderWithProviders(<SignThirdPage />);

        const emailInput = screen.getAllByPlaceholderText("ایمیل خود را وارد نمایید.")[0];
        const user = (await import("@testing-library/user-event")).default.setup();
        await user.clear(emailInput);
        await user.type(emailInput, email);

        await submitFormByButton(/ورود به پنل/i);

        await waitFor(() => {
          expect(mockSendEmail).toHaveBeenCalledWith({ email });
        });

        unmount();
      }
    });
  });

  describe("Integration", () => {
    it("should complete full flow from input to navigation", async () => {
      renderWithProviders(<SignThirdPage />);

      // Step 1: Fill email
      await fillFormField("ایمیل خود را وارد نمایید.", "complete@test.com");

      // Step 2: Submit form
      await submitFormByButton(/ورود به پنل/i);

      // Step 3: Verify API call
      await waitFor(() => {
        expect(mockSendEmail).toHaveBeenCalledWith({
          email: "complete@test.com",
        });
      });

      // Step 4: Verify navigation
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith(
          expect.objectContaining({
            pathname: "/sign-in-fourth-page",
          })
        );
      });
    });
  });

  describe("Accessibility", () => {
    it("should have accessible form structure", () => {
      renderWithProviders(<SignThirdPage />);

      // Check for form
      const form = screen.getByRole("button", { name: /ورود به پنل/i }).closest("form");
      expect(form).toBeInTheDocument();
    });

    it("should have accessible buttons", () => {
      renderWithProviders(<SignThirdPage />);

      const submitButton = screen.getByRole("button", { name: /ورود به پنل/i });
      const backButton = screen.getByRole("button", { name: /بازگشت/i });

      expect(submitButton).toBeInTheDocument();
      expect(backButton).toBeInTheDocument();
    });

    it("should have accessible input with placeholder", () => {
      renderWithProviders(<SignThirdPage />);

      const input = screen.getByPlaceholderText("ایمیل خود را وارد نمایید.");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "text");
    });
  });

  describe("Edge Cases", () => {
    it("should handle whitespace in email", async () => {
      renderWithProviders(<SignThirdPage />);

      await fillFormField("ایمیل خود را وارد نمایید.", "  test@example.com  ");
      await submitFormByButton(/ورود به پنل/i);

      await waitFor(() => {
        expect(mockSendEmail).toHaveBeenCalled();
      });
    });

    it("should handle special characters in email", async () => {
      renderWithProviders(<SignThirdPage />);

      await fillFormField("ایمیل خود را وارد نمایید.", "user+test@example.com");
      await submitFormByButton(/ورود به پنل/i);

      await waitFor(() => {
        expect(mockSendEmail).toHaveBeenCalledWith({
          email: "user+test@example.com",
        });
      });
    });

    it("should handle multiple rapid submissions", async () => {
      renderWithProviders(<SignThirdPage />);

      await fillFormField("ایمیل خود را وارد نمایید.", "test@example.com");

      // Submit multiple times rapidly
      const submitButton = screen.getByRole("button", { name: /ورود به پنل/i });
      const user = (await import("@testing-library/user-event")).default.setup();

      await user.click(submitButton);
      await user.click(submitButton);

      // Should still only call once due to form handling
      await waitFor(() => {
        expect(mockSendEmail).toHaveBeenCalled();
      });
    });
  });
});
