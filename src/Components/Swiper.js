
import { useState, useRef, useMemo, memo } from 'react';
import DessertCard from '../Views/DessertCard';
import IceCream from '../assets/IceCream.png';
import Coffee from '../assets/Coffee.png';
import Bakery from '../assets/Bakery.png';
import Boba from '../assets/Boba.png';
import devPlaces from '../assets/tempMapPlaces.json'
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import { FixedSizeList as List } from 'react-window';




const card_lst = devPlaces.places[1]
const images = {
    'Boba': Boba,
    'Bakery': Bakery,
    'Coffee': Coffee,
    'Ice Cream': IceCream
}


//ADD SCROLL ENABLE BUTTON (MAKE UP AND DOWN BUTTONS DISAPPEAR WHEN SCROLLING)
//SAVE PLACE IN LIST, MOVE INDEX STATE TO PARENT
export default function SweetSwiper(props) {
    
    //properties card_lst, navigate
    
    const [index, setIndex] = useState(props.index);
    const [refresh, setRefresh] = useState(true);
    var list = useRef();

    const renderCard = (item, index) => {
        return (
            <SwiperSlide style = {{background: 'transparent', overflow: 'visible'}}>
            <DessertCard
                   
                    images = {images}
                    location = {item.geometry.location}
                    address = {item.formatted_address}
                    navigation = {props.navigation}
                    //change length to props.card_lst.length
                    length = {card_lst.length}
                    idx = {index}
                    types = {item.type}
                    rating = {item.rating}
                    num_ratings = {item.user_ratings_total}
                    name = {item.name}
                    scrollUp = {() => {
                        if (index > 0) {
                            list.current.scrollToIndex({index: index - 1, animated: true});
                            setIndex(index - 1);
                        }
                    }}
                    scrollDown = {() => {
                        if (index < props.card_lst.length - 1) {
                            list.current.scrollToIndex({index: index + 1, animated: true});
                            setIndex(index + 1);
                        }
                    }}
                    key = {item.place_id}
                    reviews = {item.reviews}
                    navigatefunc = {() => {
                    props.navigate([item.geometry.location.lat, item.geometry.location.lng])
                }}
                    />
                    </SwiperSlide>
        
        
        )
    }
    
    const memoizedCard = useMemo(() => renderCard, [props.card_lst, props.scrollable])
    
    //change back to props.card_lst, and optimize cards to limit rerenders
    const cards =  useMemo(() => 
    card_lst.map((item, index) => {return (renderCard(item, index))}),
    [props.card_lst])
    
    return (
        <div  style = {{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'transparent', position: 'absolute', right: '30vw', top: '21%'}}>
            <Swiper
            onInit={(ev) => {
                list.current = ev;
            }}
            lazy = {true}
            initialSlide = {index}
            rewind = {true}
            spaceBetween={50}
            slidesPerView={1}
            style = {{width: '25%', height: '40%',background: 'transparent'}}
            scrollbar={{ draggable: true }}
            >
            <List
            itemCount={props.card_lst.length}
            >
                {cards}
            </List>
            </Swiper>
        <div style = {{width: '25%',display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <button 
        onClick = {() => {list.current.slidePrev(1000, false)}}
        style = {{height: '3vw', width: '2vw', fontSize: '1vw', position: 'relative', zIndex: 1, padding: 0, margin: 0}}
        >
            {'\u25C0'}
        </button>
        <div style = {{width: '10%'}}/>
        <button 
        style = {{height: '3vw', width: '2vw', fontSize: '1vw', position: 'relative', zIndex: 1, padding: 0, margin: 0}}
        onClick = {() => {list.current.slideNext(1000, false)}}
        >
            {'\u25B6'}
        </button>
        
        </div>
            </div>
    )
}