import { Link } from "react-router-dom";

const SearchResultsList = ({ results }) => {
  return (
    <div className="results-list">
      {results.map((result, id) => {
        return (
          <div key={id}>
            <Link to={`/movie/${result.id}`}>{result.title}</Link>
          </div>
        );
      })}
    </div>
  );
};

export default SearchResultsList;
