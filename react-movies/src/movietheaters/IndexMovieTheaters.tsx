import { Link } from "react-router-dom";

export default function IndexMovieTheaters(){
    return (<>
    <h3>All Movie Theaters</h3>
    <Link className="btn btn-primary btn-sm" to='/movietheaters/create'> Create Genres</Link>
    </>)
}