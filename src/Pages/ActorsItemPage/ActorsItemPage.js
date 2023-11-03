import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";
import Container from "../../Components/Container/Container";
import "./ActorsItemPage.scss";

const ActorsItemPage = () => {
  const [actor, setActor] = useState(null);
  const [movies, setMovies] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    axios(API_URL + `/actors?id=${id}`).then((res) => {
      setActor(res.data);
    });

    axios(API_URL + `/actorRelationships?actorId=${id}&_expand=movie`).then(
      (res) => {
        setMovies(res.data);
        console.log(movies);
      }
    );
  }, [id]);

  movies.map((movie) => {
    console.log(movie.movie.imageUrl);
  }, []);

  if (!actor) {
    return <h2>Something went wrong...</h2>;
  }

  console.log(actor);
  console.log();
  console.log(actor.about);

  const year = actor.born.year;
  const month = actor.born.month;
  const day = actor.born.day;
  const country = actor.born.country;

  return (
    <Container>
      <div className="single-actor-page">
        <div className="actor-image">
          <img src={actor.imageUrl} alt="actor" />
        </div>
        <div className="actor-content">
          <h3>{actor.name}</h3>
          <h4>Born in {`${year} of ${month} ${day}`}</h4>
          <p>{actor.about}</p>
        </div>
      </div>
    </Container>
  );
};

export default ActorsItemPage;
