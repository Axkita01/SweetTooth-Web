import React from "react";
import IceCream from "../assets/IceCream.png";
import "../Styles/Spinner.css";

export default function Spinner () {
    return (
        <div className = 'spinnerContainer'>
            <div className = 'spinner'>
                <img className = 'spinnerImage' src = {IceCream}/>
            </div>
        </div>
    )
}