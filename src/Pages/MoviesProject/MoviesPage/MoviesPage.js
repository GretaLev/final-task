import { useEffect, useState } from "react";
import Container from "../../../Components/Container/Container";
import { API_URL } from "../../../config";
import axios from "axios";
import "./MoviesPage.scss";
import MoviesItemPage from "../MoviesItemPage/MoviesItemPage";
import { Link } from "react-router-dom";

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
    <div className="movies-item">
      <Link to={`/movie/${movie.id}`}>
        <img key={movie.id} src={movie.imageUrl} alt="movie"></img>
      </Link>
    </div>
  ));
  return (
    <Container>
      <h2>Movies</h2>
      <div className="movies-list">{moviesList}</div>
    </Container>
  );
};

export default MoviesPage;
