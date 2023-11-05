import { useEffect, useState } from "react";
import "./HomePage.scss";
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
    <Link to={`/movies-by-genre/${homePageGenre.id}`}>
      <li key={homePageGenre.id}>{homePageGenre.title}</li>
    </Link>
  ));

  const homePageMoviesList = homePageMovies.map((homePageMovie) => (
    <Link to={`/movie/${homePageMovie.id}`}>
      <li key={homePageMovie.id}>
        <img src={homePageMovie.imageUrl} alt="home-movie"></img>
      </li>
    </Link>
  ));

  const homePageActorsList = homePageActors.map((homePageActor) => (
    <Link to={`/actor/${homePageActor.id}`}>
      <li key={homePageActor.id}>
        <img src={homePageActor.imageUrl} alt="home-actor"></img>
      </li>
    </Link>
  ));

  const homePageDirectorsList = homePageDirectors.map((homePageDirector) => (
    <Link to={`/director/${homePageDirector.id}`}>
      <li key={homePageDirector.id}>
        <img src={homePageDirector.imageUrl} alt="home-director"></img>
      </li>
    </Link>
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
          <SearchResultsList results={results} />
        </div>
        <div className="home-page-genres">
          <ul>{homePageGenresList}</ul>
        </div>
        <div className="home-page-movies">
          <h2>Movies</h2>
          <ul>{homePageMoviesList}</ul>
          <Link to={`/movies`}>
            <h4>Go to movies page..</h4>
          </Link>
        </div>
        <div className="home-page-actors">
          <h2>Actors</h2>
          <ul>{homePageActorsList}</ul>
          <Link to={`/actors`}>
            <h4>Go to actors page..</h4>
          </Link>
        </div>
        <div className="home-page-directors">
          <h2>Directors</h2>
          <ul>{homePageDirectorsList}</ul>
          <Link to={`/directors`}>
            <h4>Go to directors page..</h4>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
