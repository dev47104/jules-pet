import React from 'react';

const EventList = ({ events }) => {
  return (
    <div>
      <h2>Events</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <strong>{event.title}</strong>: {event.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
