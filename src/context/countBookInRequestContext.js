import React, { createContext, useContext, useState } from 'react';
const CountBookInRequestContext = createContext();
export const CountBookInRequestProvider = ({ children }) => {
    const [requestCount,setRequestCount] = useState(0)
  
    return (
      <CountBookInRequestContext.Provider value={{ requestCount,setRequestCount }}>
        {children}
      </CountBookInRequestContext.Provider>
    );
  };
  
  export const useCountBookInRequestContext = () => useContext(CountBookInRequestContext);