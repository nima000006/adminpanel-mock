# Part 1: Test Setup & Utilities - Quick Reference

## 📁 Files Created

### Core Utilities

- ✅ `utils/test-utils.tsx` - Custom render functions with Redux & Router providers
- ✅ `helpers/test-helpers.ts` - Common test operations and assertions
- ✅ `fixtures/auth.fixtures.ts` - Reusable test data for auth flows

### Mocks

- ✅ `mocks/api.mock.ts` - API response mocks and mutation factories
- ✅ `mocks/localStorage.mock.ts` - LocalStorage implementation mock
- ✅ `mocks/router.mock.ts` - React Router navigation mocks
- ✅ `mocks/toast.mock.ts` - React Toastify mocks

### Setup

- ✅ `setup/auth-test-setup.ts` - Global auth test configuration
- ✅ `README.md` - Comprehensive documentation

---

## 🚀 Quick Start Guide

### Basic Test Structure

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/__tests__/utils/test-utils';
import { fillForm, submitFormByButton } from '@/__tests__/helpers/test-helpers';
import { validCredentials } from '@/__tests__/fixtures/auth.fixtures';
import { mockUseSignInFirstPageMutation } from '@/__tests__/mocks/api.mock';
import { mockNavigate } from '@/__tests__/mocks/router.mock';
import { setupAuthTests, cleanupAuthTests } from '@/__tests__/setup/auth-test-setup';

// Mock dependencies
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('@infra/states/redux/Apis/auth/signInApis', () => ({
  useSignInFirstPageMutation: () => mockUseSignInFirstPageMutation(),
}));

describe('MyComponent', () => {
  beforeEach(() => {
    setupAuthTests();
  });

  afterEach(() => {
    cleanupAuthTests();
  });

  it('should do something', async () => {
    // Arrange
    renderWithProviders(<MyComponent />);

    // Act
    await fillForm({
      'Enter username': validCredentials.userName,
      'Enter password': validCredentials.password,
    });
    await submitFormByButton(/Submit/i);

    // Assert
    expect(mockNavigate).toHaveBeenCalled();
  });
});
```

---

## 📦 Key Functions

### Rendering

```typescript
// With Redux and Router
renderWithProviders(<Component />, {
  initialState: {},
  route: '/signin',
});

// Simple router only
renderWithRouter(<Component />, { route: '/signin' });
```

### User Interactions

```typescript
// Fill single field
await fillFormField("Enter username", "value");

// Fill multiple fields
await fillForm({
  "Enter username": "user",
  "Enter password": "pass",
});

// Submit form
await submitFormByButton(/Submit/i);

// Toggle checkbox
await toggleCheckbox(/Show password/i);

// Fill OTP
await fillOtpInput("1234");
```

### Assertions

```typescript
// Button state
expectButtonDisabled(/Submit/i);
expectButtonEnabled(/Submit/i);
expectLoadingState(/Submit/i);

// Navigation
expectNavigation(mockNavigate, "/next-page");
expectNavigation(mockNavigate, {
  pathname: "/next",
  search: "?key=value",
});

// LocalStorage
expectLocalStorage("key", "value");
expectLocalStorageNotContain("key");

// Form validation
await getValidationError(); // All errors
await getValidationError("username"); // Specific field

// Input error state
expectInputHasError("Enter username");
```

### Waiting & Async

```typescript
// Wait for element
await waitForElement(/Success/i);
await waitForElementToDisappear(/Loading/i);

// Wait for API
await waitForApiCall(mockFn);

// Custom delay
await delay(1000);
```

---

## 🎯 Mock Factories

### API Mocks

```typescript
// Success response
const [mutationFn, result] = mockUseSignInFirstPageMutation();

// Custom response
const [mutationFn, result] = mockUseSignInFirstPageMutation({
  token: "custom-token",
  mobileNumber: "09123456789",
});

// Error response
const [mutationFn, result] = mockUseSignInFirstPageMutation(undefined, {
  status: 400,
  data: { message: "Error" },
});

