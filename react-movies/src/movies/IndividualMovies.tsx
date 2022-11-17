import { movieDTO } from "./movies.model";
import css from './IndividualMovies.module.css'

export default function IndividualMovies(props: movieDTO) {
	const buildLink = `movies/${props.id}`;

	return (
		<>
			<div className={css.div}>
				<a href={buildLink}><img src={props.poster} alt="poster" /></a>
				<p>
					<a href={buildLink}>{props.title}</a>
				</p>
			</div>
		</>
	);
}
