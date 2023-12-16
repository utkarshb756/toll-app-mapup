// src/components/ParentComponent.js
import React, { useState } from 'react';
import UserInputForm from './UserInputForm';
import RouteVisualization from './RouteVisualization.js';

function ParentComponent() {
  const [coordinates, setCoordinates] = useState(null);

  const handleFormSubmit = (formData) => {
    setCoordinates(formData);
    console.log('Form submitted with data:', formData);
  };

  return (
    <div>
      <UserInputForm onFormSubmit={handleFormSubmit} />
      {coordinates && <RouteVisualization coordinates={coordinates} />}
    </div>
  );
}

export default ParentComponent;
