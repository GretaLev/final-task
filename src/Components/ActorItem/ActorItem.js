import { Link } from "react-router-dom";
import "./ActorItem.scss";

const ActorItem = ({ data }) => {
  const { id, imageUrl, name } = data;
  return (
    <div className="actors-item">
      <Link to={`/actor/${id}`}>
        <img src={imageUrl} alt="actor"></img>
        <h4>{name}</h4>
      </Link>
    </div>
  );
};

export default ActorItem;
