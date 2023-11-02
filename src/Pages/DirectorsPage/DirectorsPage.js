import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { Link } from "react-router-dom";
import Container from "../../Components/Container/Container";
import "./DirectorsPage.scss";

const DirectorsPage = () => {
  const [directors, setDirectors] = useState([]);

  useEffect(() => {
    axios(API_URL + "/directors").then((res) => {
      setDirectors(res.data);
    });
  }, []);

  if (directors.length === 0) {
    return <h2>Loading...</h2>;
  }
  const directorsList = directors.map((director) => (
    <div className="directors-item">
      <Link to={`/director/${director.id}`}>
        <ul>
          <li>
            <img src={director.imageUrl} alt="director"></img>
            {director.name}
          </li>
        </ul>
      </Link>
    </div>
  ));
  return (
    <Container>
      <h2>Directors</h2>
      <div className="directors-list">{directorsList}</div>
    </Container>
  );
};

export default DirectorsPage;
