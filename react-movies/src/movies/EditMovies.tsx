import { genreDTO } from "../genres/genres.model";
import { movieTheaterDTO } from "../movietheaters/movieTheater.model";
import MovieForm from "./MovieForm";

export default function EditMovies(){
    const nonSelectedGenres: genreDTO[] = [{id:1,name:"Action"},{id:2,name:"Comedy"}];
    const nonSelectedMovieTheaters: movieTheaterDTO[] = [{id:1,name:"Blockbuster"},{id:2,name:"Cineplex"}];
    return(<>
    <h3>Edit Movies</h3>
    <MovieForm model={{title: '', inTheaters: false, trailer: ''}}
    onSubmit = {value => console.log(value)}
    nonSelectedGenres ={nonSelectedGenres}
    selectedGenres ={[]}
    nonSelectedMovieTheaters={nonSelectedMovieTheaters}
    selectedMovieTheaters ={[]}
    selectedActors ={[]}
    />
    </>)
}