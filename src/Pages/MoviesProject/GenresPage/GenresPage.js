import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../config";
import { Link } from "react-router-dom";
import Container from "../../../Components/Container/Container";
import "./GenresPage.scss";

const GenresPage = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    axios(API_URL + "/genres").then((res) => {
      setGenres(res.data);
      console.log(res.data);
    });
  }, []);

  if (genres.length === 0) {
    return <h2>Loading...</h2>;
  }
  const genresList = genres.map((genre) => (
    <div className="genres-item">
      <Link to={`/movies-by-genre/${genre.id}`}>
        <ul>
          <li>{genre.title}</li>
        </ul>
      </Link>
    </div>
  ));
  return (
    <Container>
      <h2>Genres</h2>
      <div className="genres-list">{genresList}</div>
    </Container>
  );
};

export default GenresPage;
