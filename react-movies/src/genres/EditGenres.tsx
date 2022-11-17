import axios, { AxiosResponse } from "axios";
import { Formik,Form } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { urlGenres } from "../endpoin";
import DisplayServerSideErrors from "../utilities/DisplayServerSideErrors";
import Loading from "../utilities/Loading";
import GenreForm from "./GenreForm";
import { genreCreationDTO, genreDTO } from "./genres.model";
import * as Yup from 'yup'
import TextField from "../form/TextField";
import Button from "../utilities/Button";
import EditEntity from "../utilities/EditEntity";

export default function EditGenres() {
	const { id }:any = useParams();

	return (
		<>
           <EditEntity<genreCreationDTO,genreDTO>
            
             url ={urlGenres} entityName ="Genres" redirectURL="/genres"
            >
            {(entity,edit) =>
            
            <GenreForm model = {entity}
            
            onSubmit = {async value => {
                await edit(value);
            }}
            />
            
            
            }
            </EditEntity> 
		</>
	);
}
