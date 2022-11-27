
import logo from '../assets/SweetToothLogo-transparent.png.png';
import React, {useRef} from 'react';
import googleLogo from '../assets/GoogleMaps.png';
import Yelp from '../assets/YelpLogo.png'
import '../Styles/DessertCard.css';
import {images, ratings} from '../assets/images.js';


export default function DessertCard(props) {
    //Props are name, image, rating, and description, num_ratings, navigatefunc (maybe more later) type is list of strings denoting types of desserts

    //FIXME: implement placeholder for loading
    const types_list = useRef()
    
    //remove once loading
    
    types_list.current = 
    <div style = {{display: 'flex', flexDirection: 'row'}}>
    {props.types.map(
        (type) => {
            return (
            <li key = {type}>
                <img className = 'typeImg' src={images[type]} alt={type}/>
            </li>
            )
        }
    )}
    </div>

    const distance_miles = (props.distance * 0.000621371).toFixed(2)
    const rounded_rating = Math.round(props.rating/0.5) * 0.5
    const rating_image = ratings[rounded_rating]

    return (
            
        <div className = 'dessertCardContainer'>
            <div className = 'dessertCardHeader'>
                <img
                src={logo}
                className ='image'
                />
            </div>

            <div>
                <span className = 'distanceText'>{distance_miles} miles away</span>
            </div>

            <div 
            style = {{overflowY: 'visible', flexDirection: 'column'}}
            className = 'dessertCardInnerContainer'
            >
                <div>
                    {`${props.name}`}
                </div>
                <div style = {{marginTop: '.6vw'}}>
                    {types_list.current}
                </div>
            </div>
           
            <div 
            className = 'dessertCardInnerContainer'
            >
                {`Rating: ${props.rating}`}
            </div>

            <div className='dessertCardInnerContainer yelpStars'>
                <img style = {{width: '100%'}} src = {rating_image}/>
            </div>

            <div
            className = 'dessertCardInnerContainer'
            >
                {`Reviews: ${props.num_ratings}`}
            </div>
            
            <div className = 'dessertCardInnerContainer placeImgContain'>
                <div 
                className = 'dessertCardInnerContainer'
                >
                    <div className = 'placeImg'>
                        {
                        props.place_img ?
                        <img src = {props.place_img} style = {{height: '90%', borderRadius: '1vw',}}/>
                        :<div>No Image available</div>
                        }
                    </div>
                </div>
            </div>


            <div 
            className = 'dessertCardInnerContainer'
            >
                <button 
                className='placebtn'
                onClick={props.navigatefunc}>
                        Go to place
                </button>

                <button 
                className='placebtn imgBtn'
                onClick = {() => {
                    window.open(`https://www.google.com/maps/place/?q=${props.name}, ${props.address}`)
                }}
                >
                    <img 
                    src = {googleLogo}
                    
                    style = {{height: '100%', width: '100%'}}/>
                
                </button>

                <button 
                className='placebtn imgBtn'
                onClick = {() => {
                    window.open(props.url)
                }}
                >
                    <img 
                    src = {Yelp}  
                    style = {{height: '100%', width: '100%'}}/>
                </button>
            </div>
        </div>
                
        )

}

