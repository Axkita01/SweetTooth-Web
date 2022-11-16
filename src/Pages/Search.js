import React from 'react';
import {useEffect} from 'react';


const styles = {
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
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
      height: Dimensions.get('window').height * 0.08,
      width: Dimensions.get('window').width * 0.3,
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
      fontSize: Dimensions.get('window').width * 0.05,
      textAlign: 'center',
      
      marginBottom: Dimensions.get('window').height * 0.02,
      color: 'white',
    },
  
    searchSaveBtn: {
      display: 'flex',
      position: 'relative',
      bottom: Dimensions.get('window').height * 0.3,
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 10,
      borderColor: 'pink',
      borderWidth: 1,
      height: Dimensions.get('window').height * 0.08,
      width: Dimensions.get('window').width * 0.3,
      alignItems: 'center',
      justifyContent: 'center',
  
    },
  
    backBtn: {
      position: 'absolute',
      top: Dimensions.get('window').height * 0.05,
      left: Dimensions.get('window').width * 0.05,
    },
  
    textInputContainer: {
      height: Dimensions.get('window').height * 0.05,
      width: Dimensions.get('window').width * 0.3,
      backgroundColor: 'white',
      borderRadius: 10,
      borderColor: 'pink',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    }
  }

export default function Search() {

    const [searchSelectBtn, setSearchSelectBtn] = React.useState([true, true, true, true])

    useEffect(() => {
        let search = localStorage.getItem('search')
        if (search) {
            search = JSON.parse(search)
            setSearchSelectBtn(search)
        }

        else {
            localStorage.setItem('search', JSON.stringify([true, true, true, true]))
        }
    }, [])

  return (
    <div style = {{...styles.container, width: Dimensions.get('window').width,
    height: Dimensions.get('window').height, backgroundColor: '#ffBBDD'}}>
      <button style = {styles.backBtn}>
        Back
      </button>
        <div style = {{marginTop: '11%'}}>
        Search Change
          <FlatList
          scrollEnabled = {false}
          data = {searchSelectBtn}
          height = {Dimensions.get('window').height*.3}
          renderItem = {({item, index}) => {
            return (
              <div>
                <button 
                style = {{...styles.searchBtn, backgroundColor: item ? 'pink' : 'gray'}}
                onPress = {() => {
                  let temp = searchSelectBtn.slice()
                  temp[index] = !temp[index]
                  setSearchSelectBtn(temp)
                }}>
                    {searchArr[index]}
                </button>
              </div>
            )
          }}/>
        </div>
        <div>
          <button style = {styles.searchSaveBtn} 
          onPress = {() => {
            setSearchSelect(searchSelectBtn); 
            searchChange(searchSelectBtn, places);
            AsyncStorage.setItem('search', JSON.stringify({search: searchSelectBtn})); 
            navigation.navigate('map')
          }}>
            <Text
            adjustsFontSizeToFit = {true}
            numberOfLines = {1}
            style = {{color: 'pink', fontFamily: 'Kannit', backgroundColor: 'white', textAlign: 'center', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold'}}>
            Apply Changes</Text>
          </button>
        </div>
      </div>
  );
}