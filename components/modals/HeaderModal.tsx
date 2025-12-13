import React, { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./HeaderModal.module.css";

interface Props {
  children: ReactNode;
  onClose: () => void;
}

const HeaderModal: React.FC<Props> = ({ children, onClose }) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default HeaderModal;
