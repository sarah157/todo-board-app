import { HiViewGrid } from "react-icons/hi";
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
    <div
      className={`${
        className ? className : ""
      } header p-4 flex justify-between g-2`}
    >
      <div className="header-section w-5/6 flex gap-2 items-center">
        <div onClick={() => navigate("/")} className="header-logo header-item">
          <HiViewGrid className="mt-0.5 mb-1 mx-1" />
        </div>
        {children}
      </div>
      <div className="header-section ">
        {uid && (
          <div className="header-logout header-item">
            <button className="cursor-pointer" onClick={logoutHandler}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BaseHeader;
