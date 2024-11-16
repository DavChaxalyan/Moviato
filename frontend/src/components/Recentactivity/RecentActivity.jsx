import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function RecentActivity() {
  const [isShrunk, setIsShrunk] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(true);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsShrunk(true);
    setTimeout(() => {
      setIsContentVisible(false);
    }, 100);

    setTimeout(() => {
      setIsShrunk(false);
      setIsContentVisible(true);
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="Recentactivity">
      <div className="section_one_title">
        <div className="title">
          <h1>Recent Activity</h1>
        </div>
      </div>
      <div className="section_two_info">
        <div className="star_road">
          <img src="./src/components/RecentActivity/icon/star.png" alt="star_road" title="Star Road" />
        </div>
        <div className="description">
          <div className="informatio_for_sign_in">
            <p>Sign In to See Your Recent Activity</p>
          </div>
          <div className="tracking_journey">
            <p>
              Keep Track of Your Journey at <span>MOVIA.TO</span>
            </p>
          </div>
        </div>
      </div>
      <div className="section_three_sign_in">
        <div className="sign_in_button_div">
          <div onClick={handleClick} className={`sign_in_button container ${isShrunk ? "shrunk" : ""}`}>
            <div className="magic_button">
              <div className="content_anim_wrapper">
                <button className="button_M">M</button>
              </div>
            </div>

            {isContentVisible && (
              <div className="sign_btn">
                <button>Sign In</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