// Loading state
const [mutationFn, result] = createLoadingMock();
```

### Router Mocks

```typescript
// Mock location with search params
mockLocationWithSearch("?reason=logout");

// Reset all router mocks
resetRouterMocks();
```

### LocalStorage Mocks

```typescript
// Setup clean mock
setupLocalStorageMock();

// Setup with data
mockLocalStorageWithData({
  token: "abc123",
  user: JSON.stringify({ id: 1 }),
});

// Spy on methods
const spies = spyOnLocalStorage();
expect(spies.setItem).toHaveBeenCalledWith("key", "value");
```

---

## 📊 Test Data (Fixtures)

```typescript
// Valid credentials
validCredentials; // { userName: '1234567890', password: 'Test@123456' }

// Phone numbers
mockPhoneNumbers.valid; // '09123456789'
mockPhoneNumbers.validFormatted; // '0912 345 6789'

// Tokens
mockTokens.tempToken;
mockTokens.accessToken;

// User data
mockUserData.withEmail;
mockUserData.withoutEmail;

// Test cases
signInFormTestCases; // Array of validation test cases
otpTestCases; // Array of OTP validation test cases

// Routes
navigationScenarios.signIn.firstPage.route; // '/signin'
navigationScenarios.signIn.secondPage.nextPageWithEmail; // '/signin/final'

// Storage keys
storageKeys.tempInfo; // 'tempInfo'
storageKeys.mainToken; // 'mainToken'

// Query params
queryParams.logout; // '?reason=logout'
queryParams.mobileNumber("09123456789"); // '?mobileNumber=09123456789'
```

---

## ✅ Best Practices

1. **Always use `renderWithProviders`** for components needing Redux/Router
2. **Mock all external dependencies** before rendering
3. **Use fixtures** for consistent test data
4. **Wait for async operations** with `waitFor` or `findBy*` queries
5. **Clean up** is automatic via `afterEach(cleanup)`
6. **Use semantic queries**: `getByRole`, `getByLabelText`, etc.
7. **Test user behavior**, not implementation details
8. **Group related tests** in `describe` blocks

---

## 🔧 Common Patterns

### Testing Form Submission

```typescript
it('should submit form successfully', async () => {
  const [mutationFn] = mockUseSignInFirstPageMutation();

  renderWithProviders(<SignInPage />);

  await fillForm({
    'Enter username': validCredentials.userName,
    'Enter password': validCredentials.password,
  });

  await submitFormByButton(/Login/i);

  await waitFor(() => {
    expect(mutationFn).toHaveBeenCalledWith({
      username: validCredentials.userName,
      password: validCredentials.password,
    });
  });
});
```

### Testing Error Handling

```typescript
it('should display error message on API failure', async () => {
  mockUseSignInFirstPageMutation(undefined, mockApiError);

  renderWithProviders(<SignInPage />);

  await fillForm({ /* ... */ });
  await submitFormByButton(/Login/i);

  await waitForElement(/Invalid credentials/i);
});
```

### Testing Navigation

```typescript
it('should navigate to next page on success', async () => {
  renderWithProviders(<SignInPage />);

  await fillForm({ /* ... */ });
  await submitFormByButton(/Login/i);

  await waitFor(() => {
    expectNavigation(mockNavigate, {
      pathname: '/signin/verify',
      search: '?mobileNumber=09123456789',
    });
  });
});
```

### Testing LocalStorage

```typescript
it('should save data to localStorage', async () => {
  const localStorageSpy = spyOnLocalStorage();

  renderWithProviders(<SignInPage />);

  await fillForm({ /* ... */ });
  await submitFormByButton(/Login/i);

  await waitFor(() => {
    expect(localStorageSpy.setItem).toHaveBeenCalledWith(
      'tempUser',
      expect.any(String)
    );
  });
});
```

---

## 🎨 Next Steps

Ready for **Part 2**?

- Implement comprehensive SignInFirstPage tests
- Cover all user flows and edge cases
- Test accessibility and error states

Ready for **Part 3**?

- Implement comprehensive SignInSecondPage tests
- Test OTP validation and timer
- Cover resend functionality

---

## 📚 Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
