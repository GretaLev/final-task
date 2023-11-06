import { Link, useNavigate } from "react-router-dom";
import { HStack, IconButton } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

const ActorItem = ({ data, showEdit, onDelete }) => {
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
      <HStack gap={2} mt="10px">
        {showEdit && (
          <IconButton onClick={() => navigate(`/create-actor/${id}`)}>
            <EditIcon />
          </IconButton>
        )}
        {onDelete && (
          <IconButton onClick={() => onDelete(id)}>
            <DeleteIcon />
          </IconButton>
        )}
      </HStack>
    </>
  );
};

export default ActorItem;
