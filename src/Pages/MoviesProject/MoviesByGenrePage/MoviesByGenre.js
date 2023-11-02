import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../config";
import { Link, useParams } from "react-router-dom";
import Container from "../../../Components/Container/Container";
import "./MoviesByGenre.scss";

const MoviesByGenre = () => {
  const [moviesByGenre, setMoviesByGenre] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    axios(API_URL + `/movies?genresIds_like=${id}&_embed=genres`).then(
      (res) => {
        setMoviesByGenre(res.data);
      }
    );
    console.log(moviesByGenre);
  }, []);

  const moviesByGenreList = moviesByGenre.map((movieByGenre) => (
    <div className="movie-by-genre-item">
      <Link to={`/movies-by-genre`}>
        <ul>
          <li>
            <img src={movieByGenre.imageUrl} alt="movie-by-genre"></img>
            {movieByGenre.title}
          </li>
        </ul>
      </Link>
    </div>
  ));
  return (
    <Container>
      <h2>Movies by Genre</h2>
      <div className="movies-by-genre">{moviesByGenreList}</div>
    </Container>
  );
};

export default MoviesByGenre;
