import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ListaMovies from './pages/movies/ListaMovies.jsx';
import FormMovie from './pages/movies/FormMovie.jsx';
import FotoMovie from './pages/movies/FotoMovie.jsx';


import 'bootstrap/dist/css/bootstrap.min.css';
import ListaActors from './pages/actors/ListaActors.jsx';
import FormActor from './pages/actors/FormActor.jsx';
import FotoActor from './pages/actors/FotoActor.jsx';
import ListaMovieActors from './pages/movieActors/ListaMovieActors.jsx';
import FormMovieActors from './pages/movieActors/FormMovieActors.jsx';
import ListaDirectors from './pages/directors/ListaDirectors.jsx';
import FormDirector from './pages/directors/FormDirector.jsx';
import FotoDirector from './pages/directors/FotoDirector.jsx';
import ListaMoviesview from './pages/movies/ListaMoviesview.jsx';
import MovieActorsList from './pages/movieActors/MovieActorsList.jsx';
import ActorMoviesList from './pages/actors/ActorMoviesList.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/movies",
    element: <ListaMovies />
  },
  {
    path: "/movies/create",
    element: <FormMovie />
  },
  {
    path: "/movies/:id",
    element: <FormMovie />
  },
  {
    path: '/movies/:id/foto',
    element: <FotoMovie />
  },
  {
    path: "/movies/list",
    element: <ListaMoviesview />
  },
  

  
  {
    path: "/actors",
    element: <ListaActors />
  },
  {
    path: "/actors/create",
    element: <FormActor />
  },
  {
    path: "/actors/:id",
    element: <FormActor />
  },
  {
    path: '/actors/:id/foto',
    element: <FotoActor />
  },
  {
    path: "/actors/:actorId/movies",
    element: <ActorMoviesList />
  },



  {
    path: "/movieActors",
    element: <ListaMovieActors />
  },
  {
    path: "/movieActors/create",
    element: <FormMovieActors />
  },
  {
    path: "/movieActors/:id",
    element: <FormMovieActors />
  },
  {
    path: "/movies/:movieId/actors",  
    element: <MovieActorsList />       
  },


  {
    path: "/directors",
    element: <ListaDirectors />
  },
  {
    path: "/directors/create",
    element: <FormDirector />
  },
  {
    path: "/directors/:id",
    element: <FormDirector />
  },
  {
    path: '/directors/:id/foto',
    element: <FotoDirector />
  }



  
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
