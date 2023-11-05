import { useEffect, useState } from "react";
import axios from "axios";
import Container from "../../Components/Container/Container";
import { API_URL } from "../../config";
import "./ActorsPage.scss";
import ActorItem from "../../Components/ActorItem/ActorItem";
import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const ActorsPage = () => {
  const toast = useToast();
  const [actors, setActors] = useState([]);

  const deleteHandler = (id) => {
    axios
      .delete(API_URL + `/actors/${id}`)
      .then((response) => {
        setActors((prevState) => prevState.filter((actor) => actor.id !== id));
        toast({
          title: "Actor deleted",
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
    axios(API_URL + "/actors").then((res) => {
      setActors(res.data);
    });
  }, []);

  if (actors.length === 0) {
    return <h2>Loading...</h2>;
  }
  const actorsList = actors.map((actor) => (
    <li>
      <ActorItem data={actor} showEdit onDelete={deleteHandler} />
    </li>
  ));
  return (
    <Container>
      <Link to={`/create-actor`}>Create New Actor</Link>
      <h2>Actors</h2>
      <div className="actors-list">
        <ul>{actorsList}</ul>
      </div>
    </Container>
  );
};

export default ActorsPage;
