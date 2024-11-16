import React from "react";
import styles from "./styles.module.css";

const AuthWrapper = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>{children}</div>
    </div>
  );
};

export default AuthWrapper;
