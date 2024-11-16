import React from "react";
import styles from "./style.module.css";

const Loading = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.dot} />
      <div className={styles.dot} />
      <div className={styles.dot} />
    </div>
  );
};

export default Loading;
