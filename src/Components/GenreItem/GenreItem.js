import { Link, useNavigate } from "react-router-dom";
import "./GenreItem.scss";
import { IconButton } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

const GenreItem = ({ data, onDelete }) => {
  const { id, title } = data;

  const navigate = useNavigate();
  return (
    <>
      <Link to={`/movies-by-genre/${id}`}>
        <div className="genres-item">
          <h4>{title}</h4>
        </div>
      </Link>
      <IconButton onClick={() => navigate(`/create-genre/${id}`)}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => onDelete(id)}>
        <DeleteIcon />
      </IconButton>
    </>
  );
};

export default GenreItem;
