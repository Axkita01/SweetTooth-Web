import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Mapped from './Views/MapView';
import Search from './Pages/Search';
import LocationInput from './Components/LocationInput';



const searchArr = ['Coffee', 'Boba', 'Bakery', 'Ice Cream'] 

//Function to get time since last load in hours. If no previous time, return 24 hours
function getTimeSinceLastLoad() {
    let lastLoad = localStorage.getItem('prevTime');
    let timeSinceLastLoad;
    if (lastLoad) {
        timeSinceLastLoad = (Date.now() - lastLoad) / 3600000;
    }

    else {
        timeSinceLastLoad = 24;
    }

    return timeSinceLastLoad;
}


export default function App() {
  const [userLocation, setUserLocation] = React.useState(null)
  const [places, setPlaces] = React.useState([])
  const [curPlaces, setCurPlaces] = React.useState([])
  const [searchSelect, setSearchSelect] = React.useState([true, true, true, true])
  const [locationInaccurate, setLocationInaccurate] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const locationRef = React.useRef(null)

  
  function searchChange (searchSelect, places) {
    let filter = []
    for (let i = 0; i < searchSelect.length; i++) {
      if (searchSelect[i]) {
        filter = filter.concat(places[i])
      }
    }
    
    setCurPlaces(filter)
  }

  //Find distance between two points given two sets of latitude and
  //longitude coordinates
  function findDistance (lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;
  
    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  }

  
  React.useLayoutEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      if (!navigator.geolocation) {
        setLocationInaccurate(true)
      }

      else if (position.coords.accuracy > 200) {
        setLocationInaccurate(true)
      }

      else {
        locationRef.current = position
        setLocationInaccurate(false)
      }
    }, null,{enableHighAccuracy: true})
  }, [])

  React.useLayoutEffect(() => {
    (async () => {
      if (locationRef.current !== null && !locationInaccurate) {
      setUserLocation({
        lat: locationRef.current.coords.latitude,
        lng: locationRef.current.coords.longitude
      })

      let prevLocation = localStorage.getItem('userLocation')
      let prevDistance;
      if (prevLocation) {
        prevLocation = JSON.parse(prevLocation)
        prevDistance = findDistance(prevLocation.lat, prevLocation.lng, locationRef.current.coords.latitude, locationRef.current.coords.longitude)
      }

      else {
        prevDistance = 5
        localStorage.setItem('userLocation', JSON.stringify({
          lat: locationRef.current.coords.latitude,
          lng: locationRef.current.coords.longitude
        }))
      }
      
      let p = [[], [], [], []];
      let timeSinceLastLoad = getTimeSinceLastLoad();
      prevDistance = findDistance(prevLocation.lat, prevLocation.lng, locationRef.current.coords.latitude, locationRef.current.coords.longitude)
      //Load cached places if loaded within 24 hours and within 5 km of last load
      if (prevDistance < 5 && timeSinceLastLoad < 24) {
        var prevPlaces = localStorage.getItem('places')
        p = JSON.parse(prevPlaces)
        setPlaces(p)
      }

      else {
        //store current time/date if not loaded within 24 hours
        localStorage.setItem('prevTime', Date.now())
        console.log(searchArr)
        for (let index = 0; index < searchArr.length; index++) {
           await axios.get(`${process.env.REACT_APP_API_URL}/places`,
           {
            params: {
              term: searchArr[index],
              latitude: locationRef.current.coords.latitude,
              longitude: locationRef.current.coords.longitude,
              limit: 50
            },
         }).then((response) => { 
          console.log(response)
           p[index] = response.data.businesses
           setPlaces(p)
     }).catch((e) => {console.log(e)})
      }

  let food_types = {}
  //Puts types of places onto each places object as a dictionary
  //Based on which search they appeared in
  for (let i = 0; i < p.length; i++) {
    for (let j = 0; j < p[i].length; j++) {
      if (food_types[p[i][j].id] !== undefined) {
        let temp = food_types[p[i][j].id]
        temp.push(searchArr[i])
        food_types[p[i][j].id] = temp
        p[i][j].type = temp
      }
      else {
        food_types[p[i][j].id] = [searchArr[i]]
        p[i][j].type = [searchArr[i]]
      }
    }
  }


    localStorage.setItem('places', JSON.stringify(p))
    localStorage.setItem('userLocation', JSON.stringify({lat: locationRef.current.coords.latitude, lng: locationRef.current.coords.longitude}))
  }
  
      let search = localStorage.getItem('search')
      localStorage.setItem('places', JSON.stringify(p))
      
          if (search) {
            search = JSON.parse(search).search
            searchChange(search, p)
          }
          else {
            searchChange([true, true, true, true], p);
            localStorage.setItem('search', JSON.stringify({search: [true, true, true, true]}))
          }

      }
    })();
    setLoading(false)
  }
  , [locationInaccurate, locationRef.current])

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element= {
          !locationInaccurate ?
          (!loading && userLocation ?
          <Mapped 
          setLocationInaccurate={setLocationInaccurate}
          places = {curPlaces} 
          userLocation = {[userLocation.lat, userLocation.lng]
          }/>: <div>Loading...</div>): 
          <LocationInput 
            handleSubmit = {(address) => {
              axios.get(
                `${process.env.REACT_APP_API_URL}/geocode`,
                {params: {
                  q: address,
                  format: 'json'
                }}
              ).then((response) => {
                console.log(response)
                locationRef.current = {
                  coords: {
                    latitude: response.data[0].lat,
                    longitude: response.data[0].lon
                  }
                }
                setLocationInaccurate(false)
              }).catch((e) => {
                console.log(e)
              })
            }}

            useLastLocation = {() => {
              let prevLocation = localStorage.getItem('userLocation')
              if (prevLocation) {
                prevLocation = JSON.parse(prevLocation)
                locationRef.current = {coords: {accuracy: 0, latitude: prevLocation.lat, longitude: prevLocation.lng}}
                setLocationInaccurate(false)
              }
              else {
                alert('No previous location found')
              }
            }}
            useCurrentLocation = {() => {
              navigator.geolocation.getCurrentPosition((position) => {
                  locationRef.current = position
                  setLocationInaccurate(false)
              }, null,{enableHighAccuracy: true})
            }}
            />}
            />
          <Route path="/search" element = {
          <Search 
          selected = {searchSelect}
          tot_places = {places}/>}/>
        </Routes>
      </Router>
    </>
  )
}
    