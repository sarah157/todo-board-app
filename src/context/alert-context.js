import React, { useState, useContext, createContext } from "react";

const AlertContext = createContext({
  msg: "",
  isError: true,
});

export const AlertContextProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  return (
    <>
      <AlertContext.Provider value={{ alert, setAlert }}>
        {children}
      </AlertContext.Provider>
    </>
  );
};

export const useAlert = () => useContext(AlertContext);
