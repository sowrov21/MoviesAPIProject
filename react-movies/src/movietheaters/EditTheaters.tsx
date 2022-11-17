import MovieTheaterForm from "./MovieTheaterForm";
import Map from '../utilities/Map'
import MapField from "../form/MapField";
export default function EditTheaters(){
    return(
    <>
        <h3>Edit Theaters</h3>
      <MovieTheaterForm model={{name:''}}
      onSubmit ={ async values=> {await new Promise(r => setTimeout(r,1000)); console.log(values)}}
      />

 
    </>)
}