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
  const [isReset, setIsReset] = useState(false)
  
  const textColor = isDarkMode ? "text-white" : "text-darkblue";

  useEffect(() => {
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

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedLocation('');
    localStorage.removeItem('searchQuery');
    localStorage.removeItem('selectedCategory');
    localStorage.removeItem('selectedLocation');
    setFilteredJobs(jobs); 
    setIsReset(true)
    setTimeout(() => setIsReset(false), 100);
  };

  return (
    <div className="mt-12 mb-12 flex flex-col sm:flex-row items-center justify-center gap-8 w-full sm:w-3/5">
      <div className="flex flex-col w-4/5 sm:w-1/3 ">
        <h1
          className={`text-left mb-4 font-quick font-light text-xl ${textColor}`}
        >
          Search jobs
        </h1>
        <SearchBar onSearch={handleSearch} resetFilters={resetFilters} isReset={isReset} />
      </div>
      <div className="flex flex-col w-4/5">
  <h1 className={`text-left mb-4 font-quick font-light text-xl ${textColor}`}>
    Filter By..
  </h1>
  <div className="flex gap-6 flex-col sm:flex-row items-center">
    <CategoryFilter onChange={handleCategoryChange} resetFilters={resetFilters} isReset={isReset}/>
    <LocationFilter onChange={handleLocationChange} resetFilters={resetFilters} isReset={isReset}/>
    <button
      className="bg-white border border-lightblue text-gray-400 font-quick rounded-md w-1/2 h-10"
      onClick={resetFilters}
    >
      Reset
    </button>
  </div>
</div>

    </div>
  );
};

export default SearchAndFilter;
