
import React from 'react';

import logo from '../assets/SweetToothLogo-transparent.png.png';



const styles = (index = 0) =>  (
    {
    container: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '5vw',
        backgroundColor: 'rgb(255,230,230)',
        position: 'absolute',
        top:0,
        zIndex: 2,
        alignItems: 'center',
        borderStyleBottom: 'solid',
        borderBottomWidth: 3,
        borderBottomColor: 'white',
    },

    logo: {
        height: '6vw',
        padding: 0,
        margin:0,
        width: '9vw',
        position: 'relative',
        top: '5%',
        //right: Dimensions.get('window').width,
        zIndex: 3,
    },

    navButton:
        {
        display: 'flex',
        height: '4vw',
        width: '7vw',
        zIndex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        position:'absolute',
        top: '10%',
        fontSize: '1.5vw',
        left: `${26+ 20*index}vw`,
        borderRadius: 10,
        borderStyle: 'solid',
        borderColor: 'white',
        borderWidth: '1px',
        backgroundColor: 'rgb(255,200,200)',

        },

    buttonText: {
        //fix text alignment in buttons
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',  
        paddingLeft: 5,
        paddingRight: 5,
        color: 'white',
        fontWeight: 'bold',
    }

    
}
)




export default function TopBar (props) {
    //props are refreshfunc, searchfunc, cardToggle, selected (array of keywords),
    // handleChangeSelected (function to change selected), scrollEnabled (function),
    //cardsEnabled


    
    return (
        <div style = {styles().container}>
            <img style = {styles().logo} src = {logo}/>
            <button onClick={props.cardToggle} style = {styles(0).navButton}>   
                Toggle List
            </button>

            <button style = {styles(1).navButton} onClick={() => {
                window.location.href = '/search'
            }}>
                Change Search
            </button>

            <button style = {styles(2).navButton} onClick = {props.settingsToggle}>
               Settings
            </button>
        </div>
    )
    
}

