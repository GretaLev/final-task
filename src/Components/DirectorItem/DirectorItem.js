import { Link } from "react-router-dom";

const DirectorItem = ({ data }) => {
  const { id, imageUrl, name } = data;
  return (
    <div className="directors-item">
      <Link to={`/director/${id}`}>
        <img src={imageUrl} alt="director"></img>
        {name}
      </Link>
    </div>
  );
};

export default DirectorItem;
