import React, {useState} from 'react'
import '../Styles/StartingMenu.css'
import logo from '../assets/SweetToothLogo-transparent.png.png'


export default function StartingMenu(props) {

    const [menuToggle, setMenuToggle] = useState(sessionStorage.getItem('menuToggle') ? JSON.parse(sessionStorage.getItem('menuToggle')) : true)

    return (
    <div className = 'outerMenuContainer'>
    <div className={menuToggle ? 'hideScreen': 'hiddenMenu'}></div>
        <div className = {menuToggle ? 'startingMenuContainer': 'hiddenMenu'}>
            <div className = 'menuInnerContainer'>
                <img 
                className = 'menuLogo'
                src = {logo}/>
            </div>
            <div className = 'startingMenuInnerContainer'>
                <span className='startingMenuText'>
                    Hello, Welcome to SweetTooth! Dessert places around you will be shown.
                    To change what the types of places you want to see, please change your
                    search settings in the search page. Happy Eating!
                </span>
            </div>
            
            <div className = 'startingMenuInnerContainer'>
                <button 
                onClick = {() => {
                    sessionStorage.setItem('menuToggle', 'false')
                    setMenuToggle(false)
                }}
                className = 'startingMenuBtn'>
                    Ok!
                </button>
            </div>
        </div>
        </div>
    )
}