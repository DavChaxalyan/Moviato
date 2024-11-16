import React from "react";
import { BsChatRightText } from "react-icons/bs";
import "./style.css";

export default function Letstalk() {
  return (
    <div className="footerLetsTalk">
      <div className="titles_of_footer">
        <h4>LET'S TALK.</h4>
      </div>
      <div className="footer_description">
        <p>We'd be glad to answer {<br />}any questions you may have.</p>
      </div>
      <button className="chatNow">
        <span className="chatnowicon">
          <BsChatRightText />
        </span>
        <p>Chat Now</p>
      </button>
    </div>
  );
}
