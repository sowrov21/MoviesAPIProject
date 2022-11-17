import MovieTheaterForm from "./MovieTheaterForm";
import Map from '../utilities/Map'
export default function CreateTheaters(){
    return(
    <>
      <h3>Create Theaters</h3>

            <MovieTheaterForm model={{name:''}}
          onSubmit ={ async values=> {await new Promise(r => setTimeout(r,1000)); console.log(values)}}
          />
          
   </>)
}