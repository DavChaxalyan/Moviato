import React, { useState } from "react";
import Modal from "../Modal";
import ChoosePopUp from "../ChoosePopUp/ChoosePopUp";
import FavoriteGenresPopup from "../FavoriteGenresPopup/FavoriteGenresPopup";
import FavoriteActorsPopup from "../FavoriteActorsPopup/FavoriteActorsPopup";
import MoviesForYou from "../MoviesForYou/MoviesForYou";
// Genres
// https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=124,69

// get 20 movie
// Movie details
//
// random 8 person
// https://api.themoviedb.org/3/movie/movie_id?language=en-US'

// const stepTitle = ["Do you have favorite genres? Select them here.", "Choose", "Pick your favorite actors"];
const InterestModal = ({ close }) => {
  const [step, setStep] = useState(0);

  const [interests, setInterests] = useState({
    genresId: [],
    genresMovies: [],
    movieId: [365, 988],
    movieActors: [],
    actorId: [],
    suggestMovies: [],
  });
  const changeStep = () => {
    setStep((prev) => prev + 1);
  };

  const renderSteps = (step) => {
    if (step === 0) return <FavoriteGenresPopup onNext={changeStep} onSkip={close}  setInterests={setInterests} />;
    if (step === 1) return <ChoosePopUp onNext={changeStep} onSkip={close} genresMovies={interests.genresMovies} setInterests={setInterests} />;
    if (step === 2) return <FavoriteActorsPopup onNext={changeStep} onSuggest={close} movieActors={interests.movieActors} setInterests={setInterests} />;
    if(step === 3) return <MoviesForYou suggestMovies={interests.suggestMovies} onSuggest={close} movieActors={interests.movieActors} setInterests={setInterests} />
  };

  return (
    <div>
      {/* header */}
      <Modal>{renderSteps(step)}</Modal>
      {/* next skip component */}
    </div>
  );
};

export default InterestModal;
