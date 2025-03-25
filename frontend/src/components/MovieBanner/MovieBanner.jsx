import React, { useEffect, useState } from "react";
import { API_KEY, BACK_SIZE_1280, BASE_URL, IMAGE_BASE_URL } from "../../config/config";
import styles from "./style.module.css";
import { Link } from "react-router-dom";
import SvgIcon from "../SvgIcon/SvgIcon";
import Triller from "../Triller/Triller";
import { addToFavorites, getFavorites } from "../../api/favorite/favorite";
import { addToWatchlists, getWatchlists } from "../../api/watchlist/watchlist";
import { useAppContext } from "../../context api/useAppContext";
import { isFavoriteMovieUser } from "../../hooks/isFavoriteMovieUser";
import { getTime } from "../../hooks/getTime";
import { isWatchlistMovieUser } from "../../hooks/isWatchlistMovieUser";

const MovieBanner = ({ id, type = "movie", title = "harry" }) => {
  const { watchlist, setWatchlists, favorites, setFavorites, loading } = useAppContext();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchlist, setIsWatchlist] = useState(false);
  const [userFavorites, setUserFavorites] = useState(favorites || []);
  const [userWatchlists, setUserWatchlists] = useState(watchlist || []);
  const [date, setDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isShare, setIsShare] = useState(false);
  const [message, setMessage] = useState("");

  const getMovieTvDate = async () => {
    try {
      const response = await fetch(`${BASE_URL}movie/${id}?api_key=${API_KEY}&page=${1}`);
      const date = await response.json();
      setDate(date);
    } catch (error) {
      console.log("error :", error);
    }
  };

  const handleAddToFavorites = async () => {
    try {
      const response = await addToFavorites(date);
      setMessage(response.message);

      const updatedFavorites = await getFavorites();
      setUserFavorites(updatedFavorites);
      setFavorites(updatedFavorites);
      setIsFavorite(isFavoriteMovieUser(date?.id, updatedFavorites));
    } catch (error) {
      setMessage(error);
    }
  };

  const handleAddToWatchlists = async () => {
    try {
      const response = await addToWatchlists(date);
      setMessage(response.message);

      const updatedWatchlists = await getWatchlists();
      setUserWatchlists(updatedWatchlists); 
      setWatchlists(updatedWatchlists);
      setIsWatchlist(isWatchlistMovieUser(date?.id, updatedWatchlists));
    } catch (error) {
      setMessage(error);
    }
  };

  useEffect(() => {
    setIsFavorite(isFavoriteMovieUser(date?.id, userFavorites));
  }, [date?.id, userFavorites]);

  useEffect(() => {
    setIsWatchlist(isWatchlistMovieUser(date?.id, userWatchlists));
    console.log(isWatchlist, userWatchlists, "watchlistssssssssssssssssssssssssssssssssss");
  }, [date?.id, userWatchlists]);

  useEffect(() => {
    if (id) {
      getMovieTvDate();
    }
  }, [id]);
  if (date === null) {
    return "loading...";
  }
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to bottom, rgb(0 10 21 / 0%), rgb(0 10 21 / 86%)), url(${
          IMAGE_BASE_URL + BACK_SIZE_1280 + date.poster_path
        })`,
      }}
      className={styles.banner}
    >
      <div className="main-container">
        <div className={styles.breadcrumb}>
          <ul>
            <li>
              <Link to="/">Home Page</Link>
            </li>
            <li>
              <SvgIcon iconName={"icon_arrow_right"} width={"24px"} height={"24px"} />
            </li>
            <li>
              {/* <Link to={`/${type}`}>{type}</Link> */}
              <Link to={`/films`}>{type}</Link>
            </li>
            <li>
              <SvgIcon iconName={"icon_arrow_right"} width={"24px"} height={"24px"} />
            </li>
            <li>
              <span>{date.title || date.name}</span>
            </li>
          </ul>
        </div>
        <div className={styles.content}>
          <h1>{date.title || date.name}</h1>
          <div className={styles.info}>
            <div className={styles.rating}>
              <p>
                {date.vote_average?.toFixed(1)} <span>Rating</span>
              </p>
            </div>
            <div className={styles.date}>2011</div>
            <div className={styles.genres}>
              {date?.genres?.map((item) => (
                <p key={item.id}>{item.name}</p>
              ))}
            </div>
            <div className={styles.time}>{getTime(date?.runtime)}</div>
          </div>
          <div className={styles.overview}>{date?.overview?.slice(0, 120)}...</div>

          <div className={styles.btnWrap}>
            <button className={styles.watchBtn} onClick={() => setIsOpen(true)}>
              <SvgIcon iconName="icon_play" width={19} height={22} />
              Watch Trailer
            </button>
            {isOpen && <Triller id={id} onClose={() => setIsOpen(false)} />}
            <button onClick={handleAddToWatchlists}>
              {isWatchlistMovieUser(date?.id, watchlist) ? "yesssss" : <SvgIcon iconName={"icon_save"} width={24} height={24} />}
            </button>
            <button onClick={handleAddToFavorites}>
              {isFavoriteMovieUser(date?.id, favorites) ? (
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="rgba(34, 209, 204)"
                  viewBox="0 0 24 24"
                >
                  <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                  <mask
                    id="mask0_3044_1152"
                    style={{ maskType: "alpha" }}
                    maskUnits="userSpaceOnUse"
                    x={0}
                    y={0}
                    width={24}
                    height={24}
                  >
                    <rect width={24} height={24} fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_3044_1152)">
                    <path
                      d="M12 21L10.55 19.7248C8.86667 18.2371 7.475 16.9537 6.375 15.8747C5.275 14.7956 4.4 13.827 3.75 12.9687C3.1 12.1104 2.64583 11.3215 2.3875 10.6022C2.12917 9.88283 2 9.14714 2 8.3951C2 6.85831 2.525 5.57493 3.575 4.54496C4.625 3.51499 5.93333 3 7.5 3C8.36667 3 9.19167 3.17984 9.975 3.53951C10.7583 3.89918 11.4333 4.40599 12 5.05995C12.5667 4.40599 13.2417 3.89918 14.025 3.53951C14.8083 3.17984 15.6333 3 16.5 3C18.0667 3 19.375 3.51499 20.425 4.54496C21.475 5.57493 22 6.85831 22 8.3951C22 9.14714 21.8708 9.88283 21.6125 10.6022C21.3542 11.3215 20.9 12.1104 20.25 12.9687C19.6 13.827 18.725 14.7956 17.625 15.8747C16.525 16.9537 15.1333 18.2371 13.45 19.7248L12 21ZM12 18.3515C13.6 16.9455 14.9167 15.7398 15.95 14.7343C16.9833 13.7289 17.8 12.8542 18.4 12.1104C19 11.3665 19.4167 10.7044 19.65 10.124C19.8833 9.5436 20 8.9673 20 8.3951C20 7.41417 19.6667 6.59673 19 5.94278C18.3333 5.28883 17.5 4.96185 16.5 4.96185C15.7167 4.96185 14.9917 5.17847 14.325 5.61172C13.6583 6.04496 13.2 6.59673 12.95 7.26703H11.05C10.8 6.59673 10.3417 6.04496 9.675 5.61172C9.00833 5.17847 8.28333 4.96185 7.5 4.96185C6.5 4.96185 5.66667 5.28883 5 5.94278C4.33333 6.59673 4 7.41417 4 8.3951C4 8.9673 4.11667 9.5436 4.35 10.124C4.58333 10.7044 5 11.3665 5.6 12.1104C6.2 12.8542 7.01667 13.7289 8.05 14.7343C9.08333 15.7398 10.4 16.9455 12 18.3515Z"
                      fill="#F5F5F5"
                    />
                  </g>
                </svg>
              )}
            </button>
            <button onClick={() => setIsShare((prev) => !prev)}>
              <SvgIcon iconName={"icon_share"} width={20} height={20} />

              {isShare && (
                <div className={styles.shareWrap}>
                  <div className={styles.shareContent}>
                    <div className={styles.shareItem}>
                      <span>Tweet a link</span>
                      <SvgIcon iconName={"icon_twitter"} />
                    </div>
                    <div className={styles.shareItem}>
                      <span>Share to facebook</span>
                      <SvgIcon iconName={"icon_facebook"} />
                    </div>
                    <div className={styles.shareItem}>
                      <span>Copy link</span>
                      <SvgIcon iconName={"icon_copy"} />
                    </div>
                  </div>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieBanner;
