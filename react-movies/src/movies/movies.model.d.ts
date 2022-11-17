import { actorMovieDTO } from "../actors/actors.model";

export interface movieDTO{
  id:number,
  title:string,
  poster:string  
}

export interface landingPageMoviesDTO{
  inTheater?:movieDTO[];
  upcomming?:movieDTO[];
}

export interface movieCreationDTO{
  title: string,
  inTheaters: boolean;
  trailer: string;
  releaseDate?: Date;
  poster?: File;
  posterURL?: string; 
  genresIds?: number[];
  movieTheatersIds?:number[];
  actors?:actorMovieDTO[];

}