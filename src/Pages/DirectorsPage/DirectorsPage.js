import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import Container from "../../Components/Container/Container";

import DirectorItem from "../../Components/DirectorItem/DirectorItem";
import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const DirectorsPage = () => {
  const toast = useToast();
  const [directors, setDirectors] = useState([]);

  const deleteHandler = (id) => {
    axios
      .delete(API_URL + `/directors/${id}`)
      .then((response) => {
        setDirectors((prevState) =>
          prevState.filter((director) => director.id !== id)
        );
        toast({
          title: "Director deleted",
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
    axios(API_URL + "/directors").then((res) => {
      setDirectors(res.data);
    });
  }, []);

  if (directors.length === 0) {
    return <h2>Loading...</h2>;
  }

  const directorsList = directors.map((director) => (
    <li>
      <DirectorItem data={director} showEdit onDelete={deleteHandler} />
    </li>
  ));

  return (
    <Container>
      <Link to={`/create-director`}>
        <h3 className="create-button">Create New Director</h3>
      </Link>
      <h2 className="page-title">Directors</h2>
      <div className="directors-list">
        <ul>{directorsList}</ul>
      </div>
    </Container>
  );
};

export default DirectorsPage;
