import GenericList from "../utilities/GenericList";
import Loading from "../utilities/Loading";
import IndividualMovies from "./IndividualMovies";
import { movieDTO } from "./movies.model";
import css from "./MoviesList.module.css";

export default function MoviesList(props: moviesListProps) {
	return (
		<GenericList list={props.movies} >
			<div className={css.div}>
				{props.movies?.map((movie) => (
					<IndividualMovies {...movie} key={movie.id} />
				))}
			</div>
		</GenericList>
	);
}
interface moviesListProps {
	movies?: movieDTO[];
}
