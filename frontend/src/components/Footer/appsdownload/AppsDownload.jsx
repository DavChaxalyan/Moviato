import React from "react";
import "./style.css";
import appstoreImg from "./icons/appstore.png"
import googleplayImg from "./icons/googleplay.png"

export default function AppsDownload() {
  return (
    <div className="footerDownloadApps">
      <div className="appStore">
        <button className="btnAppStore">
          <img
            src={appstoreImg}
            alt=""
          />
        </button>
      </div>
      <div className="googlePlay">
        <button className="btnGooglePlay">
          <img
            src={googleplayImg}
            alt=""
          />
        </button>
      </div>
    </div>
  );
}
