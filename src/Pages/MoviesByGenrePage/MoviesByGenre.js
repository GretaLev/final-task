import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { useParams } from "react-router-dom";
import Container from "../../Components/Container/Container";
import MoviesItem from "../../Components/MovieItem/MovieItem";

const MoviesByGenre = () => {
  const [moviesByGenre, setMoviesByGenre] = useState([]);
  const [genre, setGenre] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    axios(API_URL + `/movieRelationships?genreId=${id}&_expand=movie`).then(
      (res) => {
        setMoviesByGenre(res.data);
      }
    );

    axios(API_URL + `/genres?id=${id}`).then((res) => {
      setGenre(res.data);
    });
  }, [id]);

  const genretitle = genre ? genre[0].title : "";

  const moviesByGenreList = moviesByGenre.map((movieByGenre) => (
    <li>
      <MoviesItem data={movieByGenre.movie} />
    </li>
  ));

  return (
    <Container>
      <h2>{genretitle}</h2>
      <div className="movies-by-genre">
        <ul>{moviesByGenreList}</ul>
      </div>
    </Container>
  );
};

export default MoviesByGenre;
