import { useState } from "react";
import Container from "../../Components/Container/Container";
import { API_URL } from "../../config";

const CreateGenrePage = () => {
  const [title, setTitle] = useState("");

  const titleHandler = (event) => setTitle(event.target.value);

  const newGenreHandler = (event) => {
    event.preventDefault();

    const newGenre = {
      title,
    };

    fetch(API_URL + "/genres", {
      method: "POST",
      body: JSON.stringify(newGenre),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };
  return (
    <Container>
      <h1>Create New Genre</h1>

      <form onSubmit={newGenreHandler}>
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

        <button type="submit">Create</button>
      </form>
    </Container>
  );
};

export default CreateGenrePage;
