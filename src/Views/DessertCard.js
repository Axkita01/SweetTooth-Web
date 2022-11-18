
import logo from '../assets/SweetToothLogo-transparent.png.png';
import React, {useState, useEffect, useRef, useReducer} from 'react';
import googleLogo from '../assets/GoogleMaps.png';
import IceCream from '../assets/IceCream.png';
import Coffee from '../assets/Coffee.png';
import Boba from '../assets/Boba.png';
import Bakery from '../assets/Bakery.png';
import Kannit from '../fonts/Kanit-Regular.ttf';


const images = {
    'Ice Cream': IceCream,
    'Coffee': Coffee,
    'Boba': Boba,
    'Bakery': Bakery,
}

const styles = (intensity = 0, glow = 0) => {
return (
    {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'top',
        alignItems: 'center',
        width: '95%',
        height: '100%',
        backgroundColor: 'rgb(255, 220, 220)',
        zIndex: 2,
        borderRadius: '2vw',
        marginBottom: '1vh',
        shadowColor: `rgb(${1.3 * intensity <= 255 ? 1.3 * intensity: 255}, ${.6 * intensity <= 105 ? .6 * intensity: 105}, ${.7 * intensity <= 180 ? .7 * intensity: 180})`,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: intensity >= 130 ? glow: 0,
        shadowRadius: 10,
        borderColor: 'white',//`rgb(${1.3 * intensity <= 255 ? 1.3 * intensity: 255}, ${.6 * intensity <= 105 ? .6 * intensity: 105}, ${.7 * intensity <= 180 ? .7 * intensity: 180})`,
        borderStyle: 'solid',
        borderWidth:  '.01vw',
        position: 'relative',
    },

    innerContainer: {
        display: 'flex',
        fontSize: '1.5vw',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '5vw',
        backgroundColor: 'transparent'
    },

    header: {
        fontFamily: Kannit,
        display: 'flex',
        fontWeight: 'bold',
        fontSize: '30%',
        padding: 0,
        paddingTop: '1%',
        textAlign: 'center',
        text: `rgb(${1.3 * intensity <= 255 ? 1.3 * intensity: 255}, ${.6 * intensity <= 105 ? .6 * intensity: 105}, ${.7 * intensity <= 180 ? .7 * intensity: 180})`,
        textShadowColor: `rgb(${1.3 * intensity <= 255 ? 1.3 * intensity: 255}, ${.6 * intensity <= 105 ? .6 * intensity: 105}, ${.7 * intensity <= 180 ? .7 * intensity: 180})`,
        textShadowRadius: 10,
        color: 'white'
    },
    
    topBar: {
        display: 'flex',
        height: '5vw',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: '1.5vw',
    },

    image: {
        height: '100%',
        width: 'auto',

    },

    text: {
        fontFamily: 'Kannit',
        fontSize: '20%',
        fontWeight: "700",
        color: 'white'
    },

    

    reviews: {
        height: '20vw',
        width: '60vw',
        zIndex: 4,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderRadius: '30vw',
        borderColor: 'pink',
        backgroundColor: '#fff0f5',
        
    },

    single_review:  {
        borderRadius: '5vw',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '12vw',
        height: '90%',
        objectFit: 'contain',
        backgroundColor: 'transparent',
        paddingTop: '5%',
    },

    dirButtons: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        margin: '5%',
        width: '10%',
        height: '5%',
    },
    
    placebtn: {
        display: 'flex',
        height: '2vw',
        margin: '1vw',
        fontSize: '.8vw',
        padding: '1%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '1%',
        width: 'auto',
        marginRight: 3,
        fontFamily: 'Kannit',
        backgroundColor: 'pink',
        borderWidth: 1,
        borderColor: 'white',
    
    }})
}

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
    
    function reducer (picState, action) {
        switch (action.type) {
            case 'toggle':
                let temp = picState.picIdx + 1
                let image_length = Object.keys(images).length
                if (temp === image_length) {
                    temp = 0
                }
                return {picIdx: temp}
        }
    }

    const [picState, picDispatch] = useReducer(reducer, {picIdx: 0})
    //FIXME: implement placeholder for loading
    const [loading, setLoading] = useState(true)
    const types_list = useRef()
    
    const noWarning = loading
    
    useEffect(() => {
        if (props.types.length > 1) {
        let scroll = setInterval(() => {
            picDispatch({type: 'toggle'});
            return (
                () => {
                    clearInterval(scroll)
                }
            )
        }, 3000)
    }
        setLoading(false)}, [])
    
    console.log(props.types)
    types_list.current = props.types.map((type) => {
        return (
            <div style = {styles().single_review}>
                        <img
                        src = {images[type]}
                        style = {{width: '100%',  marginBottom: '10%', backgroundColor: 'white', height: '100%', maxHeight: 'inherit', maxWidth: 'inherit', objectFit: 'contain'}}
                        
                        backgroundColor = 'transparent'
                        />
            </div>
        )
    })

    return (
            
        <div style = {styles(intensity()).container}>
            <div style = {styles().topBar}>
                <img
                style = {styles().image} src={logo}
                />
            </div>
            <div style = {{...styles(0).innerContainer, overflowY: 'visible', fontFamily: 'Kannit'}}>
                {`${props.name}`}
            </div>
           
            <div style = {styles().innerContainer}>
                {`Rating: ${props.rating}`}
            </div>
             
            <div style = {styles().innerContainer}>
                
                {`Reviews: ${props.num_ratings}\n`}
            </div>
            <div style = {{...styles().innerContainer, 
            alignItems: 'center',
            width: '75%',
            height: '10vw',
        }} >
                {types_list.current[picState.picIdx]}
            </div>
            <div style = {styles().innerContainer}>
                <button style = {styles().placebtn} onClick={props.navigatefunc}>
                        Go to place
                </button>

                <button 
                style = {{...styles().placebtn, padding: 0, alignItems: 'center', backgroundColor: 'transparent', position: 'relative', bottom: '.03vh', borderWidth: 0}}
                onClick = {() => {
                    window.open(`https://www.google.com/maps/place/?q=${props.name}, ${props.address}`)
                }}
                >
                    <img 
                    src = {googleLogo}
                    
                    style = {{height: '100%', width: '100%'}}/>
                
                </button>

            </div>
            {/*
            {!props.scrollable && 
            <div style = {{...styles().innerContainer, position: 'absolute', bottom: 10}}>
                { props.idx < props.length - 1 &&
                <button onClick = {props.scrollDown} style = {styles().dirButtons}>{'\u21C3'}</button>
                    }

                { props.idx !== 0 && 
                <button onClick = {props.scrollUp} style = {styles().dirButtons}>{'\u21BE'}</button>}
            </div>}   
                */} 
        </div>
                
        )

}

