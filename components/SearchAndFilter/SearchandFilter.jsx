import React, { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import LocationFilter from "./LocationFilter";

const SearchAndFilter = () => {
  const { jobs, setFilteredJobs, isDarkMode } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const textColor = isDarkMode ? "text-white" : "text-darkblue";

  useEffect(() => {
    // Initialize state from localStorage
    setSearchQuery(localStorage.getItem("searchQuery") || "");
    setSelectedCategory(localStorage.getItem("selectedCategory") || "");
    setSelectedLocation(localStorage.getItem("selectedLocation") || "");
  }, []);

  useEffect(() => {
    const filtered = jobs.filter((job) => {
      const jobNameMatches = job.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const categoryMatches =
        selectedCategory === "" ||
        job.tags.some(
          (tag) =>
            tag.name === "category" &&
            tag.value.trim().toLowerCase() === selectedCategory.toLowerCase()
        );
      const locationMatches =
        selectedLocation === "" ||
        job.location?.text.trim().toLowerCase() ===
          selectedLocation.toLowerCase(); // Location filtering

      return jobNameMatches && categoryMatches && locationMatches;
    });
    setFilteredJobs(filtered);
  }, [searchQuery, selectedCategory, selectedLocation, jobs]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    localStorage.setItem("searchQuery", query);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    localStorage.setItem("selectedCategory", category);
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
    localStorage.setItem("selectedLocation", location);
  };

  return (
    <div className="mt-12 mb-12 flex flex-col sm:flex-row items-center justify-center gap-8 w-full sm:w-3/5">
      <div className="flex flex-col w-4/5 sm:w-1/3 ">
        <h1
          className={`text-left mb-4 font-quick font-light text-xl ${textColor}`}
        >
          Search jobs
        </h1>
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="flex flex-col w-4/5">
        <h1
          className={`text-left mb-4 font-quick font-light text-xl ${textColor}`}
        >
          Filter By..
        </h1>
        <div className="flex gap-6 flex-col sm:flex-row ">
          <CategoryFilter onChange={handleCategoryChange} />
          <LocationFilter onChange={handleLocationChange} />
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
