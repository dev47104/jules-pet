import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

// Mock the fetch function
global.fetch = jest.fn();

const mockEvents = {
  items: [
    { id: 1, title: 'Community Picnic', description: 'Annual community gathering at the park.' },
    { id: 2, title: 'City Council Meeting', description: 'Monthly city council meeting.' },
  ],
};

const mockNewEvent = { id: 3, title: 'New Test Event', description: 'This is a test event.' };

beforeEach(() => {
  fetch.mockClear();
});

test('renders the app title and fetches events', async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockEvents,
  });

  render(<App />);

  // Check for the title
  expect(screen.getByText(/CivicPlus Event App/i)).toBeInTheDocument();

  // Wait for the events to be loaded and displayed, targeting the <strong> elements
  await waitFor(() => {
    expect(screen.getByText(/Community Picnic/i, { selector: 'strong' })).toBeInTheDocument();
    expect(screen.getByText(/City Council Meeting/i, { selector: 'strong' })).toBeInTheDocument();
  });
});

test('adds a new event', async () => {
  // Mock the initial fetch
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockEvents,
  });

  render(<App />);

  // Wait for the initial events to load
  await waitFor(() => {
    expect(screen.getByText(/Community Picnic/i, { selector: 'strong' })).toBeInTheDocument();
  });

  // Mock the add event fetch
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockNewEvent,
  });

  // Mock the refetch after adding
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ items: [...mockEvents.items, mockNewEvent] }),
  });

  // Fill out and submit the form
  fireEvent.change(screen.getByLabelText(/Title:/i), { target: { value: 'New Test Event' } });
  fireEvent.change(screen.getByLabelText(/Description:/i), { target: { value: 'This is a test event.' } });
  fireEvent.click(screen.getByRole('button', { name: /Add Event/i }));

  // Wait for the new event to be displayed
  await waitFor(() => {
    expect(screen.getByText(/New Test Event/i, { selector: 'strong' })).toBeInTheDocument();
  });
});
