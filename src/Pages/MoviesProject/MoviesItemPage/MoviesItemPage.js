import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../../config";
import axios from "axios";
import Container from "../../../Components/Container/Container";
import "./MoviesItemPage.scss";

const MoviesItemPage = () => {
  const [movie, setMovie] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    axios(API_URL + `/movies?id=${id}&_embed=genres`).then((res) => {
      setMovie(res.data[0]);
    });
  }, []);

  if (!movie) {
    return <h2>Something went wrong...</h2>;
  }

  console.log(movie);

  console.log(movie.rate);

  return (
    <Container>
      <div className="single-movie-page">
        <div className="movie-image">
          <img src={movie.imageUrl} alt="movie" />
        </div>
        <div className="movie-content">
          <h3>{movie.title}</h3>
          <h4>(released in {movie.releaseDate})</h4>
          <p>{movie.description}</p>
          <h4>Main actors:</h4>
        </div>
      </div>
    </Container>
  );
};

export default MoviesItemPage;
