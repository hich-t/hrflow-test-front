"use client"

import { Island_Moments } from "next/font/google";
import React, { useState, useEffect } from "react";

const SearchBar = ({ onSearch, isReset }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    let newQuery = event.target.value;
    setQuery(newQuery);
    if (onSearch) {
      onSearch(newQuery);
    }
  };

useEffect(()=> {
    if (isReset) {
        setQuery('')
    }

}, [isReset])


  return (
    <div className="w-full max-w-md sm:mr-10 mb-6 sm:mb-0">
      <input
        type="text"
        className="w-full border font-quick border-lightblue rounded-md shadow-sm pl-3 pr-10 py-2 focus:outline-none focus:ring-lightblue text-black focus:border-lightblue sm:text-sm"
        placeholder="Search jobs..."
        value={query}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
