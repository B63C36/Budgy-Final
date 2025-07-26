import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import { useState, useEffect } from 'react';
import Sidebar from './tools/sidebar';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = { //center of the map is dublin
  lat: 53.350140,
  lng: -6.266155,
};

export default function MapPage() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {

    const savedLocations = JSON.parse(localStorage.getItem("locations")) || [];
    setLocations(savedLocations);
  }, []);

  return (
    <div className="page-container">
      <Sidebar />
      <div className="map-area">
        <LoadScript googleMapsApiKey="AIzaSyBhGV2IOTX-VyJPGSP9cJl5VOsWq91ifF0" // google maps api key
          libraries={['visualization']}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
          >
            {/* Map over the locations and create a marker for each one */}
            {locations.map((loc, index) => (
              <MarkerF
                key={index}
                position={{ lat: loc.lat, lng: loc.lng }}
                label={loc.label}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}
