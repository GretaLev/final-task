import { Link } from "react-router-dom";
import "./MovieItem.scss";

const MoviesItem = ({ data }) => {
  console.log(data);

  const { id, imageUrl } = data;
  return (
    <div className="movies-item">
      <Link to={`/movie/${id}`}>
        <img src={imageUrl} alt="movie"></img>
      </Link>
    </div>
  );
};

export default MoviesItem;
