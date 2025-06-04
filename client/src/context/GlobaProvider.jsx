"use client";
import React, { createContext, useContext, useState } from "react";

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    job_type: "",
    min_salary: 50,
    max_salary: 100,
  });


  return (
    <GlobalContext.Provider
      value={{
        jobs,
        setJobs,
        filters,
        setFilters,
        
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
