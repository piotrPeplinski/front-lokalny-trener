import { FC, ReactNode } from "react";
import "./../../assets/css/main.css";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode; // Allows any content to be passed into the popup
}

const Popup: FC<PopupProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="popup-close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
