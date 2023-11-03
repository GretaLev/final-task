import { useEffect, useState } from "react";
import Container from "../../Components/Container/Container";
import { API_URL } from "../../config";
import axios from "axios";
import "./MoviesPage.scss";
import MoviesItem from "../../Components/MovieItem/MovieItem";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios(API_URL + "/movies").then((res) => {
      setMovies(res.data);
    });
  }, []);

  if (movies.length === 0) {
    return <h2>Loading...</h2>;
  }

  const moviesList = movies.map((movie) => (
    <li>
      <MoviesItem data={movie} />
    </li>
  ));

  return (
    <Container>
      <h2>Movies</h2>
      <div className="movies-list">
        <ul>{moviesList}</ul>
      </div>
    </Container>
  );
};

export default MoviesPage;
