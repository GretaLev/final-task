import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import Container from "../../Components/Container/Container";
import "./GenresPage.scss";
import GenreItem from "../../Components/GenreItem/GenreItem";
import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const GenresPage = () => {
  const toast = useToast();
  const [genres, setGenres] = useState([]);

  const deleteHandler = (id) => {
    axios
      .delete(API_URL + `/genres/${id}`)
      .then((response) => {
        setGenres((prevState) => prevState.filter((genre) => genre.id !== id));
        toast({
          title: "Genre deleted",
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
      <GenreItem data={genre} onDelete={deleteHandler} />
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
