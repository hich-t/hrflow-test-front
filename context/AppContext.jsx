"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { getJobs } from "../api/api.js";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    setLoading(true);
    getJobs()
      .then((data) => {
        const jobsArray = data.data.jobs || [];
        setJobs(jobsArray);
        setFilteredJobs(jobsArray);
  
        let newCategories = jobsArray
          .flatMap((job) => job.tags)
          .filter((tag) => tag.name.toLowerCase() === "category" && tag.value)
          .map((tag) => {
            let categoryName = tag.value.trim().toLowerCase();
            if (categoryName === "humain resources") {
              categoryName = "human resources";
            }
            return categoryName;
          });
  
        setCategories([...new Set(newCategories)].map(category => 
          category.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        ));
  
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setJobs([]);
        setFilteredJobs([]);
        setLoading(false);
        console.error("Failed to fetch jobs:", err);
      });
  }, []);
  
  

  const isEmpty = !loading && jobs.length === 0;

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const contextValue = {
    isDarkMode,
    toggleDarkMode,
    jobs,
    filteredJobs,
    setFilteredJobs,
    categories,
    types,
    companies,
    loading,
    error,
    isEmpty,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
