import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";
import Container from "../../Components/Container/Container";
import "./ActorsItemPage.scss";
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
    <li>
      <MovieItem data={movie.movie} />
    </li>
  ));

  if (!actor) {
    return <h2>Something went wrong...</h2>;
  }

  const { year, month, day, country } = actor.born;

  return (
    <Container>
      <div className="single-actor-page">
        <div className="actor-info-wrapper">
          <div className="actor-image">
            <img src={actor.imageUrl} alt="actor" />
          </div>
          <div className="actor-content">
            <h3>{actor.name}</h3>
            <h4>Born in {`${year} ${month} ${day}`}</h4>
            <p>{actor.about}</p>
          </div>
        </div>
        <div className="movies-known-for">
          <h4>Known for:</h4>
          <ul>{moviesByActor}</ul>
        </div>
      </div>
    </Container>
  );
};

export default ActorsItemPage;
