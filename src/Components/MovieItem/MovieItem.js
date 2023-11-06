import { Link, useNavigate } from "react-router-dom";

import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { HStack, IconButton, VStack } from "@chakra-ui/react";

const MoviesItem = ({ data, onDelete, showEdit = false }) => {
  const { id, imageUrl } = data;
  const navigate = useNavigate();
  return (
    <>
      <div className="movies-item">
        <Link to={`/movie/${id}`}>
          <img src={imageUrl} alt="movie"></img>
        </Link>
      </div>
      <HStack gap={2} mt="10px">
        {showEdit && (
          <IconButton onClick={() => navigate(`/create-movie/${id}`)}>
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

export default MoviesItem;
