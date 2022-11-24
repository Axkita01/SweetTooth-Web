import React from "react";
import '../Styles/LocationPage.css'


export default function LocationInput(props) {
    const [currentInputLat, setCurrentInputLat] = React.useState("");

    return (
        <div className = 'locationInputContainer'>
        <div className = 'locInputInnerContainer'>
            <span className = 'locInputText'>
                Oops! It appears your location is inaccurate. Please enter your location
                below to continue.
            </span>
        </div>

        <div className = 'locInputInnerContainer'>
            <form className = 'locationInputForm' onSubmit = {(e) => {
                props.handleSubmit(currentInputLat)
                e.preventDefault()
            }}>
                <label 
                for = 'latInput'
                className="locationInputLabel"
                >
                    Location
                </label>
                <input 
                id = 'lonInput'
                className = 'locationInput'
                value = {currentInputLat} 
                type = 'text'
                //pattern = '[0-9]{1,3}.[0-9]{4}'
                onChange = {(e) => {setCurrentInputLat(e.target.value)}}
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