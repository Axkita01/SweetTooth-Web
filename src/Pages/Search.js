import React from 'react';
import {useEffect} from 'react';
import '../Styles/Search.css';

const searchArr = ['Coffee', 'Boba', 'Ice Cream', 'Bakery']

export default function Search(props) {

    const [searchSelectBtn, setSearchSelectBtn] = React.useState(props.selected)

    useEffect(() => {
        let search = localStorage.getItem('search')
        if (search) {
            search = JSON.parse(search)
            setSearchSelectBtn(search.search)
        }

        else {
            localStorage.setItem('search', JSON.stringify([true, true, true, true]))
        }
    }, [])

    const search = searchSelectBtn.map((item, index) => {
        return (
            
              <button 
              className='searchBtn'
              style = {{backgroundColor: item ? 'pink' : 'gray'}}
              onClick = {() => {
                let temp = searchSelectBtn.slice()
                temp[index] = !temp[index]
                setSearchSelectBtn(temp)
              }}>
                  {searchArr[index]}
              </button>
            
          )

    })
  return (
    <div className = 'searchContainer'>
      <button className='backBtn' onClick = {() => {window.location.href = '/'}}>
        Back
      </button>

        <div style = {{ fontWeight: 'bold'}} className = 'searchInnerContainer'>
        Search Change
          {search}
        </div>

        <div className = 'searchInnerContainer'>
          <button 
          className = 'searchSaveButton' 
          onClick = {() => {
            console.log('btn', searchSelectBtn)
            localStorage.setItem('search', JSON.stringify({search: searchSelectBtn})); 
            window.location.href = '/'
          }}>

            Apply Changes
          </button>
        </div>
      </div>
  );
}