
import logo from '../assets/SweetToothLogo-transparent.png.png';
import React, {useRef} from 'react';
import googleLogo from '../assets/GoogleMaps.png';
import IceCream from '../assets/IceCream.png';
import Coffee from '../assets/Coffee.png';
import Boba from '../assets/Boba.png';
import Bakery from '../assets/Bakery.png';
import Yelp from '../assets/YelpLogo.png'
import '../Styles/DessertCard.css';
import {images} from '../assets/images.js';


export default function DessertCard(props) {
    //Props are name, image, rating, and description, num_ratings, navigatefunc (maybe more later) type is list of strings denoting types of desserts
    const intensity = () => {
        try {
            return (Math.round(Math.log(5, props.rating)) * 15*Math.log(props.num_ratings))
        }
        catch {
            return 0
        }
    }

    //FIXME: implement placeholder for loading
    const types_list = useRef()
    
    //remove once loading
    
    types_list.current = 
    <div style = {{display: 'flex', flexDirection: 'row'}}>
    {props.types.map(
        (type) => {
            return (
            <li key = {type}>
                <img style = {{height: '3vw', borderRadius: '1.5vw', borderStyle: 'solid', marginLeft: '.1vw', marginRight: '.5vw'}} src={images[type]} alt={type}/>
            </li>
            )
        }
    )}
    </div>

    const distance_miles = (props.distance * 0.000621371).toFixed(2)
    
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

