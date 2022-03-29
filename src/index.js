import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/auth-context";
import { ActiveBoardContextProvider } from "./context/active-board-context";
import { AlertContextProvider } from "./context/alert-context";

ReactDOM.render(
  <AlertContextProvider>
    <AuthContextProvider>
      <ActiveBoardContextProvider>
          <App />
      </ActiveBoardContextProvider>
    </AuthContextProvider>
  </AlertContextProvider>,
  document.getElementById("root")
);
