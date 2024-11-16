import React, { useEffect, useState } from "react";
import { API_KEY, BASE_URL } from "../../config/config";
import SvgIcon from "../SvgIcon/SvgIcon";

import "./style.css";

const FavoriteGenresPopup = ({ onNext, onSkip, setInterests}) => {
  const [genres, setGenres] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const hasSelectedGenre = selectedGenres.length > 0;

  const genresId = [
    "27",
    "35",
    "18",
    "16",
    "36",
    "80",
    "10749",
    "28",
    "14",
    "99",
    "10402",
    "9648",
    "53",
    "12",
    "10765",
  ];

  const getMovieTvDate = async () => {
    try {
      const response = await fetch(`${BASE_URL}genre/movie/list?api_key=${API_KEY}`);
      const { genres } = await response.json();
      setGenres(genres);
    } catch (error) {
      console.log("error :", error);
    }
  };

  const getMovie = async (selectedGenres) => {
    try {
      const response = await fetch(`${BASE_URL}discover/movie?api_key=${API_KEY}&with_genres=${selectedGenres.join(", ")}`);
      const { results } = await response.json();
      
      setInterests((prev) => {
        return {
          ...prev,
          genresId: selectedGenres,
          genresMovies:results
        }
      })
      onNext();
    } catch (error) {
      console.log("error :", error);
    }
  }
  useEffect(() => {
    getMovieTvDate();
  }, []);

  const toggleGenre = (id) => {
    if (selectedGenres.includes(id)) {
      setSelectedGenres(selectedGenres.filter((genreId) => genreId !== id));
    } else {
      if (selectedGenres.length < 4) {
        setSelectedGenres([...selectedGenres, id]);
      } else {
        // You can provide some feedback to the user that they can't select more genres
        console.log("Maximum 4 genres can be selected");
        // Or you can handle it in a different way, like displaying a message to the user
      }
    }
  };

  return (
    <div className="favorite-genres-popup-main">
      <div className="favorite-genres-popup-title-div">
        <h1 className="favorite-genres-popup-title">Edit my Interests</h1>
      </div>
      <div className="favorite-genres-popup-question-select-div">
        <div className="favorite-genres-popup-question-div">
          <p>Do you have favorite genres? Select them here. </p>
        </div>
        <div className="favorite-genres-popup-select-div">
          <div className="active-div-popup"></div>
          <div className="not-active-popup"></div>
          <div className="not-active-popup"></div>
        </div>
      </div>
      <div className="favorite-genres-popup-genres-div">
        {genres &&
          genres
            .filter((genre) => genresId.includes(genre.id.toString()))
            .map((genre) => (
              <button
                key={genre.id}
                onClick={() => toggleGenre(genre.id)}
                className={selectedGenres.includes(genre.id) ? "isActiveButton" : ""}
              >
                {genre.name}
              </button>
            ))}
      </div>
      <div className="div-skip-next">
        <div className="div-skip">
          <a
            onClick={(e) => {
              e.stopPropagation();
              onSkip();
            }}
          >
            Skip
          </a>
        </div>
        <div className="div-next" style={{ cursor: hasSelectedGenre ? "pointer" : "default" }}>
          <a
            onClick={(e) => {
              e.stopPropagation();
              if (hasSelectedGenre) {
                
                getMovie(selectedGenres)
                
              } 
             
            }}
            style={{ cursor: hasSelectedGenre ? "pointer" : "default" }}
            className={hasSelectedGenre ? "isActiveGenres" : "nextt"}
          >
            Next
          </a>
          <SvgIcon iconName={"icon_arrow_right"} className={hasSelectedGenre ? "isActiveIcon" : "icon_arrow_right"} />
        </div>
      </div>
    </div>
  );
};

export default FavoriteGenresPopup;
