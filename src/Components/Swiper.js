
import { useRef, useMemo, useEffect } from 'react';
import DessertCard from '../Views/DessertCard';
import IceCream from '../assets/IceCream.png';
import Coffee from '../assets/Coffee.png';
import Bakery from '../assets/Bakery.png';
import Boba from '../assets/Boba.png';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import { FixedSizeList as List } from 'react-window';
import '../Styles/SweetSwiper.css'

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
    
    var list = useRef();

    const renderCard = (item, index) => {
        
        return (
            <SwiperSlide style = {{background: 'transparent', overflow: 'visible'}} key = {index}>
            <DessertCard
                    images = {images}
                    url = {item.url}
                    is_closed = {item.is_closed}
                    place_img = {item.image_url}
                    open = {item.is_closed}
                    location = {item.coordinates}
                    address = {`${item.location.address1} ${item.location.city}, ${item.location.state} ${item.location.zip_ode}`}
                    navigation = {props.navigation}
                    //change length to props.card_lst.length
                    length = {props.card_lst.length}
                    idx = {index}
                    types = {item.type}
                    rating = {item.rating}
                    num_ratings = {item.review_count}
                    name = {item.name}
                    key = {item.id}
                    //reviews = {item.reviews}
                    navigatefunc = {() => {
                    props.navigate([item.coordinates.latitude, item.coordinates.longitude])
                }}
                    />
            </SwiperSlide>
        
        )
    }
    

    //change back to props.card_lst, and optimize cards to limit rerenders
    const cards =  useMemo(() => 
                    props.card_lst.map(
                        (item, index) => {
                            return (renderCard(item, index))
                        }),
            [props.card_lst])
    
    useEffect(() => {
        list.current.slideTo(props.index)
    }, 
    [props.index])
    if (props.card_lst.length == 0) {
        return <div style = {{position: 'absolute', top: 0}}>No Places</div>
    }
    return (
        <div  className = 'swiperContainer' >
            <Swiper
            onInit={(ev) => {
                list.current = ev;
            }}
            lazy = {true}
            className = 'SweetSwiper'
            initialSlide = {props.index}
            rewind = {true}
            spaceBetween={50}
            slidesPerView={1}
            scrollbar={{ draggable: true }}
            >
            <List
            itemCount={props.card_lst.length}
            >
                {cards}
            </List>
            </Swiper>
        <div className = 'swiperButtonContainer'>
        <button 
        onClick = {() => {list.current.slidePrev(1000, false)}}
        className = 'swiperButton'
        >
            {'\u25C0'}
        </button>
        <div style = {{width: '10%'}}/>
        <button 
        className = 'swiperButton'
        onClick = {() => {list.current.slideNext(1000, false)}}
        >
            {'\u25B6'}
        </button>
        
        </div>
            </div>
    )
}