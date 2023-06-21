import React, { useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";


const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAyylWo4yRMjT_HSowB1jWsz5qwnPDSUWw',
  });
  const center = useMemo(() => ({ lat: 40.7128, lng: -74.0060 }), []);
  const [myLatitude, setMyLatitude]=useState(null);
  const [myLongitute, setMyLongitute]=useState(null);

  const handleLocalLocation = () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            (position) =>{
                const {latitude, longitude} = position.coords
                console.log(`Latitude: ${latitude}`,typeof latitude);
                console.log(`Longitude: ${longitude}`);
                setMyLatitude(latitude);
                setMyLongitute(longitude);
            },
            (error) =>{
                console.error(error.message);
            }
        )
    }
  }

  return (
    <div className="Map">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
        mapContainerClassName="map-container"
        center={center}
        zoom={10}
      >
        <Marker 
            position={{ lat: 40.7128, lng: -74.0060 }} 
            icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
        />
        {myLatitude?
        ( <Marker 
            position={{ lat: myLatitude, lng: myLongitute }} />
        )
        :(null)}
        
      </GoogleMap>
      )}
      <button className="map-button" onClick={handleLocalLocation}>Button</button>
    </div>
  );
};

export default Map;