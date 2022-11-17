// @ts-nocheck
import { useState } from "react";
import DisplayServerSideErrors from "../utilities/DisplayServerSideErrors";
import ActorForm from "./ActorForm";
import { actorCreationDTO } from "./actors.model";
import {convertActorToFormData} from '../utilities/formDataUtils'
import axios from "axios";
import { urlActors } from "../endpoin";
import { useNavigate } from "react-router-dom";
export default function CreateActors(){

  const [errors,setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  async function create(actor:actorCreationDTO) {

    try{
      const formData = convertActorToFormData(actor);

        await axios({
          method: 'post',
          url: urlActors,
          data: formData,
          headers: {'Content-Type': 'multipart/form-data'}
        });

        navigate('/actors');

    }catch(error){
      if(error && error.response){
        setErrors(error.response.data);
      }
    }
    
  }

    return(<>
    <h3>Create Actors</h3>
    <DisplayServerSideErrors errors={errors}/>
    <ActorForm model={{name: '', dateOfBirth: undefined}} 
      onSubmit ={ async values=> {await create(values)}}
    />
     
    </>)
}