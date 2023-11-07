import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";
import Container from "../../Components/Container/Container";
import MovieItem from "../../Components/MovieItem/MovieItem";

const ActorsItemPage = () => {
  const [actor, setActor] = useState(null);
  const [movies, setMovies] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    axios(API_URL + `/actors/${id}`).then((res) => {
      setActor(res.data);
    });

    axios(API_URL + `/actorRelationships?actorId=${id}&_expand=movie`).then(
      (res) => {
        setMovies(res.data);
      }
    );
  }, [id]);

  const moviesByActor = movies.map((movie) => (
    <li key={movie.id}>
      <MovieItem data={movie.movie} />
    </li>
  ));

  if (!actor) {
    return <h2>Something went wrong...</h2>;
  }

  return (
    <Container>
      <div className="single-page actor">
        <div className="page-wrapper">
          <div className="image">
            <img src={actor.imageUrl} alt="actor" />
          </div>
          <div className="content">
            <h3>{actor.name}</h3>
            <h4>Born in {`${actor.born}`}</h4>
            <p>{actor.about}</p>
          </div>
        </div>
        <div className="main-features">
          <h4 className="page-title">Known for:</h4>
          <ul>{moviesByActor}</ul>
        </div>
      </div>
    </Container>
  );
};

export default ActorsItemPage;
