import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import Container from "../../Components/Container/Container";
import "./GenresPage.scss";
import GenreItem from "../../Components/GenreItem/GenreItem";
import { Link } from "react-router-dom";

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
    <li>
      <GenreItem data={genre} />
    </li>
  ));
  return (
    <Container>
      <Link to={`/create-genre`}>Create New Genre</Link>
      <h2>Genres</h2>
      <div className="genres-list">
        <ul>{genresList}</ul>
      </div>
    </Container>
  );
};

export default GenresPage;
