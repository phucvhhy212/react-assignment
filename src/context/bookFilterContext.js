
import React, { createContext, useContext, useState } from 'react';

const BookFilterContext = createContext();


export const BookFilterProvider = ({ children }) => {
  const [filter, setFilter] = useState("");
  const [categoryId, setCategoryId] = useState("");

  return (
    <BookFilterContext.Provider value={{ filter, setFilter, categoryId, setCategoryId }}>
      {children}
    </BookFilterContext.Provider>
  );
};

export const useBookFilterContext = () => useContext(BookFilterContext);
