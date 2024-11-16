import React from "react";
import { FaRegCopyright } from "react-icons/fa";
import SvgIcon from "../../SvgIcon/SvgIcon";
import "./style.css";

export default function RefsAndSocialMedia() {
  return (
    <div className="refs_And_Social_Media_container">
      <div className="footer_top_line_2"> </div>
      <div className="bottomsection">
        <div className="socialmedia">
          <div className="facebookicon">
            <SvgIcon iconName={"icon_facebook"} />
          </div>
          <div className="instagramicon">
            <SvgIcon iconName={"icon_instagram"} />
          </div>
          <div className="threadsicon">
            <SvgIcon iconName={"icon_instaThread"} />
          </div>
          <div className="twittericon">
            <SvgIcon iconName={"icon_twitter"} />
          </div>
        </div>
        <div className="moviatologo">
          <p>
            <b>MOVIA.TO</b>
          </p>
        </div>
        <div className="moviatoinfo">
          <p>
            <span>
              <FaRegCopyright />
            </span>
            All right reserved. 2024 <b>MOVIA.TO</b>
          </p>
        </div>
      </div>
    </div>
  );
}
