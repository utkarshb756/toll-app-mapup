// src/App.js
import React from 'react';

import ParentComponent from './components/ParentComponent';
import './App.css';

function App() {
  // eslint-disable-next-line no-unused-vars
  const [waypoints, setWaypoints] = React.useState([]);

  // eslint-disable-next-line no-unused-vars
  const handleFormSubmit = (formData) => {
    setWaypoints(formData.waypoints);
  };

  return (
    <div className="App">
  
      <ParentComponent waypoints={waypoints} />
    </div>
  );
}

export default App;
