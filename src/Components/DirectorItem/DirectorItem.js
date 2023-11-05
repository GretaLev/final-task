import { Link, useNavigate } from "react-router-dom";
import "./DirectorItem.scss";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";

const DirectorItem = ({ data, onDelete }) => {
  const { id, imageUrl, name } = data;

  const navigate = useNavigate();

  return (
    <>
      <div className="directors-item">
        <Link to={`/director/${id}`}>
          <img src={imageUrl} alt="director"></img>
          <h4>{name}</h4>
        </Link>
      </div>
      <IconButton onClick={() => navigate(`/create-director/${id}`)}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => onDelete(id)}>
        <DeleteIcon />
      </IconButton>
    </>
  );
};

export default DirectorItem;
