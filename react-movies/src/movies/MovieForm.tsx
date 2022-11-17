import { Formik , Form, FormikHelpers} from "formik";
import { movieCreationDTO, movieDTO } from "./movies.model";
import * as Yup from 'yup';
import Button from "../utilities/Button";
import { Link } from "react-router-dom";
import TextField from "../form/TextField";
import DateField from "../form/DateField";
import ImageField from "../form/ImageField";
import CheckboxField from "../form/CheckboxField";
import MultipleSelector, { multipleSelectorModel } from "../form/MultipleSelector";
import { useState } from "react";
import { genreDTO } from "../genres/genres.model";
import { movieTheaterDTO } from "../movietheaters/movieTheater.model";
import TypeAheadActors from "../form/TypeAheadActors";
import { actorMovieDTO } from "../actors/actors.model";
export default function MovieForm(props: movieFormProps){

    const [selectedGenres,setSelectedGenres] = useState(mapToModel(props.selectedGenres));
    const [nonSelectedGenres,setNonSelectedGenres] = useState(mapToModel(props.nonSelectedGenres));

    const [selectedMovieTheaters,setSelectedMovieTheaters] = useState(mapToModel(props.selectedMovieTheaters));
    const [nonSelectedMovieTheaters,setNonSelectedMovieTheaters] = useState(mapToModel(props.nonSelectedMovieTheaters));
     
    const [selectedActors, setSelectedActors] = useState(props.selectedActors);

    function mapToModel(items: {id:number, name: string}[]):multipleSelectorModel[]{
        return items.map(item => {
            return {key: item.id, value: item.name}
        })
    }

    return(
        <Formik
        initialValues={props.model}
        onSubmit ={(values,actions)=>{
            values.genresIds = selectedGenres.map(item => item.key);
            values.movieTheatersIds = selectedMovieTheaters.map(item => item.key);
            values.actors = selectedActors;
            props.onSubmit(values,actions)
        }}
        validationSchema = {Yup.object({
            title: Yup.string().required("The title is required").firstLetterUppercase()
        })}
        >

            {(formikProps)=>(

                <Form>
                   
                   <TextField fieldName="title" displayName="Title"/>
                   <CheckboxField displayName="In Theaters" fieldName="inTheaters"/>
                   <TextField fieldName="trailer" displayName="Trailer"/>
                   <DateField fieldName="releaseDate" displayname="Release Date"/>
                   <ImageField displayName="Poster" field="poster" imageURL={props.model.posterURL}/>

                    <MultipleSelector
                    displayName="Genres"
                    nonSelected={nonSelectedGenres}
                    selected ={selectedGenres}
                    onChange = {(selected, nonSelected) => {
                        setSelectedGenres(selected);
                        setNonSelectedGenres(nonSelected);
                    }}
                    />

                    <MultipleSelector
                    displayName="Movie Theaters"
                    nonSelected={nonSelectedMovieTheaters}
                    selected ={selectedMovieTheaters}
                    onChange = {(selected, nonSelected) => {
                        setSelectedMovieTheaters(selected);
                        setNonSelectedMovieTheaters(nonSelected);
                    }}
                    />

                    <TypeAheadActors displayName="Actors" actors={selectedActors}
                    
                    onAdd = {actors => {

                        setSelectedActors(actors);
                    }}
                    onRemove ={actor=>{
                        const actors = selectedActors.filter(x=> x !==actor);
                        setSelectedActors(actors);
                    }}
                    listUI ={(actor:actorMovieDTO) => 
                    <>
                        {actor.name} / <input type="text" placeholder="Character" 
                        
                        value = {actor.character}
                        onChange ={ e => {
                            const index = selectedActors.findIndex(x=>x.id===actor.id);
                            const actors = [...selectedActors];
                            actors[index].character = e.currentTarget.value;
                            setSelectedActors(actors);
                        }}
                        />
                        
                    </>
                }
                    />

                    <Button className="btn btn-primary" disabled={formikProps.isSubmitting} type ="submit" >Save</Button>
                    <Link className='btn btn-secondary' to="/actors"> Cancel</Link>
                </Form>
            )}
        
        </Formik>

    )
}

interface movieFormProps{
model: movieCreationDTO;
onSubmit(values:movieCreationDTO, action: FormikHelpers<movieCreationDTO>):void;
selectedGenres:genreDTO[];
nonSelectedGenres:genreDTO[];
selectedMovieTheaters:movieTheaterDTO[];
nonSelectedMovieTheaters:movieTheaterDTO[];
selectedActors: actorMovieDTO[];

}