import React from "react";
import '../Styles/LocationPage.css'


export default function LocationInput(props) {
    const [currentInputLat, setCurrentInputLat] = React.useState("");
    const [currentInputLon, setCurrentInputLon] = React.useState("");
    console.log(parseFloat(currentInputLat));
    return (
        <div className = 'locationInputContainer'>
        <div className = 'locInputInnerContainer'>
            <span className = 'locInputText'>
                Oops! It appears your location is inaccurate. Please enter your location
                below.
            </span>
        </div>
        <div className = 'locInputInnerContainer'>
            <form className = 'locationInputForm'onSubmit = {() => props.onSubmit(
                parseFloat(currentInputLat), parseFloat(currentInputLon))}>
                <label 
                for = 'latInput'
                className="locationInputLabel"
                >
                    Latitude
                </label>
                <input 
                id = 'lonInput'
                className = 'locationInput'
                value = {currentInputLat} type = 'text'
                onChange = {(e) => {setCurrentInputLat(e.target.value)}}
                />
                
                <label 
                className="locationInputLabel"
                for = 'lonInput'>
                    Longitude
                </label>

                <input 
                className = 'locationInput'
                id = 'lonInput'
                value = {currentInputLon} 
                type = 'text'
                onChange = {(e) => {setCurrentInputLon(e.target.value)}}
                />
                <input type = 'submit' className = 'locInputBtn'/>
            </form>
        </div>

        <div className = 'locInputInnerContainer'>
            <button className = 'locInputBtn' onClick = {props.useCurrentLocation}>
                Use Current Location
            </button>
            <button className = 'locInputBtn'  onClick = {props.useLastLocation}>
                Reload Last Location Entered
            </button>
        </div>

        </div>
    )
}