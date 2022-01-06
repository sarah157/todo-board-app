import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { logout } from "../services/authService";

const BaseHeader = ({children, backArrowLogo}) => {
  const navigate = useNavigate();
  const { uid } = useAuth();
  
  const logoutHandler = () => {
    logout();
  };

  return (
    <header className="header mt-1 py-1 px-4 w-full flex justify-between">
      <div
        onClick={() => navigate("/")}
        className="header-item mr-2"
      >
       {backArrowLogo ? <HiArrowLeft className="mx-2"/> : "Boards"}
      </div>
      {children}
      <div className="logout-btn">
        {uid && (
          <button className="cursor-pointer underline" onClick={logoutHandler}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default BaseHeader;
