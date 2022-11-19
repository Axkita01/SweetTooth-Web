import React, { useEffect, useMemo } from 'react'
import {Map, Marker} from 'pigeon-maps'
import TopBar from '../Components/TopBar'
import SweetSwiper from '../Components/Swiper'
import Boba from '../assets/Boba.png';
import Bakery from '../assets/Bakery.png';
import Coffee from '../assets/Coffee.png';
import IceCream from '../assets/IceCream.png';
import icon from '../assets/final.png';



const styles = {
    map: {
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        bottom: 0,
        zIndex: -1,
        backgroundColor: 'transparent',
    },
    container: {
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
    },

    dessert: {
        height: '50%'
    },

    list: {
        zIndex: 1,
        width: '90%',
        height: '90%',
        paddingBottom: '3vh',
        overflow: 'visible',
    }
}

const images = {
    'Boba': Boba,
    'Bakery': Bakery,
    'Coffee': Coffee,
    'Ice Cream': IceCream
}
//initalize map
export default function Mapped (props) {


    function findDistance(lat1, lon1, lat2, lon2) {
        var p = 0.017453292519943295;    // Math.PI / 180
        var c = Math.cos;
        var a = 0.5 - c((lat2 - lat1) * p)/2 + 
                c(lat1 * p) * c(lat2 * p) * 
                (1 - c((lon2 - lon1) * p))/2;
      
        return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
        }

    function reducer(state, action) {
        switch(action.type) {
            case 'places-added':
                action.payload.sort(
                    function(a, b) {
                        return -findDistance(props.latitude, props.longitude, a.coordinates.latitude, a.coordinates.longitude) + findDistance(props.latitude, props.longitude, b.coordinates.latitude, b.coordinates.longitude)
                    }
                )
                return {places: action.payload}

            case 'places-cleared':
                return {places: []}
        
        }
    }

    const [swiperIndex, setSwiperIndex] = React.useState(0)
    const [cards, toggleCards] = React.useState(false)
    const [state, dispatch] = React.useReducer(reducer, {places: []})
    const [placeLocation, setPlaceLocation] = React.useState(props.userLocation)
    const [zoom, setZoom] = React.useState(12)
    const card_lst = useMemo(() => {
        return state.places
    }, [state.places])

    console.log(state.places)
    //get markers from props as list then map to markers
    const markers = useMemo(
        () => {
        return (
        state.places.map((marker, index) => {
        let lat = marker.coordinates.latitude
        let lon = marker.coordinates.longitude
        if (!marker || marker === undefined) {
         return null
        }
        console.log(marker)
        return (
         <Marker
         index = {index}
         loadingEnabled = {true}
         image = {icon}
         onClick = {() => {
             setPlaceLocation([lat, lon])
             setSwiperIndex(index)
             toggleCards(true) 
             setZoom(18)
         }}
         anchor = {[lat, lon]}
         title = {marker.name}
         key = {index}
         />)} ))}, [state.places])

    useEffect(() => {
        dispatch({type: 'places-cleared'})
        let count = 0;
        let place;
        let seen = new Set()
        let total = []
        for (let i = props.places.length - 1; i >= 0; i--) {
            place = props.places[i]
            if (place === undefined || seen.has(place.id)) {
                continue
            }
            else if (count === props.amount) {break}
            else {
                seen.add(place.id)
                count++
                total.push(place)
            }
        dispatch({type: 'places-added', payload: total})
        }

    }, [props.places, props.amount])
    //end of temporary block

    const MemoizedSwiper = React.useMemo(() => {
        return (
            <SweetSwiper 
                style = {{background: 'transparent'}}
                images = {images}
                index = {swiperIndex}
                card_lst = {card_lst} 
                navigate = {(location) => {
                setPlaceLocation(location);
                setZoom(18)
            }}
                navigation = {props.navigation}/>
        )
    }, [state.places, swiperIndex])
    
    const MemoizedTopBar = React.useMemo(() => {
        return (
            <TopBar 
            //refreshfunc = {() => {props.refresh;}}
            cardToggle = {() => {toggleCards((prev) => !prev)}}
            settingsToggle = {() => {window.location.href = '/settings'}}
            cardsEnabled = {toggleCards}
            ></TopBar>
        )
    }, [])
    return (
    
        <div style = {styles.container} 

        >
            {/*NavBar*/}
            {MemoizedTopBar}
        
            {/*Popup Cards*/}

            {cards && MemoizedSwiper}
            
            {/*Map*/}
            <Map
            onBoundsChanged={({center,zoom}) => {
               setPlaceLocation(center)
               setZoom(zoom)
            }}
            style = {styles.map}
            center = {placeLocation}
            //minZoom = {10}
            showsUserLocation = {true}
            zoom = {zoom}
            >
                {markers}
            </Map>
        </div>
    )
}
