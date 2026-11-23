import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect } from "vitest";

/**
 * Fill form fields helper
 */
export const fillFormField = async (labelOrPlaceholder: string, value: string) => {
  const user = userEvent.setup();
  const input = screen.getByPlaceholderText(labelOrPlaceholder);
  await user.clear(input);
  await user.type(input, value);
  return input;
};

/**
 * Fill multiple form fields
 */
export const fillForm = async (fields: Record<string, string>) => {
  const user = userEvent.setup();
  const inputs: Record<string, HTMLElement> = {};

  for (const [placeholder, value] of Object.entries(fields)) {
    const input = screen.getByPlaceholderText(placeholder);
    await user.clear(input);
    await user.type(input, value);
    inputs[placeholder] = input;
  }

  return inputs;
};

/**
 * Submit form by clicking button
 */
export const submitFormByButton = async (buttonText: string | RegExp) => {
  const user = userEvent.setup();
  const button = screen.getByRole("button", { name: buttonText });
  await user.click(button);
  return button;
};

/**
 * Click element helper
 */
export const clickElement = async (element: HTMLElement) => {
  const user = userEvent.setup();
  await user.click(element);
};

/**
 * Wait for element to appear
 */
export const waitForElement = async (
  text: string | RegExp,
  options?: { timeout?: number }
) => {
  return waitFor(
    () => {
      return screen.getByText(text);
    },
    { timeout: options?.timeout || 3000 }
  );
};

/**
 * Wait for element to disappear
 */
export const waitForElementToDisappear = async (
  text: string | RegExp,
  options?: { timeout?: number }
) => {
  return waitFor(
    () => {
      expect(screen.queryByText(text)).not.toBeInTheDocument();
    },
    { timeout: options?.timeout || 3000 }
  );
};

/**
 * Get form validation error
 */
export const getValidationError = async (fieldName?: string) => {
  if (fieldName) {
    return await screen.findByRole("alert", { name: fieldName });
  }
  return await screen.findAllByRole("alert");
};

/**
 * Check if button is disabled
 */
export const expectButtonDisabled = (buttonText: string | RegExp) => {
  const button = screen.getByRole("button", { name: buttonText });
  expect(button).toBeDisabled();
};

/**
 * Check if button is enabled
 */
export const expectButtonEnabled = (buttonText: string | RegExp) => {
  const button = screen.getByRole("button", { name: buttonText });
  expect(button).toBeEnabled();
};

/**
 * Check if input has error class or aria-invalid
 */
export const expectInputHasError = (placeholder: string) => {
  const input = screen.getByPlaceholderText(placeholder);
  expect(
    input.classList.contains("ant-input-status-error") ||
      input.getAttribute("aria-invalid") === "true"
  ).toBeTruthy();
};

/**
 * Check if loading state is active
 */
export const expectLoadingState = (buttonText: string | RegExp) => {
  const button = screen.getByRole("button", { name: buttonText });
  expect(button).toHaveClass("ant-btn-loading");
};

/**
 * Wait for API call to complete
 */
export const waitForApiCall = async (mockFn: any, timeout = 3000) => {
  await waitFor(() => expect(mockFn).toHaveBeenCalled(), { timeout });
};

/**
 * Simulate async delay
 */
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Check localStorage value
 */
export const expectLocalStorage = (key: string, value?: string) => {
  const storedValue = localStorage.getItem(key);
  if (value !== undefined) {
    expect(storedValue).toBe(value);
  } else {
    expect(storedValue).not.toBeNull();
  }
};

/**
 * Check localStorage does not contain key
 */
export const expectLocalStorageNotContain = (key: string) => {
  expect(localStorage.getItem(key)).toBeNull();
};

/**
 * Fill OTP input fields (assuming 4 separate inputs)
 */
export const fillOtpInput = async (otp: string) => {
  const user = userEvent.setup();
  const digits = otp.split("");

  // Find the OTP input container or individual inputs
  const otpInputs = screen.getAllByRole("textbox");

  for (let i = 0; i < digits.length && i < otpInputs.length; i++) {
    await user.type(otpInputs[i], digits[i]);
  }
};

/**
 * Toggle checkbox
 */
export const toggleCheckbox = async (labelText: string | RegExp) => {
  const user = userEvent.setup();
  const checkbox = screen.getByRole("checkbox", { name: labelText });
  await user.click(checkbox);
  return checkbox;
};

/**
 * Verify navigation occurred
 */
export const expectNavigation = (mockNavigate: any, expectedPath: string | object) => {
  expect(mockNavigate).toHaveBeenCalledWith(
    expect.objectContaining(
      typeof expectedPath === "string" ? { pathname: expectedPath } : expectedPath
    )
  );
};
