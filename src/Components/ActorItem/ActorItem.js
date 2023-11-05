import { Link, useNavigate } from "react-router-dom";
import "./ActorItem.scss";
import { IconButton } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

const ActorItem = ({ data, onDelete }) => {
  const { id, imageUrl, name } = data;

  const navigate = useNavigate();
  return (
    <>
      <div className="actors-item">
        <Link to={`/actor/${id}`}>
          <img src={imageUrl} alt="actor"></img>
          <h4>{name}</h4>
        </Link>
      </div>
      <IconButton onClick={() => navigate(`/create-actor/${id}`)}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => onDelete(id)}>
        <DeleteIcon />
      </IconButton>
    </>
  );
};

export default ActorItem;
