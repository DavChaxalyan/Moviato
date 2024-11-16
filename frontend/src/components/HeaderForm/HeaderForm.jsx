import "./style.css";
import { IoNotificationsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useEffect, useState } from "react";
import { BiBookmark } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineLocalActivity } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
import SvgIcon from "../SvgIcon/SvgIcon";
import { useNavigate } from "react-router-dom";
import { LOGIN, HOME } from "../../router/route-path";
import avatar from "../../assets/images/avatar.png";

const HeaderForm = () => {
  const [icon2, setIcon2] = useState(true);
  const [inputActive, setInputActive] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  // const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedInUser");

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".header");
      if (header) {
        header.classList.toggle("sticky", window.scrollY > 0);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    // <header className="header main-container">
    //   <div className="header-wrapper">
    //   <div className="menu">
    //     <ul>
    //       <h1 className="logoMov">MOVIA.TO</h1>
    //       <li style={{ cursor: "pointer" }}> Films </li>
    //       <li style={{ cursor: "pointer" }}> Community </li>
    //     </ul>
    //   </div>
    //   <div className="profile">
    //     <div
    //       className={isFocused ? "divSearch active" : "divSearch"}
    //       onClick={() => setInputActive("inputActive")}
    //     >
    //       <input
    //         type="text"
    //         onFocus={handleFocus}
    //         onBlur={handleBlur}
    //         className="input"
    //         placeholder="Search"
    //       />
    //       {/* <FaSearch className="iconSearch" style={{fontSize: "18px"}}/>                */}
    //       <SvgIcon iconName={"icon_search"} className="iconSearch" />
    <header className="header">
      <div className="container">
        <div className="menu">
          <ul>
            <h1 className="logoMov" onClick={() => navigate(HOME)}>
              MOVIA.TO
            </h1>
            <li>
              <span style={{ cursor: "pointer" }} onClick={() => navigate("/films")}>Films</span>
              <div className="tooltip_container">
                <div className="tooltip">
                  <div className="tooltip_categories_section">
                    <h3>CATEGORIES</h3>
                    <ul>
                      <li>Films</li>
                      <li>Series</li>
                      <li>TV-shows</li>
                      <li>Cartoons</li>
                    </ul>
                  </div>
                  <div className="dividing_line"></div>
                  <div className="tooltip_genres_section">
                    <h3>GENRES</h3>
                    <div className="columns_of_genres">
                      <ul>
                        <li>Horror</li>
                        <li>Comedy</li>
                        <li>Drama</li>
                        <li>Animation</li>
                        <li>Historical</li>
                        <li>Crime</li>
                        <li>Romance</li>
                        <li>Action</li>
                        <li>Fantasy</li>
                      </ul>

                      <ul>
                        <li>Musical</li>
                        <li>Adventure</li>
                        <li>Documentary</li>
                        <li>Mystery</li>
                        <li>Thriller</li>
                        <li>Sci-Fir</li>
                      </ul>
                    </div>
                  </div>
                  <div className="dividing_line"></div>

                  <div className="tooltip_country_section">
                    <h3>COUNTRY</h3>
                    <div className="tooltip_country_section">
                      <div className="columns_of_countries">
                        <ul>
                          <li>United Kingdom</li>
                          <li>United States</li>
                          <li>Netherlands</li>
                          <li>Germany</li>
                          <li>Russia</li>
                          <li>Norway</li>
                          <li>Austria</li>
                          <li>Hungary</li>
                          <li>France</li>
                        </ul>

                        <ul>
                          <li>Argentina</li>
                          <li>Belgium</li>
                          <li>Canada</li>
                          <li>Spain</li>
                          <li>Japan</li>
                          <li>Italy</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="dividing_line"></div>

                  <div className="tooltip_decades_section">
                    <h3>DECADES</h3>
                    <ul>
                      <li>2020s</li>
                      <li>2010s</li>
                      <li>2000s</li>
                      <li>1990s</li>
                      <li>1980s</li>
                      <li>1970s</li>
                      <li>1960s</li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>

            <li style={{ cursor: "pointer" }}> Community </li>
          </ul>
        </div>
        <div className="profile">
          <div className={isFocused ? "divSearch active" : "divSearch"} onClick={() => setInputActive("inputActive")}>
            <input type="text" onFocus={handleFocus} onBlur={handleBlur} className="input" placeholder="Search" />
            {/* <FaSearch className="iconSearch" style={{fontSize: "18px"}}/>                */}
            <SvgIcon iconName={"icon_search"} className="iconSearch" />
          </div>
          <div className="divIcons">
            <IoNotificationsOutline className="icon" style={{ cursor: "pointer" }} />
            <div className="divProfile">
              <CgProfile
                className="icon"
                style={{ cursor: "pointer", listStyle: "none" }}
                onClick={() => setIcon2((val) => !val)}
              />
              <li id="ic" style={{ cursor: "pointer", listStyle: "none" }} onClick={() => setIcon2((val) => !val)}>
                {" "}
                {icon2 ? <IoIosArrowDown /> : <IoIosArrowUp />}{" "}
              </li>
              <div className={!icon2 ? "profileMain displayProfile" : "profileMain"}>
                <div>
                  <img src={avatar} height={40} style={{ fontSize: "40px" }} />
                  <p style={{ fontSize: "13px" }}>Name Surname </p>
                  <a>Settings</a>
                </div>
                {isLoggedIn && (
                  <div className="profile-main-features">
                    <div onClick={() => navigate("/list")}>
                      <FaRegHeart />
                      <p style={{ fontSize: "14px" }} className="item-profile-row">
                        Favorites
                      </p>
                    </div>
                    <div onClick={() => navigate("/list")}>
                      <BiBookmark />
                      <p style={{ fontSize: "14px" }} className="item-profile-row">
                        Watchlist
                      </p>
                    </div>
                    <div onClick={() => navigate("/list")}>
                      <MdOutlineLocalActivity />
                      <p style={{ fontSize: "14px" }} className="item-profile-row">
                        My Activity
                      </p>
                    </div>
                    <div onClick={() => navigate("/list")}>
                      <SvgIcon height={15} iconName={"icon_list"} />
                      <p style={{ fontSize: "14px" }} className="item-profile-row">
                        My Lists
                      </p>
                    </div>
                  </div>
                )}
                <div>
                  <div
                    onClick={() => {
                      if (isLoggedIn) {
                        localStorage.removeItem("isLoggedInUser");
                        return navigate(LOGIN);
                      } else {
                        return navigate(LOGIN);
                      }
                    }}
                  >
                    <PiSignOutBold />
                    <p style={{ fontSize: "15px" }} className="item-profile-row">
                      {isLoggedIn ? "Sign Out" : "Sign In"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* </div> */}
    </header>
  );
};

export default HeaderForm;
