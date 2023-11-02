import { Routes, Route } from "react-router-dom";
import "./App.css";
import PageHeader from "./Components/PageHeader/PageHeader";
import Container from "./Components/Container/Container";
import MoviesPage from "./Pages/MoviesProject/MoviesPage/MoviesPage";
import GenresPage from "./Pages/MoviesProject/GenresPage/GenresPage";
import ActorsPage from "./Pages/MoviesProject/ActorsPage/ActorsPage";
import DirectorsPage from "./Pages/MoviesProject/DirectorsPage/DirectorsPage";
import MoviesItemPage from "./Pages/MoviesProject/MoviesItemPage/MoviesItemPage";
import MoviesByGenre from "./Pages/MoviesProject/MoviesByGenrePage/MoviesByGenre";

function App() {
  return (
    <div>
      <PageHeader />
      <Routes>
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movie/:id" element={<MoviesItemPage />} />
        <Route path="/genres" element={<GenresPage />} />
        <Route path="/movies-by-genre/:id" element={<MoviesByGenre />} />
        <Route path="/actors" element={<ActorsPage />} />
        <Route path="/directors" element={<DirectorsPage />} />
      </Routes>
    </div>
  );
}

export default App;
