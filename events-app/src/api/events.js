// Real API service
export const getEvents = async () => {
  const response = await fetch('/api/Events');
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  return response.json();
};

export const addEvent = async (event) => {
  const response = await fetch('/api/Events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });
  if (!response.ok) {
    throw new Error('Failed to add event');
  }
  return response.json();
};
