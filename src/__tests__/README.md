# Test Utilities Documentation

This directory contains comprehensive test utilities, mocks, and helpers for testing the Admin Panel application.

## Directory Structure

```
__tests__/
├── fixtures/          # Test data and fixtures
│   └── auth.fixtures.ts
├── helpers/           # Test helper functions
│   └── test-helpers.ts
├── mocks/             # Mock implementations
│   ├── api.mock.ts
│   ├── localStorage.mock.ts
│   ├── router.mock.ts
│   └── toast.mock.ts
├── utils/             # Test utilities
│   └── test-utils.tsx
├── setup.ts           # Global test setup
└── README.md          # This file
```

## Usage Guide

### 1. Test Utilities (`test-utils.tsx`)

Custom render functions with providers:

```typescript
import { renderWithProviders } from '@/__tests__/utils/test-utils';

test('renders component', () => {
  renderWithProviders(<MyComponent />, {
    initialState: { auth: {} },
    route: '/signin'
  });
});
```

### 2. API Mocks (`mocks/api.mock.ts`)

Mock API calls and responses:

```typescript
import { mockUseSignInFirstPageMutation } from "@/__tests__/mocks/api.mock";

vi.mock("@infra/states/redux/Apis/auth/signInApis", () => ({
  useSignInFirstPageMutation: () => mockUseSignInFirstPageMutation(),
}));
```

### 3. LocalStorage Mocks (`mocks/localStorage.mock.ts`)

Mock localStorage operations:

```typescript
import {
  setupLocalStorageMock,
  mockLocalStorageWithData,
} from "@/__tests__/mocks/localStorage.mock";

beforeEach(() => {
  setupLocalStorageMock();
});
```

### 4. Router Mocks (`mocks/router.mock.ts`)

Mock navigation and routing:

```typescript
import { mockNavigate, setupRouterMocks } from "@/__tests__/mocks/router.mock";

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});
```

### 5. Test Helpers (`helpers/test-helpers.ts`)

Common test operations:

```typescript
import {
  fillForm,
  submitFormByButton,
  expectNavigation,
} from "@/__tests__/helpers/test-helpers";

await fillForm({
  "کد ملی خود را وارد نمایید.": "1234567890",
  "رمز عبور خود را وارد نمایید.": "Test@123",
});

await submitFormByButton(/ورود به پنل/i);
expectNavigation(mockNavigate, "/signin/verify");
```

### 6. Fixtures (`fixtures/auth.fixtures.ts`)

Reusable test data:

```typescript
import { validCredentials, mockPhoneNumbers } from "@/__tests__/fixtures/auth.fixtures";

await fillForm({
  "کد ملی خود را وارد نمایید.": validCredentials.userName,
  "رمز عبور خود را وارد نمایید.": validCredentials.password,
});
```

## Running Tests

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run browser tests
npm run test:browser

# Run in watch mode
npm run test:watch

# Generate coverage report
npm run coverage
```

## Best Practices

1. **Use Custom Render**: Always use `renderWithProviders` for components that need Router/Redux context
2. **Mock External Dependencies**: Mock all API calls, navigation, and side effects
3. **Use Fixtures**: Reuse test data from fixtures for consistency
4. **Test User Interactions**: Use `userEvent` instead of `fireEvent` for more realistic interactions
5. **Wait for Async**: Always use `waitFor` or `findBy*` queries for async operations
6. **Clean Up**: Tests automatically clean up after each run
7. **Descriptive Names**: Use clear, descriptive test names
8. **Arrange-Act-Assert**: Structure tests with clear setup, action, and assertion phases

## Example Test Structure

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '@/__tests__/utils/test-utils';
import { mockNavigate } from '@/__tests__/mocks/router.mock';
import { fillForm, submitFormByButton } from '@/__tests__/helpers/test-helpers';
import { validCredentials } from '@/__tests__/fixtures/auth.fixtures';

describe('SignInFirstPage', () => {
  beforeEach(() => {
    // Setup mocks
  });

  it('should submit form with valid credentials', async () => {
    // Arrange
    renderWithProviders(<SignInFirstPage />);

    // Act
    await fillForm({
      'کد ملی خود را وارد نمایید.': validCredentials.userName,
      'رمز عبور خود را وارد نمایید.': validCredentials.password,
    });
    await submitFormByButton(/ورود به پنل/i);

    // Assert
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalled();
    });
  });
});
```

## Common Patterns

### Testing Form Validation

```typescript
it('should show validation errors for empty fields', async () => {
  renderWithProviders(<MyForm />);
  await submitFormByButton(/ثبت/i);

  await waitFor(() => {
    expect(screen.getAllByRole('alert')).toHaveLength(2);
  });
});
```

### Testing API Success

```typescript
it("should handle successful API response", async () => {
  const mockMutation = mockUseSignInFirstPageMutation();

  // ... render and interact

  await waitFor(() => {
    expect(mockMutation[0]).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith(expectedRoute);
  });
});
```

### Testing API Errors

```typescript
it("should handle API error", async () => {
  const mockMutation = mockUseSignInFirstPageMutation(undefined, mockApiError);

  // ... render and interact

  await waitFor(() => {
    expect(screen.getByText(/خطا/i)).toBeInTheDocument();
  });
});
```

## Troubleshooting

- **Tests timeout**: Increase timeout in `waitFor` options
- **Elements not found**: Use `screen.debug()` to inspect DOM
- **Async issues**: Ensure you're using `await` and `waitFor`
- **Mock not working**: Check mock is setup before component render
- **State not updating**: Verify Redux store mock includes necessary reducers
