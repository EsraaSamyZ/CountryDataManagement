import ReactDOM from "react-dom";
import Icon from "./Icon";
import Close from "../../assets/close.svg";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div dir="rtl" className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg pt-14 pb-10 px-10 w-full max-w-lg relative">
        <button
          className="p-1 absolute top-4 right-4 hover:bg-gray-100 rounded-md place-content-center"
          onClick={onClose}
        >
          <Icon className="w-5" src={Close} alt="close-icon" />
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
