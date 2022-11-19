import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Switch, Route, Link, Routes} from 'react-router-dom';
import Mapped from './Views/MapView';
import Search from './Pages/Search';


const searchArr = ['Coffee', 'Boba', 'Bakery', 'Ice Cream'] 

const YELP_API_BASE_URL = 'https://api.yelp.com/v3/businesses/search'

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
  const [cardScroll, toggleCardScroll] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [searchSelect, setSearchSelect] = React.useState([true, true, true, true])
  const [searchSelectBtn, setSearchSelectBtn] = React.useState([true, true, true, true])
  const [amount , setAmount] = React.useState(20)
  const tmpAmount = React.useRef(20)


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

  React.useEffect(() => {

   if (!navigator.geolocation) {alert('Geolocation is not supported by your browser'); return}

    navigator.geolocation.getCurrentPosition(async (position) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })

      let prevLocation = localStorage.getItem('userLocation')
      let prevDistance;
      if (prevLocation) {
        prevLocation = JSON.parse(prevLocation)
        prevDistance = findDistance(prevLocation.lat, prevLocation.lng, position.coords.latitude, position.coords.longitude)
      }

      else {
        prevDistance = 5
        localStorage.setItem('userLocation', JSON.stringify({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }))
      }
      
      let p = [[], [], [], []];
      let timeSinceLastLoad = getTimeSinceLastLoad();
      prevDistance = findDistance(prevLocation.lat, prevLocation.lng, position.coords.latitude, position.coords.longitude)
      //Load cached places if loaded within 24 hours and within 5 km of last load
      if (prevDistance < 5 && timeSinceLastLoad < 24) {
        console.log('using local storage')
        var prevPlaces = localStorage.getItem('places')
        p = JSON.parse(prevPlaces)
        setPlaces(p)
      }

      else {
        //store current time/date if not loaded within 24 hours
        localStorage.setItem('prevTime', Date.now())
        console.log('loaded from api')
        for (let index = 0; index < searchArr.length; index++) {
           await axios.get(`https://corsanywhere.herokuapp.com/${YELP_API_BASE_URL}`,
           {
           headers: {
            Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`
          },
          params: {
            locale: 'en_US',
            term: searchArr[index],
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            limit: 30,
            sort_by: 'distance'
          }
         }).then((response) => {  
           p[index] = response.data.businesses
           setPlaces(p)
     }).catch((e) => {console.log(e)})
      }

  let food_types = {}
  //EXTREMELY inefficient, make O(n) later using sets
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
    localStorage.setItem('userLocation', JSON.stringify({lat: position.coords.latitude, lng: position.coords.longitude}))
  }
  


  let settings = localStorage.getItem('scroll')
  if (settings == 'true') {
  toggleCardScroll(true)
  }

  else {
    toggleCardScroll(false)
    localStorage.setItem('scroll', 'false')
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

        let a = localStorage.getItem('amount')
        
        if (a) {
          setAmount(parseInt(a))
          tmpAmount.current = parseInt(a)
        }

        else {
          setAmount(20)
          tmpAmount.current = 20
          localStorage.setItem('amount', '20')
        }
  }); 
  setLoading(false)
}
  , [])
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element= {
          userLocation ?
          <Mapped 
          places = {curPlaces} 
          userLocation = {[userLocation.lat, userLocation.lng]
          }/>: <div>Loading...</div>}/>
          <Route path="/search" element = {
          <Search 
          selected = {searchSelect}
          tot_places = {places}/>}/>
        </Routes>
      </Router>
    </>
  )
}
    