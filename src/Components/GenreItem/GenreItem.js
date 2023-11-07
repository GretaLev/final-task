import { Link, useNavigate } from "react-router-dom";
import { HStack, IconButton } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

const GenreItem = ({ data, showEdit, onDelete }) => {
  const { id, title } = data;

  const navigate = useNavigate();
  return (
    <>
      <div className="genres-item">
        <Link to={`/movies-by-genre/${id}`}>
          <h4>{title}</h4>
        </Link>
      </div>

      {showEdit ||
        (onDelete && (
          <HStack gap={2} mt="10px">
            <IconButton onClick={() => navigate(`/create-genre/${id}`)}>
              <EditIcon />
            </IconButton>

            <IconButton onClick={() => onDelete(id)}>
              <DeleteIcon />
            </IconButton>
          </HStack>
        ))}
    </>
  );
};

export default GenreItem;
