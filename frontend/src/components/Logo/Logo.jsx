import React from "react";
import styles from "./style.module.css";
import { HOME } from "../../router/route-path";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <span onClick={() => navigate(HOME)} className={styles.logo}>
      MOVIA.TO
    </span>
  );
};

export default Logo;
