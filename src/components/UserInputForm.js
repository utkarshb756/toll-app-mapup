// src/components/UserInputForm.js
import React, { useState, useEffect } from 'react';
import { geocode } from 'opencage-api-client';
import './UserInputForm.css'; // Import the CSS file for styling

function UserInputForm({ onFormSubmit }) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [distance, setDistance] = useState('');
  const [originCity, setOriginCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (origin) {
      getCityName(origin, setOriginCity);
    }
    if (destination) {
      getCityName(destination, setDestinationCity);
    }
  }, [origin, destination]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!origin || !destination) {
      alert('Both origin and destination are required!');
      return;
    }

    console.log('Form Submitted!');
    console.log('Origin:', origin);
    console.log('Destination:', destination);

    const calculatedDistance = calculateDistance(origin, destination);
    console.log('Calculated Distance:', calculatedDistance);

    setDistance(calculatedDistance);
    setFormSubmitted(true);

    onFormSubmit({ origin, destination, distance: calculatedDistance });
  };

  const calculateDistance = (coord1, coord2) => {
    const [lat1, lon1] = coord1.split(',').map((str) => parseFloat(str.trim()));
    const [lat2, lon2] = coord2.split(',').map((str) => parseFloat(str.trim()));

    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance.toFixed(2);
  };

  const getCityName = async (coordinates, setCity) => {
    try {
      const { results } = await geocode({
        key: 'd82b9226fe264050b31fcc793bd0c1b8',
        q: coordinates,
      });

      if (results.length > 0) {
        const city = results[0].components.city || results[0].components.county || results[0].components.state;
        setCity(city);
      }
    } catch (error) {
      console.error('Error fetching city name:', error);
    }
  };

  console.log('Rendering UserInputForm component');

  return (
    <form onSubmit={handleSubmit} className="user-input-form">
      {!formSubmitted && <h2 className="form-heading">Map will be displayed after submitting all details</h2>}
      <label>
        Origin coordinates:
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          placeholder="Enter origin coordinates"
          required
        />
        {originCity && <div>City: {originCity}</div>}
      </label>
      <br />
      <label>
        Destination coordinates:
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Enter destination coordinates"
          required
        />
        {destinationCity && <div>City: {destinationCity}</div>}
      </label>
      <br />
      <button type="submit" className="submit-button">
        Submit
      </button>

      {distance !== '' && (
        <p className="distance-info">
          Calculated Distance: {distance} km
          <br />
          Total Toll Cost: ₹{(2.19 * parseFloat(distance)).toFixed(2)}
        </p>
      )}
    </form>
  );
}

export default UserInputForm;
