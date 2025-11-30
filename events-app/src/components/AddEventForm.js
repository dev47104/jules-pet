import React, { useState } from 'react';

const AddEventForm = ({ onAddEvent }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEvent({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Event</h2>
      <div>
        <label htmlFor="title-input">Title:</label>
        <input id="title-input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label htmlFor="description-input">Description:</label>
        <textarea id="description-input" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <button type="submit">Add Event</button>
    </form>
  );
};

export default AddEventForm;
