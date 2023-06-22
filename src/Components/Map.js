import React, { useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import axios from "axios";



const Map = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyAyylWo4yRMjT_HSowB1jWsz5qwnPDSUWw',
    });
    const originCenter = useMemo(() => ({ lat: 41.8781, lng: -87.6298 }), []);
    const [center,setCenter]= useState(originCenter);
    const [myLocation, setMyLocation] = useState(null);
    const [searchInput,setSearchInput] = useState('');
    const [searchLocation, setSearchLocation] = useState(null);
    const [addressList,setAddressList] = useState([center]);
    const [EVSList,setEVSList] = useState(null);

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
              setCenter(newLocation);
            },
            (error) => {
              console.error(error.message);
            }
          );
        }
      };
      
      const handleEVStations = async (zipcode) => {
        try {
            const response = await axios.get('https://developer.nrel.gov/api/alt-fuel-stations/v1.json', {
                params: {
                    api_key:'WcteKIPw0jwiEYdbKSWqyu4Sys9Z0Z4AbcxPVEzx',
                    fuel_type: 'ELEC',
                    zip:zipcode,
                },
            });

            setEVSList(response.data.fuel_stations);
            console.log(EVSList);
            
        } catch (ex) {
            console.log(ex);
        }
      };

     
      const handleSearchGeo = async (ev) => {
        ev.preventDefault();
        try {
            console.log('searchInput:',searchInput)
            const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                address: searchInput,
                key: 'AIzaSyAyylWo4yRMjT_HSowB1jWsz5qwnPDSUWw', // Replace with your own API key
                },
            });
            console.log('search address:',response.data);
            const addressArr = response.data.results[0].formatted_address.split(',');
            const tempAddressARR =addressArr[addressArr.length-2].split(' ');
            const zipcode = tempAddressARR[tempAddressARR.length-1];

            const tempZipcode = response.data.results[0].address_components[response.data.results[0].address_components.length - 1].long_name
            console.log('zipcode type:',typeof zipcode,'zipcode:',zipcode);
            const mySearchLocation = response.data.results[0].geometry.location;
            handleEVStations(zipcode)
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
    const onChange = (ev)=>{
        setSearchInput(ev.target.value);
    } 

    
    console.log(EVSList);

    return (
        <div className="Map">
            <form onSubmit={handleSearchGeo}>
                <input placeholder=" search city, place or address" value={searchInput} onChange={onChange}/>
                <button>search</button>
            </form>
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
                {EVSList?(EVSList.map((s)=>{console.log(`here,latitude:${s.latitude},longitude:${s.longitude}`);
                let location = {lat:s.latitude,lng:s.longitude};
                console.log(location);
                return(
                    <Marker
                    position={location}
                    icon={"http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"}
                    key={s.id}
                    />
                )
                })):(null)}
                
            </GoogleMap>
        )}
        <button className="map-button" onClick={handleLocalLocation}>My Location</button>
        <button onClick={handleSearchGeo}>getGeoCode</button>
        <button onClick ={handleEVStations}>getEVStations</button>
        </div>
    );
};

export default Map;