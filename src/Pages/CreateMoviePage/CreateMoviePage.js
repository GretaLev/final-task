import { useState } from "react";
import Container from "../../Components/Container/Container";
import { API_URL } from "../../config";

const CreateMoviePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rate, setRate] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [imageUrl, SetImageUrl] = useState("");

  const titleHandler = (event) => setTitle(event.target.value);
  const descriptionHandler = (event) => setDescription(event.target.value);
  const rateHandler = (event) => setRate(event.target.value);
  const releaseDateHandler = (event) => setReleaseDate(event.target.value);
  const imageUrlHandler = (event) => SetImageUrl(event.target.value);

  const newMovieHandler = (event) => {
    event.preventDefault();

    const newMovie = {
      title,
      description,
      rate,
      releaseDate,
      imageUrl,
    };

    fetch(API_URL + "/movies", {
      method: "POST",
      body: JSON.stringify(newMovie),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };
  return (
    <Container>
      <h1>Create New Movie</h1>

      <form onSubmit={newMovieHandler}>
        <div className="form-control">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={titleHandler}
          />
        </div>

        <div className="form-control">
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            id="description"
            value={description}
            onChange={descriptionHandler}
          />
        </div>

        <div className="form-control">
          <label htmlFor="rate">Rating:</label>
          <input
            type="number"
            name="rate"
            id="rate"
            value={rate}
            onChange={rateHandler}
          />
        </div>

        <div className="form-control">
          <label htmlFor="releaseDate">Released in:</label>
          <input
            type="number"
            name="releaseDate"
            id="releaseDate"
            value={releaseDate}
            onChange={releaseDateHandler}
          />
        </div>

        <div className="form-control">
          <label htmlFor="imageUrl">Movie picture link:</label>
          <input
            type="url"
            name="imageUrl"
            id="imageUrl"
            value={imageUrl}
            placeholder="hhttps://example.com"
            pattern="https://.*"
            onChange={imageUrlHandler}
            required
          />
        </div>

        <button type="submit">Create</button>
      </form>
    </Container>
  );
};

export default CreateMoviePage;
