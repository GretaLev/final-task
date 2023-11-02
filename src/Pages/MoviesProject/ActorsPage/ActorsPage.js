import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Container from "../../../Components/Container/Container";
import { API_URL } from "../../../config";
import "./ActorsPage.scss";

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
    <div className="actors-item">
      <Link to={`/actor/${actor.id}`}>
        <ul>
          <li>
            <img src={actor.imageUrl} alt="actor"></img>
            {actor.name}
          </li>
        </ul>
      </Link>
    </div>
  ));
  return (
    <Container>
      <h2>Actors</h2>
      <div className="actors-list">{actorsList}</div>
    </Container>
  );
};

export default ActorsPage;
