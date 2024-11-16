import React from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.css";

const TextHead = ({ title = "", desc = "", btnName = "", btnUrl = "" }) => {
  return (
    
      <div className={styles.textWrap}>
      <div className={styles.textTitle}>
        {title ? <h2>{title}</h2> : null}
        {desc ? <p>{desc}</p> : null}
      </div>
      {btnName && btnUrl ? <Link to={btnUrl} className={styles.textUrl}>{btnName}</Link> : null}

      </div>
    
  );
};

export default TextHead;
