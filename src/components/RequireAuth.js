import { Navigate, useLocation} from "react-router-dom"
import Loading from "./Loading";

import { useAuth } from "../context/auth-context";
function RequireAuth({ children }) {
    const location = useLocation();
    const { uid, loading } = useAuth();
    if (loading) return <Loading />;
    if (uid) return children;
    return <Navigate to="/auth" replace state={{ path: location.pathname }} />;
}
  

export default RequireAuth