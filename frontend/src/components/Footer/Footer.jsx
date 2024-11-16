import React from "react";
import Letstalk from "./letstalk/Letstalk";
import MoviaTo from "./moviato/MoviaTo";
import Help from "./help/Help";
import AppsDownload from "./appsdownload/AppsDownload";
import "./style.css";
import RefsAndSocialMedia from "./refs_socialmedia/RefsAndSocialMedia";

export default function footer() {
  return (
    <div className="Footer main-container">
      <div className="footer_top_line"> </div>
      <div className="topsection">
        <Letstalk />
        <MoviaTo />
        <Help />
        <AppsDownload />
      </div>
      <RefsAndSocialMedia />
    </div>
  );
}
