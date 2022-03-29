import { createPortal } from 'react-dom';

const Backdrop = ({onClose}) => {
    return <div className="fixed w-full h-screen z-10 bg-black bg-opacity-60" onClick={onClose} />;
  };
  
  const ModalOverlay = ({component : Component, props, onClose}) => {
    return (
        <div className="fixed z-20 top-1/3 left-1/4 w-1/2 overflow-hidden bg-white">
            <Component {...props}/>
            <div onClick={onClose}>close</div>
        </div>
    );
  };
  
  const Modal = ({component, props, onClose}) => {
    return (
      <>
        {createPortal(
          <Backdrop onClose={onClose} />,
          document.getElementById('backdrop-root')
        )}
        {createPortal(
          <ModalOverlay
            component={component}
            props={props}
            onClose={onClose}
          />,
          document.getElementById('modal-root')
        )}
      </>
    );
  };
  
  export default Modal;