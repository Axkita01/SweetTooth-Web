import React from "react";


export default function LocationInput(props) {
    const [currentInputLat, setCurrentInputLat] = React.useState("");
    const [currentInputLon, setCurrentInputLon] = React.useState("");
    console.log(parseFloat(currentInputLat));
    return (
        <div className = 'locationInputContainer'>
            <form onSubmit = {() => props.onSubmit(
                parseFloat(currentInputLat), parseFloat(currentInputLon))}>
                <label for = 'latInput'>
                    Latitude
                </label>
                <input 
                id = 'latInput'
                value = {currentInputLat} type = 'text'
                onChange = {(e) => {setCurrentInputLat(e.target.value)}}
                />
                
                <label for = 'lonInput'>
                    Longitude
                </label>

                <input 
                id = 'lonInput'
                value = {currentInputLon} 
                type = 'text'
                onChange = {(e) => {setCurrentInputLon(e.target.value)}}
                />
                <input type = 'submit'/>
            </form>
            <button onClick = {props.useCurrentLocation}>
                Use Current Location
            </button>
            <button onClick = {props.useLastLocation}>
                Reload Last Location Entered
            </button>
        </div>
    )
}