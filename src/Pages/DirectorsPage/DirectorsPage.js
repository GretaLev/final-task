import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import Container from "../../Components/Container/Container";
import "./DirectorsPage.scss";
import DirectorItem from "../../Components/DirectorItem/DirectorItem";

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
    <li>
      <DirectorItem data={director} />
    </li>
  ));
  return (
    <Container>
      <h2>Directors</h2>
      <div className="directors-list">
        <ul>{directorsList}</ul>
      </div>
    </Container>
  );
};

export default DirectorsPage;
