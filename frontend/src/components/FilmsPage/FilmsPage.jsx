import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import MostPopularFilms from "./MostPopularFilms/MostPopularFilms";
import TopRatedFilms from "./TopRatedFilms/TopRatedFilms";
import ComingSoonFilms from "./ComingSoonFilms/ComingSoonFilms";
import { API_KEY, BASE_URL } from "./../../config/config";
import { allGenres } from "./allGenres";
import { allCountries } from "./countries";
import SvgIcon from "../SvgIcon";

export default function FilmsPage() {
  const [genre, setGenre] = useState("");
  const [country, setCountry] = useState("");
  const [voteCount, setVoteCount] = useState("");
  const [page, setPage] = useState(1);
  const [moviesTv, setMoviesTv] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const fetchData = async (genre, country, voteCount, page) => {
    try {
      const res = await fetch(
        `${BASE_URL}discover/movie?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&vote_count.lte=${voteCount}&with_genres=${genre}&with_origin_country=${country}`
      );
      const data = await res.json();
      setMoviesTv((prev) => [...prev, ...data.results]);
    } catch (error) {
      console.log("error :", error);
    }
  };
  useEffect(() => {
    fetchData(genre, country, voteCount, page);
  }, [genre, country, voteCount, page]);

  const toggleGenreSelection = (genreId) => {
    setSelectedGenres((prevSelectedGenres) => {
      const index = prevSelectedGenres.indexOf(genreId);
      if (index !== -1) {
        return prevSelectedGenres.filter((id) => id !== genreId);
      } else {
        return [...prevSelectedGenres, genreId];
      }
    });
  };

  return (
    <div className={styles.Films_Page}>
      <div className={styles.genres_filter_section}>
        <div className={styles.background_image}></div>

        <div className={styles.genres_choose_section}>
          <div className={styles.nav_home_to_films}>
            <p className={styles.nav_text}>
              <span>Home</span>
              <span className={styles.arrow_right_icon}>
                <SvgIcon
                  iconName="icon_arrow_right2"
                  width={"10px"}
                  height={"15px"}
                />
              </span>
              FIlms
            </p>
          </div>
          <div className={styles.filter_section}>
            <div className={styles.container}>
              <div className={styles.line}>
                <ul className={styles.ul_genres1}>
                  {allGenres.slice(0, 9).map((genre) => {
                    const isSelected = selectedGenres.includes(genre.id);
                    return (
                      <li
                        key={genre.id}
                        className={`${styles.lis} ${
                          isSelected ? styles.selectedGenre : ""
                        }`}
                        onClick={() => toggleGenreSelection(genre.id)}
                      >
                        {genre.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className={styles.line}>
                <ul className={styles.ul_genres2}>
                  {allGenres.slice(9, 17).map((genre) => {
                    const isSelected = selectedGenres.includes(genre.id);
                    return (
                      <li
                        key={genre.id}
                        className={`${styles.lis} ${
                          isSelected ? styles.selectedGenre : ""
                        }`}
                        onClick={() => toggleGenreSelection(genre.id)}
                      >
                        {genre.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className={styles.line}>
                <ul className={styles.ul_genres3}>
                  {allGenres.slice(17, 20).map((genre) => {
                    const isSelected = selectedGenres.includes(genre.id);
                    return (
                      <li
                        key={genre.id}
                        className={`${styles.lis} ${
                          isSelected ? styles.selectedGenre : ""
                        }`}
                        onClick={() => toggleGenreSelection(genre.id)}
                      >
                        {genre.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className={styles.bttns}>
              <div className={styles.filter_selection}>
                <form action="">
                  <select
                    name="categories"
                    className={styles.select_option_category}
                  >
                    <option value="categories" className={styles.opt_category}>
                      Categories
                    </option>
                    <option value="films">Films</option>
                    <option value="series">Series</option>
                    <option value="tv_shows">Tv-shows</option>
                    <option value="cartoons">Cartoons</option>
                  </select>
                </form>
                <select name="year" className={styles.select_option_year}>
                  <option value="year" className={styles.opt_year}>
                    Year
                  </option>
                  <option value="upcoming">Upcoming</option>
                  <option value="2020s">2020s</option>
                  <option value="2010s">2010s</option>
                  <option value="2000s">2000s</option>
                </select>

                <select
                  className={styles.select_option_county}
                  value={country}
                  onChange={(e) => setSelectedOption(e.target.value)}
                >
                  Country
                  <option value={""} style={{ width: "200px" }}>
                    Country
                  </option>
                  {allCountries.map((country) => (
                    <option key={country.iso_3166_1} value={country.iso_3166_1}>
                      {country.english_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.buttons_section}>
                <button className={styles.btn_refresh}>Refresh</button>
                <button className={styles.btn_apply}>Apply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.most_popular_films_section}>
        <div className={styles.most_popular_films}>
          <div className={styles.most_popular_films_title}>
            <h2>Most Popular</h2>
          </div>
          <div className={styles.most_popular_films_list}>
            <div className={styles.slider_container}>
              <MostPopularFilms />
            </div>
          </div>
        </div>
        <div
          className={styles.most_popular_films}
          style={{ marginTop: "50px" }}
        >
          <div className={styles.most_popular_films_title}>
            <h2>Top Rated</h2>
          </div>
          <div className={styles.most_popular_films_list}>
            <div className={styles.slider_container}>
              <TopRatedFilms />
            </div>
          </div>
        </div>
        <div
          className={styles.most_popular_films}
          style={{ marginTop: "50px" }}
        >
          <div className={styles.most_popular_films_title}>
            <h2>Coming Soon</h2>
          </div>
          <div className={styles.most_popular_films_list}>
            <div className={styles.slider_container}>
              <ComingSoonFilms />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
