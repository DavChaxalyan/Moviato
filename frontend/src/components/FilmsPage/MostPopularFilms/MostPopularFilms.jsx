import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./style.css";
import { API_KEY, BASE_URL, IMAGE_BASE_URL, POSTER_SIZE_500 } from "../../../config/config";
import filmRateScales from "../../ChoosePopUp/RateScaleList/filmRateScale";
import axios from "axios";
import styles from "./style.module.css";
import SvgIcon from "../../SvgIcon/SvgIcon";
import { useNavigate } from "react-router-dom";
import { addToFavorites, getFavorites } from "../../../api/favorite/favorite";
import { useAppContext } from "../../../context api/useAppContext";
import { addToWatchlists, getWatchlists } from "../../../api/watchlist/watchlist";
import { isWatchlistMovieUser } from "../../../hooks/isWatchlistMovieUser";
import { isFavoriteMovieUser } from "../../../hooks/isFavoriteMovieUser";

export default function () {
  const navigate = useNavigate();
  const { watchlist, setWatchlist, favorites, setFavorites, loading } = useAppContext();
  const [movies, setMovies] = useState([]);
    const [message, setMessage] = useState("");

  const addFavoriteItem = async (data) => {
    try {
      const response = await addToFavorites(data);
      setMessage(response.message);

      const updatedFavorites = await getFavorites();
      setFavorites(updatedFavorites);
    } catch (error) {
      setMessage(error);
    }
  };
  const addWatchlistItem = async (data) => {
    try {
      const response = await addToWatchlists(data);
      setMessage(response.message);

      const updatedWatchlists = await getWatchlists();
      setWatchlist(updatedWatchlists);
    } catch (error) {
      setMessage(error);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${BASE_URL}movie/popular?api_key=${API_KEY}`);
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
    <div className={styles.most_popular_films}>
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
              <div className={`${styles.overlay} ${styles.left} ${styles.svg_container}`}>
                <div
                  className={styles.icon_favorit}
                  onClick={(e) => {
                    e.stopPropagation();
                    addFavoriteItem(movie);
                  }}
                >
                  <SvgIcon
                    iconName={isFavoriteMovieUser(movie?.id, favorites) ? "icon_favorite_selected" : "icon_favorite"}
                    className={styles.svg_icon}
                  />
                </div>
                <div
                  className={styles.icon_sav}
                  onClick={(e) => {
                    e.stopPropagation();
                    addWatchlistItem(movie);
                  }}
                >
                  <SvgIcon iconName={isWatchlistMovieUser(movie?.id, watchlist) ? "icon_save_selected" : "icon_save"} className={styles.svg_icon} />
                </div>
              </div>
              <div className={styles.film_info_container}>
                <div className={styles.film_rate_info}>
                  <p>
                    {filmRateScales.map((icon) => {
                      if (movie.vote_average >= icon.minRate && movie.vote_average < icon.maxRate) {
                        return <SvgIcon iconName={icon.iconTitle} />;
                      }
                    })}
                  </p>
                  <p> {movie?.vote_average.toString().slice(0, 3)}</p>
                </div>
                <div className={styles.film_title}>
                  <h2>{movie.title}</h2>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
