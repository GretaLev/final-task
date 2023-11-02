import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";
import Container from "../../Components/Container/Container";
import "./DirectorsItemPage.scss";

const DirectorsItemPage = () => {
  const [director, setDirector] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    axios(API_URL + `/directors?id=${id}`).then((res) => {
      setDirector(res.data[0]);
    });
  }, []);

  if (!director) {
    return <h2>Something went wrong...</h2>;
  }

  console.log(director);

  const year = director.born.year;
  const month = director.born.month;
  const day = director.born.day;
  const country = director.born.country;

  return (
    <Container>
      <div className="single-director-page">
        <div className="director-image">
          <img src={director.imageUrl} alt="director" />
        </div>
        <div className="director-content">
          <h3>{director.name}</h3>
          <h4>Born in {`${year} of ${month} ${day}`}</h4>
          <p>{director.about}</p>
        </div>
      </div>
    </Container>
  );
};

export default DirectorsItemPage;
