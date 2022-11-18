import React from 'react';
import {useEffect} from 'react';


const styles = {
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      width: '100vw',
      height: '100vh',
    },

    innerContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '30%',
    },
  
    input: {
      position: 'fixed',
      top: '9%',
      left: 0,
      zIndex: 1,
      borderWidth: 1,
      padding: 0,
      margin: 0,
      width: '80%',
      height: '5%',
      backgroundColor: 'white',
      borderRadius: 10,
    },
  
    searchBtn: {
      //Background color logic inlined
      display: 'flex',
      height: '50%',
      width: '30%',
      margin: 10,
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      borderColor: 'white',
      borderWidth: 1,
    },
  
    headerSearch: {
      fontFamily: 'Kannit',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '5%',
      textAlign: 'center',
      marginBottom: '2%',
      color: 'white',
    },
  
    searchSaveBtn: {
      display: 'flex',
      position: 'relative',
      bottom: '30%',
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 10,
      borderColor: 'pink',
      borderWidth: 1,
      height: '30%',
      width: '30%',
      alignItems: 'center',
      justifyContent: 'center',
  
    },
  
    backBtn: {
      position: 'absolute',
      top: '5%',
      left: '5%',
    },
  
    textInputContainer: {
      height: '5%',
      width: '30%',
      backgroundColor: 'white',
      borderRadius: 10,
      borderColor: 'pink',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    }
  }

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
              style = {{...styles.searchBtn, backgroundColor: item ? 'pink' : 'gray'}}
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
    <div style = {{...styles.container, backgroundColor: '#ffBBDD'}}>
      <button style = {styles.backBtn} onClick = {() => {window.location.href = '/'}}>
        Back
      </button>

        <div style = {{...styles.innerContainer, fontWeight: 'bold'}}>
        Search Change
          {search}
        </div>

        <div style = {styles.innerContainer}>
          <button style = {styles.searchSaveBtn} 
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