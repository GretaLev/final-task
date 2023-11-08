import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { Link, useParams } from "react-router-dom";
import Container from "../../Components/Container/Container";
import SearchBar from "../../Components/SearchBar/SearchBar";
import SearchResultsList from "../../Components/SearchResultsList/SearchResultsList";

const HomePage = () => {
  const [homePageGenres, setHomePageGenres] = useState([]);
  const [homePageMovies, setHomePageMovies] = useState([]);
  const [homePageActors, setHomePageActors] = useState([]);
  const [homePageDirectors, sethomePageDirectors] = useState([]);

  console.log(homePageGenres);

  const { id } = useParams();

  useEffect(() => {
    axios(API_URL + "/genres").then((res) => {
      setHomePageGenres(res.data);
    });

    axios(API_URL + "/movies?_limit=3").then((res) => {
      setHomePageMovies(res.data);
    });

    axios(API_URL + "/actors?_limit=3").then((res) => {
      setHomePageActors(res.data);
    });

    axios(API_URL + "/directors?_limit=3").then((res) => {
      sethomePageDirectors(res.data);
    });
  }, [id]);

  const homePageGenresList = homePageGenres.map((homePageGenre) => (
    <li key={homePageGenre.id}>
      <Link to={`/movies-by-genre/${homePageGenre.id}`}>
        <div>{homePageGenre.title}</div>
      </Link>
    </li>
  ));

  const homePageMoviesList = homePageMovies.map((homePageMovie) => (
    <li key={homePageMovie.id}>
      <Link to={`/movie/${homePageMovie.id}`}>
        <img src={homePageMovie.imageUrl} alt="home-movie"></img>{" "}
      </Link>
    </li>
  ));

  const homePageActorsList = homePageActors.map((homePageActor) => (
    <li key={homePageActor.id}>
      <Link to={`/actor/${homePageActor.id}`}>
        <img src={homePageActor.imageUrl} alt="home-actor"></img>{" "}
      </Link>
    </li>
  ));

  const homePageDirectorsList = homePageDirectors.map((homePageDirector) => (
    <li key={homePageDirector.id}>
      <Link to={`/director/${homePageDirector.id}`}>
        <img src={homePageDirector.imageUrl} alt="home-director"></img>
      </Link>
    </li>
  ));

  const [results, setResults] = useState([]);

  if (
    homePageGenres.length &&
    homePageMovies.length &&
    homePageActors.length &&
    homePageDirectors.length === 0
  ) {
    return <h2>Loading...</h2>;
  }

  return (
    <Container>
      <div className="home-page">
        <div className="search-bar-container">
          <SearchBar setResults={setResults} />
          {results.length > 0 && <SearchResultsList results={results} />}
        </div>
        <div className="home-page elements genres">
          <ul>{homePageGenresList}</ul>
        </div>
        <div className="home-page elements layout">
          <Link to={`/movies`}>
            <h2 className="page-title">Movies</h2>
          </Link>
          <ul>{homePageMoviesList}</ul>
        </div>
        <div className="home-page elements layout">
          <Link to={`/actors`}>
            <h2 className="page-title">Actors</h2>
          </Link>
          <ul>{homePageActorsList}</ul>
        </div>
        <div className="home-page elements layout">
          <Link to={`/directors`}>
            <h2 className="page-title">Directors</h2>
          </Link>
          <ul>{homePageDirectorsList}</ul>
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
