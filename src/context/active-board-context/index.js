import React, { useContext, createContext, useReducer, useEffect } from "react";
import { useAlert } from "../alert-context";
import {activeBoardReducer, initialState} from "./reducer";

export const ActiveBoardContext = createContext({ state: {}, dispatch: () => { }});

export const ActiveBoardContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(activeBoardReducer, initialState);
  const { setAlert } = useAlert();

  useEffect(() => {
    if (state.error) {
      setAlert({ msg: state.error, isError: true });
    } else setAlert(null);
  }, [setAlert, state.error]);

  return (
    <ActiveBoardContext.Provider value={{ state, dispatch }}>
      {children}
    </ActiveBoardContext.Provider>
  );
};

export const useActiveBoard = () => useContext(ActiveBoardContext);




