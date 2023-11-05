import { Link, useNavigate } from "react-router-dom";
import "./MovieItem.scss";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";

const MoviesItem = ({ data, onDelete }) => {
  const { id, imageUrl } = data;
  const navigate = useNavigate();
  return (
    <>
      <div className="movies-item">
        <Link to={`/movie/${id}`}>
          <img src={imageUrl} alt="movie"></img>
        </Link>
      </div>
      <IconButton onClick={() => navigate(`/create-movie/${id}`)}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => onDelete(id)}>
        <DeleteIcon />
      </IconButton>
    </>
  );
};

export default MoviesItem;
