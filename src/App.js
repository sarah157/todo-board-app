import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import BoardPage from "./pages/Board";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { useAuth } from "./context/auth-context";
import RequireAuth from "./components/RequireAuth";
import Alert from "./components/Alert";
import Error404 from "./pages/Error404";

function App() {
  const { uid } = useAuth();
  return (
    <BrowserRouter>
      <div className="app h-screen">
        <Alert />
          <Routes>
            <Route
              path="/"
              exact
              element={<Navigate replace to={`${uid ? "/home" : "/auth"}`} />}
            />
            <Route
              path="/auth"
              element={<Auth />} />
            <Route
              path="/home"
              element={<RequireAuth><Home /></RequireAuth>}
            />
            <Route
              path="/b/:boardId"
              element={<RequireAuth><BoardPage /></RequireAuth>}
            />
            <Route
              path="*"
              element={<Error404 />} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
