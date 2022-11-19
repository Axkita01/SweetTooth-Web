import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Switch, Route, Link, Routes} from 'react-router-dom';
import Mapped from './Views/MapView';
import devPlaces from './assets/tempMapPlaces.json';
import Search from './Pages/Search';
import devPlaces2 from './assets/tempMapPlaces2.json';


const searchArr = ['Coffee', 'Boba', 'Bakery', 'Ice Cream'] 

const GOOGLE_PLACES_API_BASE_URL = 'https://maps.googleapis.com/maps/api/place'

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
    console.log(places, 'places')

    let filter = []
    for (let i = 0; i < searchSelect.length; i++) {
      if (searchSelect[i]) {
        filter = filter.concat(places[i])
      }
    }
    setCurPlaces(filter)
  }

  function findDistance (lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;
  
    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  }

  React.useEffect(() => {
    console.log('useEffect')
   if (!navigator.geolocation) {alert('Geolocation is not supported by your browser'); return}

    navigator.geolocation.getCurrentPosition((position) => {
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
      //console.log(devPlaces)
      let p = []
      prevDistance = findDistance(prevLocation.lat, prevLocation.lng, position.coords.latitude, position.coords.longitude)
      prevDistance = 0
      if (prevDistance < 5) {
        var prevPlaces = localStorage.getItem('places')
        //p = JSON.parse(prevPlaces)
        p = [devPlaces.businesses]
        p.push(devPlaces2.businesses)
        p.push([])
        p.push([])
        console.log(p)
        //remove below and uncomment above in production
        //console.log('places set')
        setPlaces(p)
        //p = devPlaces.places
      }

      else {
        console.log('loaded from api')
        for (var index = 0; index < searchArr.length; index++) {
          console.log('for')

          //integrate javascript API
           axios.request({
           method: 'get',
           url: `${GOOGLE_PLACES_API_BASE_URL}/textsearch/json?key=AIzaSyCrkw8_m93lrUuwfPOgqOTSUMFvX7znkJ8&query=${searchArr[index]}&location=${position.coords.latitude},${position.coords.longitude}&radius=25&types=establishment`
         }).then((response) => {
           console.log('pinged', response.data.results)
           response.data.results.sort(
             //sort by distance
             (a, b) => {
               return -findDistance(a.geometry.location.lat, a.geometry.location.lng, position.coords.latitude, position.coords.longitude) + findDistance(b.geometry.location.lat, b.geometry.location.lng, position.coords.latitude, position.coords.longitude)
             }
           )
           p.push(response.data.results)
     }).catch((e) => console.log(e))
      }


    localStorage.setItem('places', JSON.stringify(p))
    localStorage.setItem('userLocation', JSON.stringify({lat: position.coords.latitude, lng: position.coords.longitude}))
    setPlaces(p)
  }
  
  
  let food_types = {}
  //EXTREMELY inefficient, make O(n) later using sets
  for (let i = 0; i < p.length; i++) {
    for (let j = 0; j < p[i].length; j++) {
      if (food_types[p[i][j].place_id] !== undefined) {
        let temp = food_types[p[i][j].place_id]
        temp.push(searchArr[i])
        food_types[p[i][j].place_id] = temp
        p[i][j].type = temp
      }
      else {
        food_types[p[i][j].place_id] = [searchArr[i]]
        p[i][j].type = [searchArr[i]]
      }
    }
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
      
  }); setLoading(false)}

  
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
    