import React, { useEffect, useMemo } from 'react'
import {Map, Marker, Overlay} from 'pigeon-maps'
import TopBar from '../Components/TopBar'
import SweetSwiper from '../Components/Swiper'
import star_img from '../assets/Star_Center.png'
import '../Styles/MapView.css'

const height = document.scrollingElement.scrollHeight

function findDistance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;
  
    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}



export default function Mapped (props) {

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
    const locRef = React.useRef(props.userLocation)
    const zoomRef = React.useRef(12)
    const [trigger, setTrigger] = React.useState(false)
    
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
        
        return (
         <Marker
         color = {'pink'}
         index = {index}
         loadingEnabled = {true}
         onClick = {() => {
            zoomRef.current = 18
            locRef.current = [lat , lon -  .0005]
            setSwiperIndex(index)
            toggleCards(true)
        }}
         anchor = {[lat, lon]}
         title = {marker.name}
         key = {index}
         >
            
        </Marker>)} ))}, [state.places])
    
    useEffect(() => {
        dispatch({type: 'places-cleared'})
        locRef.current = props.userLocation
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
                total.push(place)
            }
        dispatch({type: 'places-added', payload: total})
        }
        zoomRef.current = 14
    }, [props.places, props.userLocation])
    //end of temporary block

    const MemoizedSwiper = React.useMemo(() => {
        return (
            <SweetSwiper 
                style = {{background: 'transparent'}}
                index = {swiperIndex}
                card_lst = {state.places} 
                navigate = {(location) => {
                locRef.current = location;
                zoomRef.current = 18
                setTrigger(prev => !prev)
            }}/>
        )
    }, [state.places, swiperIndex])
    
    const star = React.useMemo(() => {
        return (
            <Overlay
            style = {{width: '2vw', height: '2vw'}}
            anchor={props.userLocation}
            >
                <img 
                alt = 'current location picture'
                style = {{height: '100%', width: '100%', zIndex: 2}}
                src = {star_img}/>
            </Overlay>
        )
    }, [props.userLocation])

    const MemoizedTopBar = React.useMemo(() => {
        return (
            <TopBar 
            setLocationInaccurate = {props.setLocationInaccurate}
            cardToggle = {() => {toggleCards((prev) => !prev)}}
            settingsToggle = {() => {window.location.href = '/settings'}}
            cardsEnabled = {toggleCards}
            backToSelf = {
                () => {
                    locRef.current = props.userLocation
                    zoomRef.current = 14
                    setTrigger(prev => !prev)
                }
            }
            ></TopBar>
        )
    }, [])
    

    
    return (
    
        <div className = 'mapContainer' style = {{height: height}}> 
        
            {/*NavBar*/}
            {MemoizedTopBar}
        
            {/*Popup Cards*/}

            {cards && (state.places.length > 0 ? MemoizedSwiper: <div style = {{position: 'absolute', top: '10vh', zIndex: 4}}>No Places Found</div>)}
            
            {/*Map*/}
            <Map
            className = 'map'
            zoomSnap = {false}
            onBoundsChanged={({zoom, center}) => {
               zoomRef.current = zoom
               locRef.current = center
            }}
            minZoom = {10}
            center = {locRef.current}
            zoom = {zoomRef.current}
            >
                {markers}
                {star}
            </Map>
        </div>
    )
}
