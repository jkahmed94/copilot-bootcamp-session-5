import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';

// Create a test query client
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

// Mock fetch for tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  })
);

test('renders TODO App heading', async () => {
  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  const headingElement = await screen.findByText(/TODO App/i);
  expect(headingElement).toBeInTheDocument();
});

test('should display empty state message when no todos', async () => {
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    })
  );

  const testQueryClient = createTestQueryClient();
  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  await waitFor(() => {
    expect(screen.getByText(/no todos yet/i)).toBeInTheDocument();
  });
});

test('should calculate and display correct stats', async () => {
  const mockTodos = [
    { id: 1, title: 'Todo 1', completed: false },
    { id: 2, title: 'Todo 2', completed: true },
    { id: 3, title: 'Todo 3', completed: false },
  ];

  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockTodos),
    })
  );

  const testQueryClient = createTestQueryClient();
  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  await waitFor(() => {
    expect(screen.getByText(/2 items left/i)).toBeInTheDocument();
  });
  expect(screen.getByText(/1 completed/i)).toBeInTheDocument();
});

test('should call delete API when delete button clicked', async () => {
  const mockTodos = [
    { id: 1, title: 'Test Todo', completed: false },
  ];

  global.fetch
    .mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockTodos),
      })
    )
    .mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    )
    .mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    );

  const testQueryClient = createTestQueryClient();
  const user = userEvent.setup();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  await waitFor(() => {
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  const deleteButton = screen.getByRole('button', { name: /delete/i });
  await user.click(deleteButton);

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/todos/1'),
      expect.objectContaining({ method: 'DELETE' })
    );
  });
});

test('should display error message when API fails', async () => {
  global.fetch.mockImplementationOnce(() =>
    Promise.reject(new Error('API Error'))
  );

  const testQueryClient = createTestQueryClient();
  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  await waitFor(() => {
    expect(screen.getByText(/error loading todos/i)).toBeInTheDocument();
  });
});

afterEach(() => {
  jest.clearAllMocks();
});
