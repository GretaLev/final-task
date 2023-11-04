import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../config";
import axios from "axios";
import Container from "../../Components/Container/Container";
import "./MoviesItemPage.scss";
import ActorItem from "../../Components/ActorItem/ActorItem";
import DirectorItem from "../../Components/DirectorItem/DirectorItem";

const MoviesItemPage = () => {
  const [movie, setMovie] = useState([]);
  const [actors, setActors] = useState([]);
  const [directors, setDirectors] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    axios(API_URL + `/movies/${id}`).then((res) => {
      setMovie(res.data);
      console.log(res.data);
    });

    axios(API_URL + `/actorRelationships?movieId=${id}&_expand=actor`).then(
      (res) => {
        setActors(res.data);
        console.log(res.data);
      }
    );

    axios(
      API_URL + `/directorRelationships?movieId=${id}&_expand=director`
    ).then((res) => {
      setDirectors(res.data);
    });
  }, [id]);

  const movieActors = actors.map((actor) => (
    <li>
      <ActorItem data={actor.actor} />
    </li>
  ));

  const movieDirector = directors.map((director) => (
    <li>
      <DirectorItem data={director.director} />
    </li>
  ));

  if (!movie) {
    return <h2>Something went wrong...</h2>;
  }

  return (
    <Container>
      <div className="single-movie-page">
        <div className="movie-info-wrapper">
          <div className="movie-image">
            <img src={movie.imageUrl} alt="movie" />
          </div>
          <div className="movie-content">
            <h3>{movie.title}</h3>
            <h4>(released in {movie.releaseDate})</h4>
            <p>{movie.description}</p>
            <p>Rating: {movie.rate}</p>
            <p></p>
          </div>
        </div>
        <div className="main-actors">
          <h4>Main actors:</h4>
          <ul>{movieActors}</ul>
        </div>
        <div className="movie-director">
          <h4>Movie directed by:</h4>
          <ul>{movieDirector}</ul>
        </div>
      </div>
    </Container>
  );
};

export default MoviesItemPage;
