import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "../MostPopularFilms/style.css";

import {
  API_KEY,
  BASE_URL,
  IMAGE_BASE_URL,
  POSTER_SIZE_500,
} from "../../../config/config";
import axios from "axios";
import styles from "../MostPopularFilms/style.module.css";
import SvgIcon from "../../SvgIcon/SvgIcon";
import { truncate } from "../../MoviesForYou/truncate";
import { useNavigate } from "react-router-dom";

export default function ComingSoonFilms() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [isToggled, setIsToggle] = useState(false);
  const [isToggled2, setToggle2] = useState(false);

  const changeIcon = () => {
    setIsToggle(!isToggled);
  };
  const changeIcon2 = () => {
    setToggle2(!isToggled2);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}movie/upcoming?api_key=${API_KEY}`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const settings = {
    className: `${styles.class}`,
    centerMode: true,
    infinite: true,
    centerPadding: "100px",
    slidesToShow: 4,
  };

  return (
    <div className={styles.most_popular_films} style={{ marginTop: "20px" }}>
      <div className={styles.slide_container}>
        <div className={styles.movie_fog}></div>
        <Slider {...settings}>
          {movies.map((movie) => (
            <div className={styles.movie_card} key={movie.id} onClick={() => navigate("/movie/" + movie.id)}>
              <img
                className={styles.movie_img}
                src={`${IMAGE_BASE_URL}${POSTER_SIZE_500}${movie.poster_path}`}
                style={{ width: "220px", height: "300px" }}
                alt={movie.title}
              />
              <div
                className={`${styles.overlay} ${styles.left} ${styles.svg_container}`}
              >
                {/* <div className={styles.ics} onClick={changeIcon}>
                  <SvgIcon iconName="icon_time" className={styles.svg_icon} />
                </div>
                <div className={styles.ics1} onClick={changeIcon2}>
                  <SvgIcon
                    iconName={isToggled2 ? "icon_favorite" : "icon_save"}
                    className={styles.svg_icon}
                  />
                </div> */}
                <div className={styles.icon_favorit} onClick={changeIcon}>
                  <SvgIcon
                    iconName={isToggled ? "icon_time_selected" : "icon_time"}
                    className={styles.svg_icon}
                  />
                </div>
                <div className={styles.icon_sav} onClick={changeIcon2}>
                  <SvgIcon
                    iconName={isToggled2 ? "icon_save_selected" : "icon_save"}
                    className={styles.svg_icon}
                  />
                </div>
              </div>
              <div className={styles.film_info_container}>
                <div className={styles.film_title}>
                  <h2>{truncate(movie.title)}</h2>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
