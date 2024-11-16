import React, { useState } from "react";
import styles from "./style.module.css";
import SuggestedMovies from "../SuggestedMovies/SuggestedMovies";

const MagicSuggestButton = () => {
  const [openPopup, setPopup] = useState(false);
  const onButtonClick = () => {
    setPopup(!openPopup);
  };

  return (
    <>
      {openPopup && <SuggestedMovies onSkipClick={() => setPopup(false)} />}
      <div className={styles.magic_suggest_button_container}>
        <div className={styles.magic_suggest_glow}>
          <button
            className={styles.magic_suggest_button}
            onClick={onButtonClick}
          >
            Magic Suggest
          </button>
        </div>
      </div>
    </>
  );
};

export default MagicSuggestButton;
