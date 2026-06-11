---
name: generate-react-tests
description: >
  Guidelines and best practices for writing React component tests using Vitest,
  React Testing Library (RTL), jsdom, and jest-dom. Use this skill when asked
  to write, generate, or debug tests.
---

# Writing React Tests with Vitest & React Testing Library

This skill provides guidelines, best practices, and templates for generating high-quality unit and integration tests for React and Next.js components.

## Core Stack & Setup

Our testing stack consists of:
- **Vitest**: Next-generation testing framework.
- **React Testing Library (RTL)**: Simple and complete React DOM testing utilities.
- **jsdom**: Browser environment simulation.
- **jest-dom**: Custom jest matchers for asserting on DOM state (e.g. `.toBeInTheDocument()`).

### Invariant Config Files

Ensure the following configuration is present in the workspace:

#### `vitest.config.ts`
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    exclude: ['node_modules', '.next'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
```

#### `vitest.setup.ts`
```typescript
import '@testing-library/jest-dom';
```

---

## Best Practices

### 1. Test Behavior, Not Implementation
- Do not test component state, private methods, or internal lifecycle details.
- Test what the user sees and interacts with (e.g., "does clicking X render Y?").

### 2. Querying Elements (Order of Preference)
Always query using the `screen` object. Select queries in this priority order:
1. **`screen.getByRole(role, { name: /text/i })`**: The gold standard. Ensures your UI is accessible.
2. **`screen.getByLabelText(/text/i)`**: Great for form fields.
3. **`screen.getByPlaceholderText(/text/i)`**: For inputs without labels.
4. **`screen.getByText(/text/i)`**: For non-interactive elements (headings, divs, paragraphs).
5. **`screen.getByTestId('id')`**: Use only when no other query works.
*Note: Prefer case-insensitive regex matching (e.g., `/submit/i`) over exact strings to make tests resilient to styling changes.*

### 3. User Interactions
Always use `@testing-library/user-event` rather than `fireEvent`. `user-event` simulates full user interactions (clicks, keyboard input, hover) and fires all associated browser events.
```typescript
import userEvent from '@testing-library/user-event';

test('button click works', async () => {
  const user = userEvent.setup();
  render(<MyComponent />);
  
  const button = screen.getByRole('button', { name: /click me/i });
  await user.click(button);
  
  expect(screen.getByText(/clicked/i)).toBeInTheDocument();
});
```

### 4. Async Testing
- **For elements that appear after an async action**: Use `await screen.findBy...` queries (they poll the DOM and retry up to a timeout).
- **For complex assertions**: Use `await waitFor(() => { ... })`.
- Never use arbitrary `sleep` or `setTimeout` delays in tests.

---

## Common Mocking Scenarios

### Next.js Router Mock
Mock the Next.js router (`next/router` or `next/navigation` depending on the router version used in the project):
```typescript
import { vi } from 'vitest';

vi.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: {},
      asPath: '',
      push: vi.fn(),
      replace: vi.fn(),
      reload: vi.fn(),
      back: vi.fn(),
      prefetch: vi.fn().mockResolvedValue(undefined),
      beforePopState: vi.fn(),
      events: {
        on: vi.fn(),
        off: vi.fn(),
        emit: vi.fn(),
      },
      isFallback: false,
    };
  },
}));
```

### Icons & Third-Party UI Libs
If a library (e.g., `react-icons`) renders heavy SVG structures that pollute the test snapshots or output, you can mock them to render simple placeholder elements:
```typescript
vi.mock('react-icons/fa', () => ({
  FaGithub: () => <div data-testid="github-icon" />,
  FaLinkedin: () => <div data-testid="linkedin-icon" />,
}));
```

---

## Step-by-Step Test Generation Workflow

1. **Understand Component API**: Examine the target file, its TypeScript props, internal state, hooks, and sub-components.
2. **Setup Mocks**: Identify any imports (e.g. Next.js router, asset imports, network calls) that need mocking.
3. **Draft Test Cases**:
   - **Render Test**: Verifies the component renders without crashing.
   - **Props Test**: Verifies that standard props are applied correctly (e.g. custom text, dynamic styling).
   - **Interaction Test**: Simulates user events (clicks, input typing) and checks the callback behavior or state updates.
   - **Async/Edge Case Test**: Handles errors, loading states, or empty data arrays.
4. **Execution & Polish**:
   - Save the test file in the correct location (usually adjacent to the component or in a `__tests__` folder).
   - Run the vitest command to verify the test passes.
