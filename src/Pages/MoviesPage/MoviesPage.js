import { useEffect, useState } from "react";
import Container from "../../Components/Container/Container";
import { API_URL } from "../../config";
import axios from "axios";
import MoviesItem from "../../Components/MovieItem/MovieItem";
import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const MoviesPage = () => {
  const toast = useToast();
  const [movies, setMovies] = useState([]);

  console.log(movies);

  const deleteHandler = (id) => {
    axios
      .delete(API_URL + `/movies/${id}`)
      .then((response) => {
        console.log(response);
        setMovies((prevState) => prevState.filter((movie) => movie.id !== id));
        toast({
          title: "Movie deleted",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Something went wrong",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };
  useEffect(() => {
    axios(API_URL + "/movies").then((res) => {
      setMovies(res.data);
    });
  }, []);

  if (movies.length === 0) {
    return <h2>Loading...</h2>;
  }

  const moviesList = movies.map((movie) => (
    <li key={movie.id}>
      <MoviesItem data={movie} showEdit onDelete={deleteHandler} />
    </li>
  ));

  return (
    <Container>
      <Link to={`/create-movie`}>
        <h3 className="create-button">Create New Movie</h3>
      </Link>
      <h2 className="page-title">Movies</h2>
      <div className="movies-list">
        <ul>{moviesList}</ul>
      </div>
    </Container>
  );
};

export default MoviesPage;
