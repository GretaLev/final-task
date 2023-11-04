import { useState } from "react";
import { API_URL } from "../../config";
import Container from "../../Components/Container/Container";

const CreateDirectorPage = () => {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [country, setCountry] = useState("");
  const [about, setAbout] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const nameHandler = (event) => setName(event.target.value);
  const yearHandler = (event) => setYear(event.target.valueAsNumber);
  const monthHandler = (event) => setMonth(event.target.valueAsNumber);
  const dayHandler = (event) => setDay(event.target.valueAsNumber);
  const countryHandler = (event) => setCountry(event.target.value);
  const aboutHandler = (event) => setAbout(event.target.value);
  const imageUrlHandler = (event) => setImageUrl(event.target.value);

  const newGenreHandler = (event) => {
    event.preventDefault();

    const newDirector = {
      name,
      born: {
        year,
        month,
        day,
        country,
      },
      about,
      imageUrl,
    };

    fetch(API_URL + "/directors", {
      method: "POST",
      body: JSON.stringify(newDirector),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };
  return (
    <Container>
      <h1>Create New Director</h1>

      <form onSubmit={newGenreHandler}>
        <div className="form-control">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={nameHandler}
          />
        </div>
        <div className="form-control">
          <label htmlFor="year">Year:</label>
          <input
            type="number"
            name="year"
            id="year"
            value={year}
            onChange={yearHandler}
          />
        </div>
        <div className="form-control">
          <label htmlFor="month">Month:</label>
          <input
            type="number"
            name="month"
            id="month"
            value={month}
            onChange={monthHandler}
          />
        </div>
        <div className="form-control">
          <label htmlFor="day">Day:</label>
          <input
            type="number"
            name="day"
            id="day"
            value={day}
            onChange={dayHandler}
          />
        </div>
        <div className="form-control">
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            name="country"
            id="country"
            value={country}
            onChange={countryHandler}
          />
        </div>
        <div className="form-control">
          <label htmlFor="about">About:</label>
          <input
            type="text"
            name="about"
            id="about"
            value={about}
            onChange={aboutHandler}
          />
        </div>
        <div className="form-control">
          <label htmlFor="imageUrl">Director picture link:</label>
          <input
            type="url"
            name="imageUrl"
            id="imageUrl"
            value={imageUrl}
            onChange={imageUrlHandler}
          />
        </div>

        <button type="submit">Create</button>
      </form>
    </Container>
  );
};
export default CreateDirectorPage;
