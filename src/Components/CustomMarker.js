import markerImg from '../assets/final.png';
import { Marker } from 'pigeon-maps';


export default function MyMarker(props) {
    return (
        <Marker>
        <div>
            <img
            src = {markerImg}
            ></img>
        </div>
        </Marker>
    )
}