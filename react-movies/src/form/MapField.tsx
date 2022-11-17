import { useFormikContext } from 'formik';
import coordinateDTO from '../utilities/coordinates.model'
import Map from '../utilities/Map'
export default function MapField(props: mapFieldProps){
 
   const {values} = useFormikContext<any>();
    function handleMapClick(cordinates:coordinateDTO){
            values[props.latField] = cordinates.lat;
            values[props.lngField] = cordinates.lng;
 }
 
    return (
    <>
    <Map
    coordinates={props.coordinates}
    handleMapClick = {handleMapClick}
    />
    </>
 )
}

interface mapFieldProps{
        coordinates: coordinateDTO[];
        latField:string;
        lngField:string;
}
MapField.defaultProps ={
    coordinates:[]
}