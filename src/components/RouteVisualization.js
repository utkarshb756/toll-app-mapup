// src/components/RouteVisualization.js
import React, { useEffect, useState } from 'react';
import { Map, GoogleApiWrapper, Polyline, Marker } from 'google-maps-react';

const mapContainerStyles = {
  position: 'relative',
  width: '100%',
  height: '600px', // Increased height
  marginTop: '20px', // Added margin from the top
  overflow: 'hidden',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const mapStyles = {
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  borderRadius: '8px',
};

function RouteVisualization({ coordinates, google }) {
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  useEffect(() => {
    const fetchRouteInformation = async () => {
      try {
        if (coordinates.origin && coordinates.destination) {
          const originCoords = coordinates.origin.split(',').map((str) => parseFloat(str.trim()));
          const destinationCoords = coordinates.destination.split(',').map((str) => parseFloat(str.trim()));

          const route = [originCoords, destinationCoords];
          setRouteCoordinates(route);
        }
      } catch (error) {
        console.error('Error fetching route information', error);
      }
    };

    // Fetch route information when coordinates change
    fetchRouteInformation();
  }, [coordinates]);

  return (
    <div className="map-container" style={mapContainerStyles}>
      <Map
        google={google}
        zoom={5}
        style={mapStyles}
        initialCenter={{ lat: 20.5937, lng: 78.9629 }}
      >
        {/* Render Polyline using Google Maps API */}
        {routeCoordinates.length > 0 && (
          <Polyline
            path={routeCoordinates}
            strokeColor="#0000FF"
            strokeOpacity={0.8}
            strokeWeight={2}
          />
        )}
        {/* Render Markers along the route */}
        {routeCoordinates.map((coords, index) => (
          <Marker
            key={index}
            position={{ lat: coords[0], lng: coords[1] }}
            label={index === 0 ? 'Origin' : 'Destination'}
          />
        ))}
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAqALrZfZHkiqDsMHRag7HDnN06-NVGRNw',
})(RouteVisualization);
