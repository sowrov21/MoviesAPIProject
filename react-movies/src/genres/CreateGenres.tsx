import { Field, Formik, Form, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import Button from "../utilities/Button";
import * as Yup from 'yup'
import TextField from '../form/TextField';
import { Link } from 'react-router-dom';
import { genreCreationDTO } from './genres.model';
import axios from 'axios';
import {  urlGenres } from '../endpoin';
import { useState } from 'react';
import DisplayServerSideErrors from '../utilities/DisplayServerSideErrors';
import GenreForm from './GenreForm';

export default function CreateGenres(){
    const navigate = useNavigate();
    const [errors,setErrors] = useState<string[]>([])

    async function insert(genre:genreCreationDTO) {

      try{
          
        await axios.post(urlGenres,genre);
        navigate('/genres');

      }catch(error){
        //console.log(error);
        // @ts-ignore
        if(error && error.response){
          // @ts-ignore
          setErrors(error.response.data)
        }
      }
      
    } 
    return(<>
    <h3>Create Genres</h3>
       <div>
        <DisplayServerSideErrors errors={errors}/>
       </div>
       <GenreForm model={{name:''}} 

        onSubmit = { async (value) => { await new Promise(r => setTimeout(r, 1000)); await insert(value); }}/>
    </>)
}