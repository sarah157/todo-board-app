import { HiCube } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { logout } from "../services/authService";

const BaseHeader = ({ children, className }) => {
  const navigate = useNavigate();
  const { uid } = useAuth();

  const logoutHandler = () => {
    logout();
  };

  return (
    <div className={`${className ? className : ""} header my-2 mx-4 flex justify-between g-2`}>
      <div className="header-section w-5/6 flex gap-2 sm:items-center items-start">
        <div onClick={() => navigate("/")} className="header-logo header-item" >
          <HiCube className="mt-0.5 mb-1 mx-1"/>
        </div>
        {children}
      </div>
      <div className="header-section ">
        {uid && (
          <div className="header-logout">
          <button className="cursor-pointer underline" onClick={logoutHandler}>
            Logout
          </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BaseHeader;
