import { Routes, Route } from "react-router-dom";
import "./App.css";
import PageHeader from "./Components/PageHeader/PageHeader";
import MoviesPage from "./Pages/MoviesPage/MoviesPage";
import MoviesItemPage from "./Pages/MoviesItemPage/MoviesItemPage";
import GenresPage from "./Pages/GenresPage/GenresPage";
import MoviesByGenre from "./Pages/MoviesByGenrePage/MoviesByGenre";
import ActorsPage from "./Pages/ActorsPage/ActorsPage";
import ActorsItemPage from "./Pages/ActorsItemPage/ActorsItemPage";
import DirectorsPage from "./Pages/DirectorsPage/DirectorsPage";
import DirectorsItemPage from "./Pages/DirectorsItemPage/DirectorsItemPage";
import HomePage from "./Pages/HomePage/HomePage";
import CreateMoviePage from "./Pages/CreateMoviePage/CreateMoviePage";
import CreateGenrePage from "./Pages/CreateGenrePage/CreateGenrePage";
import CreateActorPage from "./Pages/CreateActorPage/CreateActorPage";
import CreateDirectorPage from "./Pages/CreateDirectorPage/CreateDirectorPage";

function App() {
  return (
    <div>
      <PageHeader />
      <Routes>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movie/:id" element={<MoviesItemPage />} />
        <Route path="/create-movie" element={<CreateMoviePage />} />
        <Route path="/genres" element={<GenresPage />} />
        <Route path="/movies-by-genre/:id" element={<MoviesByGenre />} />
        <Route path="/create-genre" element={<CreateGenrePage />} />
        <Route path="/actors" element={<ActorsPage />} />
        <Route path="/actor/:id" element={<ActorsItemPage />} />
        <Route path="/create-actor" element={<CreateActorPage />} />
        <Route path="/directors" element={<DirectorsPage />} />
        <Route path="/director/:id" element={<DirectorsItemPage />} />
        <Route path="/create-director" element={<CreateDirectorPage />} />
      </Routes>
    </div>
  );
}

export default App;
