import React, { useState } from "react";
import SuggestedMovies from "../SuggestedMovies/SuggestedMovies";
import "./style.css";

export default function MagicSuggestIcon() {
  const [open, setOpen] = useState(false);
  const handleButtonClick = () => {
    setOpen(!open);
  };

  return (
    <>
      {open && <SuggestedMovies onSkipClick={() => setOpen(false)} />}
      <div onClick={handleButtonClick} className="magic_button_box">
        <div className="magic_m_button">
          <div className="content-wrapper">
            <p>M</p>
          </div>
        </div>
      </div>
    </>
  );
}
