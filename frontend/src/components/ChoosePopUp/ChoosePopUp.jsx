import React, { useState } from "react";
import SvgIcon from "../SvgIcon/SvgIcon";
import rateScaleList from "./RateScaleList/filmRateScale";
import "./style.css";
import { API_KEY, BASE_URL, IMAGE_BASE_URL, POSTER_SIZE_500 } from "../../config/config";

export default function ChoosePopUp({ onNext, onSkip,genresMovies,setInterests }) {
  console.log(genresMovies)
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [notInterestedMovies, setNotInterestedMovies] = useState([]);
  const [overlayStates, setOverlayStates] = useState([true, true, true, true]);

  const handleButtonClick = (index) => {
    const newOverlayStates = [...overlayStates];
    newOverlayStates[index] = false;
    setOverlayStates(newOverlayStates);
  };

  const handleWatchedClick = (movieId) => {
    if (!watchedMovies.includes(movieId)) {
      setWatchedMovies([...watchedMovies, movieId]);
      setNotInterestedMovies(notInterestedMovies.filter((id) => id !== movieId));
    }
  };

  const handleNotInterestedClick = (movieId) => {
    if (!notInterestedMovies.includes(movieId)) {
      setNotInterestedMovies([...notInterestedMovies, movieId]);
      setWatchedMovies(watchedMovies.filter((id) => id !== movieId));
    }
  };
  function getRandomObjectsWithId(data, count) {
    const ids = [];
    const cast = [];
  
    while (ids.length < count) {
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomPerson = data[randomIndex];
      const randomActorIndex = Math.floor(Math.random() * randomPerson.length);
      const randomObject = randomPerson[randomActorIndex];
      
      if (!ids.includes(randomObject.id)) {
        ids.push(randomObject.id);
        cast.push(randomObject);
      }
    }
  
    return { id: ids, cast: cast };
  }
  const handleActors = async (watchedMovies) => {

    const allMovieDetails = await Promise.all(watchedMovies.map(async id => {
      const response = await fetch(`${BASE_URL}movie/${id}?api_key=${API_KEY}&append_to_response=credits`);
        const data = await response.json();
        return data.credits.cast.slice(0,10)
    }));
    const randomIds = getRandomObjectsWithId(allMovieDetails, 8);
    console.log(randomIds)
    setInterests(prev => {
      return {
        ...prev,
        actorId:randomIds.id,
        movieActors:randomIds.cast,
      }
    })
    onNext()
  }
  const movies = {
    1: { name: "Coco", rate: 8.4 },
    2: { name: "Interstellar", rate: 8.7 },
    3: { name: "Harry Potter and the...", rate: 7.6 },
    4: { name: "Don't Worry Darling", rate: 6.3 },
  };

  const CalculateSmile = (rating) => {
    const RatingSmile = [
        "icon_veryUnsatisfiedSmile",
        "icon_unsatisfiedSmile",
        "icon_neutralSmile",
        "icon_satisfiedSmile",
        "icon_verySatisfiedSmile",
    ];
   
    rating = Math.floor(rating / 2);
    rating = rating === 5 ?  RatingSmile.length - 1 : rating;
    return RatingSmile[rating];
};
  return (
    <div className="ChoosePopUp">
      <div className="ChoosePopUp_container">
        <div className="choosePopUp_title">
          <h1>Choose</h1>
        </div>
        <div className="choosePopUp_Levels">
          <div className="level_1"></div>
          <div className="level_2"></div>
          <div className="level_3"></div>
        </div>
        <div className="choosePopUp_FilmsList">
          <ul>
            {genresMovies.slice(0,4).map((movie, index) => (
              <li key={movie.id}>
                <div className="film_container image-container">
                  <div className="film_container_image">
                    <img
                     src={`${IMAGE_BASE_URL}${POSTER_SIZE_500}${movie.poster_path}`} alt={movie.title}
                      className={overlayStates[index] ? "" : "brightness-adjusted"}
                    />
                    <div className={` ${overlayStates[index] ? "film_additional_info" : "overlay-static"}`}>
                      <button
                        className={`btn_watched ${watchedMovies.includes(movie.id) ? "active" : ""}`}
                        onClick={() => {
                          handleWatchedClick(movie.id);
                          handleButtonClick(index);
                        }}
                      >
                        I've Watched
                      </button>
                      <button
                        className={`btn_not_interested
                          ${notInterestedMovies.includes(movie.id) ? "active" : ""}`}
                        onClick={() => {
                          handleNotInterestedClick(movie.id);
                          handleButtonClick(index);
                        }}
                      >
                        Not Interested
                      </button>
                    </div>
                    <div className="film_rate_star">
                      <p>
                      <SvgIcon iconName={CalculateSmile(movie.vote_average)} />
                      </p>
                 
                      
                      <div className="film_rate_value">
                        <p>{movie.vote_average}</p>
                      </div>
                    </div>
                    <div className="film_container_titleOfFilm">
                      <h3>{movie.title.slice(0,15)}...</h3>{" "}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="skip_and_next_btns">
          <div className="btn_skip">
            <button onClick={onSkip} className="button_skip">
              Skip
            </button>
          </div>
          <div className="btn_next">
            <button onClick={()=> {
              handleActors(watchedMovies)
            }} className="button_next">
              Next <SvgIcon iconName={"icon_arrow_right2"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
