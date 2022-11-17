import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { landingPageMoviesDTO, movieDTO } from './movies/movies.model';
import MoviesList from './movies/MoviesList';
import Manu from './Manu';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IndexGenres from './genres/IndexGenres';
import CreateGenres from './genres/CreateGenres';
import EditGenres from './genres/EditGenres';
import IndexActors from './actors/IndexActors';
import CreateActors from './actors/CreateActors';
import EditActors from './actors/EditActor';
import IndexMovieTheaters from './movietheaters/IndexMovieTheaters';
import CreateTheaters from './movietheaters/CreateTheaters';
import EditTheaters from './movietheaters/EditTheaters';
import CreateMovies from './movies/CreateMovies';
import EditMovies from './movies/EditMovies';
import FilterMovies from './movies/FilterMovies';
import NotFound from './utilities/NotFound';
import configCustomValidation from './CustomValidation';
import { date } from 'yup';
import Authorized from './auth/Authorized';
import { claim } from './auth/auth.models';
import AuthenicationContext from './auth/AuthencationContext';
import Register from './auth/Register';
import Login from './auth/Login';
import { getClaims } from './auth/handleJWT';

configCustomValidation();
function App() {

  const [movies,moviesUpdate] = useState<landingPageMoviesDTO>({});

  const [claims, setClaims] = useState<claim[]>([]);

  useEffect(()=>{

    setClaims(getClaims());

  },[]);
useEffect(()=>{
   let setTimeId = setTimeout(() => {
    moviesUpdate({
       inTheater:[{
        id:1,
        title:"Spider-Man: No Way Home",
        poster:"https://upload.wikimedia.org/wikipedia/en/0/00/Spider-Man_No_Way_Home_poster.jpg"
      },
      {
        id:2,
        title:"Luca",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/3/33/Luca_%282021_film%29.png/220px-Luca_%282021_film%29.png"
      },
      {
        id:3,
        title:"Wish Dragon",
        poster:"https://upload.wikimedia.org/wikipedia/en/thumb/d/d7/Wish_Dragon.png/220px-Wish_Dragon.png"
      },
      ],
      upcomming: [{
        id:1,
        title:"Soul",
        poster:"https://upload.wikimedia.org/wikipedia/en/3/39/Soul_%282020_film%29_poster.jpg"
      },
      {
        id:2,
        title:"How to Train Your Dragon 2",
        poster:"https://upload.wikimedia.org/wikipedia/en/a/af/How_to_Train_Your_Dragon_2_poster.jpg"
      }
      ]
    })
   }, 1000);

   return ()=> clearTimeout(setTimeId)
})





function isAdmin(){
  return claims.findIndex(claim=>claim.name === 'role' && claim.value === 'admin') > -1;
}



  return (
  <BrowserRouter>

  <AuthenicationContext.Provider value = {{claims, update: setClaims}}>

  <Manu/>
    <div className='container'>

        <Routes>

        //Landing page Route

        <Route path="/" element={<>

        <Authorized 
          authorized={<h6 className="text-success mt-3" >{`You Logged in as Admin..!`}</h6>}
          role = "admin"
        />
         <Authorized 
          authorized={<h6 className="text-success mt-3" > {`You Logged in as User..!`}</h6>}
          role = "user"
        />
          <h3>In Theater</h3>
          <MoviesList movies={movies.inTheater}/>
            <h3>Upcoming Releases</h3>
          <MoviesList movies={movies.upcomming}/></>} /> 
        
        //Register
          <Route path='/register' element = {<Register/>}/>
        
        //Login
          <Route path='/login' element = {<Login/>}/>
        
        //Genres Routes

        {!isAdmin()? <>Your Not allowed to see</> : 
        <>
        <Route path="/genres" element={<IndexGenres />} />
        <Route path="/genres/create" element={<CreateGenres />} /> 
        <Route path="/genres/edit/:id" element={<EditGenres />} />

        //Actors Routes

        <Route path="/actors" element={<IndexActors />} /> 
        <Route path="/actors/create" element={<CreateActors />} /> 
        <Route path="/actors/edit/:id" element={<EditActors />} /> 

        //Movietheaters Routes

        <Route path="/movietheaters" element={<IndexMovieTheaters />} /> 
        <Route path="/movietheaters/create" element={<CreateTheaters />} /> 
        <Route path="/movietheaters/edit/:id" element={<EditTheaters />} /> 

        //Movies Routes

        <Route path="/movies/create" element={<CreateMovies />} /> 
        <Route path="/movies/edit/:id" element={<EditMovies />} /> 
         
        </> }

        <Route path="/movies/filter" element={<FilterMovies />} /> 

        //If not found 

        <Route path="*" element={<NotFound/>} /> 

        </Routes>


    </div>
    <footer className='bd-footer py-5 mt-5 bg-light'>
          <div className='container'>
             My Movies By Minhaz in {new Date().getFullYear()}
          </div>
    </footer>

    
  </AuthenicationContext.Provider>
  
  </BrowserRouter>


  );
}

export default App;
