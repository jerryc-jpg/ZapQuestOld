import React, { useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import axios from "axios";


const Map = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyAyylWo4yRMjT_HSowB1jWsz5qwnPDSUWw',
    });
    const center = useMemo(() => ({ lat: 40.7128, lng: -74.0060 }), []);
    const [myLocation, setMyLocation] = useState(null);
    const [searchLocation, setSearchLocation] = useState(null);
    const [addressList,setAddressList] = useState([center]);

    const handleLocalLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              console.log(`Latitude: ${latitude}`, typeof latitude);
              console.log(`Longitude: ${longitude}`);
              const newLocation = { lat: latitude, lng: longitude };
              setMyLocation(newLocation);
              setAddressList((prevAddressList) => [...prevAddressList, newLocation]);
            },
            (error) => {
              console.error(error.message);
            }
          );
        }
      };
      
      const handleSearchGeo = async () => {
        let location = '22 Main st Boston MA';
        try {
          const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
              address: location,
              key: 'AIzaSyAyylWo4yRMjT_HSowB1jWsz5qwnPDSUWw', // Replace with your own API key
            },
          });
          console.log(response);
          const mySearchLocation = response.data.results[0].geometry.location;
          console.log(mySearchLocation);
          setSearchLocation(mySearchLocation);
          setAddressList((prevAddressList) => [...prevAddressList, mySearchLocation]);
        } catch (ex) {
          console.log(ex);
        }
      };

    const onLoad = (map) => {
        const bounds = new google.maps.LatLngBounds();
        addressList?.forEach(({lat,lng}) =>{
            bounds.extend({lat,lng})
        });
        map.fitBounds(bounds);
    }
    

    console.log(addressList);
    return (
        <div className="Map">
        {!isLoaded ? (
            <h1>Loading...</h1>
        ) : (
            <GoogleMap
            mapContainerClassName="map-container"
            onLoad={onLoad}
        >
            <Marker 
                position={center} 
                icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
            />
            {myLocation?
            ( <Marker 
                position={myLocation} />
            )
            :(null)}

            {searchLocation?
            ( <Marker 
                position={searchLocation} 
                icon={"http://maps.google.com/mapfiles/ms/icons/pink-dot.png"}/>
            )
            :(null)
            }
            
        </GoogleMap>
        )}
        <button className="map-button" onClick={handleLocalLocation}>Button</button>
        <button onClick={handleSearchGeo}>getGeoCode</button>
        </div>
    );
};

export default Map;