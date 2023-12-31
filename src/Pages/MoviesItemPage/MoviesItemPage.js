import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../config";
import axios from "axios";
import Container from "../../Components/Container/Container";
import ActorItem from "../../Components/ActorItem/ActorItem";
import DirectorItem from "../../Components/DirectorItem/DirectorItem";
import GenreItem from "../../Components/GenreItem/GenreItem";

const MoviesItemPage = () => {
  const [movie, setMovie] = useState([]);
  const [actors, setActors] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [genres, setGenres] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    axios(API_URL + `/movies/${id}`).then((res) => {
      setMovie(res.data);
    });

    axios(API_URL + `/movieRelationships?movieId=${id}&_expand=genre`).then(
      (res) => {
        setGenres(res.data);
      }
    );

    axios(API_URL + `/actorRelationships?movieId=${id}&_expand=actor`).then(
      (res) => {
        setActors(res.data);
      }
    );

    axios(
      API_URL + `/directorRelationships?movieId=${id}&_expand=director`
    ).then((res) => {
      setDirectors(res.data);
    });
  }, [id]);

  const movieItemGenres = genres.map((genre) => (
    <li key={genre.id}>
      <GenreItem data={genre.genre} />
    </li>
  ));

  const movieActors = actors.map((actor) => (
    <li key={actor.id}>
      <ActorItem data={actor.actor} />
    </li>
  ));

  const movieDirector = directors.map((director) => (
    <li key={director.id}>
      <DirectorItem data={director.director} />
    </li>
  ));

  if (!movie) {
    return <h2>Something went wrong...</h2>;
  }

  return (
    <Container>
      <div className="single-page movie">
        <div className="page-wrapper">
          <div className="image">
            <img src={movie.imageUrl} alt="movie" />
          </div>
          <div className="content">
            <h3>{movie.title}</h3>
            <h4>(released in {movie.releaseDate})</h4>
            <p>{movie.description}</p>
            <p>Rating: {movie.rate}</p>
            <div className="movie-genres">
              <ul>{movieItemGenres}</ul>
            </div>
            <p></p>
          </div>
        </div>
        <div className="main-features">
          <h4 className="page-title">Main actors:</h4>
          <ul>{movieActors}</ul>
        </div>
        <div className="main-features">
          <h4 className="page-title">Movie directed by:</h4>
          <ul>{movieDirector}</ul>
        </div>
      </div>
    </Container>
  );
};

export default MoviesItemPage;
