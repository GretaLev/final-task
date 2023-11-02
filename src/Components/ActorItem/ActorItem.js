import { Link } from "react-router-dom";

const ActorItem = ({ data }) => {
  const { id, imageUrl, name } = data;
  return (
    <div className="actors-item">
      <Link to={`/actor/${id}`}>
        <img src={imageUrl} alt="actor"></img>
        {name}
      </Link>
    </div>
  );
};

export default ActorItem;
