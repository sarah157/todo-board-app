import { createPortal } from "react-dom";
import { HiX } from "react-icons/hi";

const Backdrop = ({ onClose }) => {
  return (
    <div
      className="fixed w-full h-screen z-10 bg-black bg-opacity-60"
      onClick={onClose}
    />
  );
};

const ModalOverlay = ({ component: Component, props, onClose }) => {
  return (
    <div className="fixed z-20 w-full top-10 flex justify-center items-center">
      <div className="w-3/4 lg:w-1/2 bg-white p-3">
        <div className="cursor-pointer" onClick={onClose}>
          <HiX />
        </div>
        <Component {...props} />
      </div>
    </div>
  );
};

const Modal = ({ component, props, onClose }) => {
  return (
    <div className="flex justify-center items-center bg-gray-300">
      {createPortal(
        <Backdrop onClose={onClose} />,
        document.getElementById("backdrop-root")
      )}
      {createPortal(
        <ModalOverlay component={component} props={props} onClose={onClose} />,
        document.getElementById("modal-root")
      )}
    </div>
  );
};

export default Modal;
