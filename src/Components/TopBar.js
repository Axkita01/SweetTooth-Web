
import React from 'react';

import logo from '../assets/SweetToothLogo-transparent.png.png';

import '../Styles/TopBar.css';


export default function TopBar (props) {
    //props are refreshfunc, searchfunc, cardToggle, selected (array of keywords),
    // handleChangeSelected (function to change selected), scrollEnabled (function),
    //cardsEnabled

    return (
        <div className = 'navContainer'>
            <img className = 'logo' src = {logo}/>
            <button 
            onClick={props.cardToggle} 
            className = 'navButton'
            id = 'zero'
            >   
                Toggle List
            </button>

            <button 
            className='navButton'
            id = 'one'
            onClick={() => {
                window.location.href = '/search'
            }}
            >
                Change Search
            </button>

            <button 
            onClick = {props.settingsToggle}
            className = 'navButton'
            id = 'two'
            >
               Settings
            </button>
        </div>
    )
    
}

