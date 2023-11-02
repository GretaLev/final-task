import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Container from "../../../Components/Container/Container";
import { API_URL } from "../../../config";
import "./ActorsPage.scss";
import ActorItem from "../../../Components/ActorItem/ActorItem";

const ActorsPage = () => {
  const [actors, setActors] = useState([]);

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
      <ActorItem data={actor} />
    </li>
  ));
  return (
    <Container>
      <h2>Actors</h2>
      <div className="actors-list">
        <ul>{actorsList}</ul>
      </div>
    </Container>
  );
};

export default ActorsPage;
