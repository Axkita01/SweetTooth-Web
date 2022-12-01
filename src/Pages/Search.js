import React from 'react';
import {useEffect} from 'react';
import '../Styles/Search.css';
import {images} from '../assets/images.js';

const searchArr = ['Coffee', 'Boba', 'Bakery', 'Ice Cream'] 

export default function Search(props) {

    const [searchSelectBtn, setSearchSelectBtn] = React.useState(props.selected)

    useEffect(() => {
        let search = localStorage.getItem('search')
        if (search) {
            search = JSON.parse(search)
            setSearchSelectBtn(search.search)
        }

        else {
            localStorage.setItem('search', JSON.stringify({search: [true, true, true, true]}))
        }
    }, [])
  
    const search = searchSelectBtn.map((item, index) => {
        return (
          <div className = 'searchBtnContain'>
              <button 
              className='searchBtn'
              style = {{backgroundColor: item ? 'pink' : 'gray'}}
              onClick = {() => {
                let temp = searchSelectBtn.slice()
                temp[index] = !temp[index]
                setSearchSelectBtn(temp)
              }}>
                  <div>
                    <img 
                    className='searchBtnImage'
                    src = {images[searchArr[index]]}/>
                  </div>
              </button>
              <span className='searchBtnText'>
                {searchArr[index]}
              </span>
          </div>
            
          )

    })
  return (
    <div className = 'searchContainer'>
      <button className='backBtn' onClick = {() => {window.location.href = '/'}}>
        Back
      </button>
      
      <div className = 'searchInnerContainer'>
        <span className='searchHeaderText'>Select Search words</span>
      </div>


        <div style = {{ fontWeight: 'bold'}} className = 'searchInnerContainer'>
          {search}
        </div>

        <div className = 'searchInnerContainer' style = {{justifyContent: 'left'}}>
          <button 
          className = 'searchSaveButton' 
          onClick = {() => {
            localStorage.setItem('search', JSON.stringify({search: searchSelectBtn})); 
            window.location.href = '/'
          }}>

            Apply Changes
          </button>
        </div>
      </div>
  );
}