import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import { FavoriteActorsPopup } from "../FavoriteActorsPopup";
import useModal from "../../hooks/useModal";
import InterestModal from "../InterestModal";

const InterestsButton = () => {
  const { isOpen, handleOpen, handleClose } = useModal();

  return (
    <>
      {!isOpen ? (
        <div className={styles.edit_my_interests_button_container}>
          <span className={styles.edit_my_interests_button} onClick={handleOpen}>
            Edit my Interests
          </span>
        </div>
      ) : (
        <InterestModal close={handleClose} />
      )}
    </>
  );
};

export default InterestsButton;
