import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";
import Container from "../../Components/Container/Container";
import MoviesItem from "../../Components/MovieItem/MovieItem";

const DirectorsItemPage = () => {
  const [director, setDirector] = useState(null);
  const [movies, setMovies] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    axios(API_URL + `/directors?id=${id}`).then((res) => {
      setDirector(res.data[0]);
    });

    axios(
      API_URL + `/directorRelationships?directorId=${id}&_expand=movie`
    ).then((res) => {
      setMovies(res.data);
      console.log(movies);
    });
  }, []);

  const moviesByDirector = movies.map((movie) => (
    <li key={movie.id}>
      <MoviesItem data={movie.movie} />
    </li>
  ));

  if (!director) {
    return <h2>Something went wrong...</h2>;
  }

  return (
    <Container>
      <div className="single-page director">
        <div className="page-wrapper">
          <div className="image">
            <img src={director.imageUrl} alt="director" />
          </div>
          <div className="content">
            <h3>{director.name}</h3>
            <h4>Born in {`${director.born}`}</h4>
            <p>{director.about}</p>
          </div>
        </div>
        <div className="main-features">
          <h4 className="page-title">Known for:</h4>
          <ul>{moviesByDirector}</ul>
        </div>
      </div>
    </Container>
  );
};

export default DirectorsItemPage;
