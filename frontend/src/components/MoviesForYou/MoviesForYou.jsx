import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { truncate } from "./truncate";
import filmRateScales from "../ChoosePopUp/RateScaleList/filmRateScale";
import {
  API_KEY,
  BASE_URL,
  IMAGE_BASE_URL,
  POSTER_SIZE_500,
} from "../../config/config";
import axios from "axios";
import SvgIcon from "../SvgIcon/SvgIcon";
import { useNavigate } from "react-router-dom";

export default function MoviesForYou({ onSuggest,suggestMovies }) {

  const navigate = useNavigate();
  const [popularMovies, setPopularMovies] = useState(suggestMovies);
  const [isToggled, setIsToggle] = useState(true);
  const [isToggled2, setToggle2] = useState(true);

  const changeIcon = () => {
    setIsToggle(!isToggled);
  };
  const changeIcon2 = () => {
    setToggle2(!isToggled2);
  };



  return (
    <div className={styles.MoviesForYou}>
      <div className={styles.movies_for_you_title}>
        <h2>Movies for You</h2>
      </div>
      <div className={styles.movies_for_you_list}>
        {popularMovies.map((movie, index) => (
          <ul key={movie.id}>
            <li onClick={() => navigate("/movie/" + movie.id)}>
              <div className={styles.movie_imgs}>
                <img
                  src={`${IMAGE_BASE_URL}${POSTER_SIZE_500}${movie.poster_path}`}
                  alt={movie.original_title}
                  style={{ width: "180px" }}
                />

                <div
                  className={`${styles.overlay} ${styles.left} ${styles.svg_container}`}
                >
                  <div className={styles.ics} onClick={changeIcon}>
                    <SvgIcon
                      iconName={isToggled ? "icon_save" : "icon_favorite"}
                      className={styles.svg_icon}
                    />
                  </div>
                  <div className={styles.ics1} onClick={changeIcon2}>
                    <SvgIcon
                      iconName={isToggled2 ? "icon_favorite" : "icon_save"}
                      className={styles.svg_icon}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.movie_rating}>
                <div className={styles.movie_rating_scale}>
                  <div className={styles.movie_star_icon}>
                    <p>
                      {filmRateScales.map((icon) => {
                        if (
                          movie.vote_average >= icon.minRate &&
                          movie.vote_average < icon.maxRate
                        ) {
                          return <SvgIcon iconName={icon.iconTitle} />;
                        }
                      })}
                    </p>
                  </div>
                  <div className={styles.movie_rate_value}>
                    {movie?.vote_average.toString().slice(0, 3)}
                  </div>
                </div>
                <div className={styles.movies_names}>
                  <h4>{truncate(movie?.title, 15)}</h4>
                </div>
              </div>
            </li>
          </ul>
        ))}
      </div>
      <div className={styles.btn_skip}>
        <button onClick={(e) => {
              e.stopPropagation();
              onSuggest();
            }} 
            className={styles.button_skip}>
          Skip
        </button>
      </div>
    </div>
  );
}
