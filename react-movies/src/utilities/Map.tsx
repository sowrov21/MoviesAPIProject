import { MapContainer, TileLayer, useMapEvent, Marker } from "react-leaflet";
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import coordinateDTO from "./coordinates.model";
import { useState } from "react";

let defaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [16,37]
});

L.Marker.prototype.options.icon = defaultIcon;

export default function Map(props: mapProps){
    
    const [coordinates, setCoordinates] = useState<coordinateDTO[]>(props.coordinates)
    
    return(
        <MapContainer 
        center={[23.822811232748705, 90.42762087670377]} zoom={14}
         style={{height: props.height}}
        > 
            <TileLayer attribution="My Movies"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          
          <MapClick setCoordinates={coordinates =>{
               setCoordinates([coordinates]);
               props.handleMapClick(coordinates);
          }}/>
           
            {coordinates.map((coordinate,index)=> <Marker key={index} position = {[coordinate.lat,coordinate.lng]}/>
            )}
        </MapContainer>
    )
}

interface mapProps{
    height:string;
    coordinates:coordinateDTO[];
    handleMapClick(coordinates:coordinateDTO):void
}
Map.defaultProps ={
    height: "500px"
}
//Map Click Component

function MapClick(props: mapClickProps){
    useMapEvent('click', eventArgs => {
        props.setCoordinates({lat: eventArgs.latlng.lat, lng: eventArgs.latlng.lng})
    })
    return null;
}

interface mapClickProps{
    setCoordinates(coordinates: coordinateDTO):void
}