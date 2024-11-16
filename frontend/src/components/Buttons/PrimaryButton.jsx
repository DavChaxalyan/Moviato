import React from "react";
import styles from "./style.module.css";

const PrimaryButton = ({ children, onClick, className, ...restProps }) => {
  return (
    <button className={`${styles.primaryButton} ${className}`} onClick={onClick} {...restProps}>
      {children}
    </button>
  );
};

export default PrimaryButton;
