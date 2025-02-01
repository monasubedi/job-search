import { LocationOn, SearchOutlined } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";
import useSearchJobs from "../../hooks/useSearchJobs";
import "./searchbar.css";

const SearchBar = () => {
  const { query, location, handleQueryChange, handleLocationChange } =
    useSearchJobs();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) {
      alert("Missing query");
    }
    navigate(`/job-list/search?query=${query}&location=${location}`);
  };

  return (
    <div className="searchContainer">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="searchInput">
          <SearchOutlined className="icon" />
          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder="Enter job title, keyword"
          />
        </div>
        <div className="location">
          <LocationOn className="icon" />
          <input
            type="text"
            value={location}
            onChange={handleLocationChange}
            placeholder="Search Location"
          />
        </div>
        <div className="searchBtnContainer">
          <button type="submit" className="searchBtn">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
