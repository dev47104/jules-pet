import React, { useState, useEffect } from 'react';
import EventList from './components/EventList';
import AddEventForm from './components/AddEventForm';
import { getEvents, addEvent } from './api/events';

function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await getEvents();
      setEvents(response.items);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
    const intervalId = setInterval(fetchEvents, 30000); // 30 seconds

    return () => clearInterval(intervalId);
  }, []);

  const handleAddEvent = async (newEvent) => {
    try {
      await addEvent(newEvent);
      fetchEvents();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>CivicPlus Event App</h1>
      <AddEventForm onAddEvent={handleAddEvent} />
      {loading && <p>Loading events...</p>}
      {error && <p>Error: {error}</p>}
      <EventList events={events} />
    </div>
  );
}

export default App;
