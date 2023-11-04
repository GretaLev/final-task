import { Link } from "react-router-dom";
import "./GenreItem.scss";

const GenreItem = ({ data }) => {
  const { id, title } = data;
  return (
    <Link to={`/movies-by-genre/${id}`}>
      <div className="genres-item">
        <h4>{title}</h4>
      </div>
    </Link>
  );
};

export default GenreItem;
