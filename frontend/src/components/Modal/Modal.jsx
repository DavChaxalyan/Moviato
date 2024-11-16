import React from "react";
import styles from "./style.module.css";

const Modal = ({ children }) => {
  return (
    <>
      <div className={styles.backdrop} />
      <div className={styles.modal}>{children}</div>
    </>
  );
};

export default Modal;
