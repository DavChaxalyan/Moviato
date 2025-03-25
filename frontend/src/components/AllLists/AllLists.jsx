import React, { useState } from "react";
import classes from "./styles.module.css";
import SvgIcon from "../SvgIcon/SvgIcon";
import { POSTER_SIZE_500, IMAGE_BASE_URL } from "../../config/config";
import useWatchlistsData from "../../assets/data/watchlistData/watchlistData";
import useFavoritesData from "../../assets/data/favoritesData/favoritesData";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const AllLists = () => {
  // Defined button names
  const buttonName = ["Favorites", "Watchlist"];
  const favoritesData = useFavoritesData();
  const navigate = useNavigate();
  const watchlistData = useWatchlistsData();

  // Defined state to track active button and list view
  const id = useParams();
  const [activeButton, setActiveButton] = useState(0);
  const [showList, setShowList] = useState(false);

  // Function to handle button click
  const handleButtonClick = (index) => {
    setActiveButton(index);
    setShowList(index === 2); // Set showList to true only for Lists button
  };

  // Defined a variable to store movie data based on active button
  let categoryData;
  switch (activeButton) {
    case 0:
      categoryData = favoritesData;
      break;
    case 1:
      categoryData = watchlistData;
      break;
    default:
      categoryData = [];
  }

  const CalculateSmile = (rating) => {
    const RatingSmile = [
      "icon_veryUnsatisfiedSmile",
      "icon_unsatisfiedSmile",
      "icon_neutralSmile",
      "icon_satisfiedSmile",
      "icon_verySatisfiedSmile",
    ];
    rating = Math.floor(rating / 2);
    return RatingSmile[rating];
  };

  return (
    <div className={classes.categoryContainer}>
      <div className={classes.allButtons}>
        {buttonName.map((element, index) => (
          <button
            key={index}
            className={activeButton === index ? classes.activeButton : ""}
            onClick={() => handleButtonClick(index)}
          >
            {element}
          </button>
        ))}
      </div>
      <div className={classes.buttonTypes}>
        <p>{buttonName[activeButton]}</p>
      </div>
      <div className={classes.categoryCards}>
        {categoryData.length > 0 ? (
          categoryData.map((movie, index) => (
            <div className={classes.categoryImg} key={index}>
              <div
                className={classes.categoryImgChild}
                onClick={() => {
                  navigate("/movie/" + movie?.movieData?.id);
                }}
              >
                <div className={classes.categoryShadowItem}></div>
                <img
                  src={`${IMAGE_BASE_URL}${POSTER_SIZE_500}${movie?.movieData?.poster_path}`}
                  alt={movie?.movieData?.original_title}
                />
              </div>
              <span>
                <SvgIcon iconName={CalculateSmile((Math.round(movie?.movieData?.vote_average * 10) / 10).toFixed(1))} />
                {(Math.round(movie?.movieData?.vote_average * 10) / 10).toFixed(1)}
              </span>
              <p>
                <b>{movie?.movieData?.original_title}</b>
              </p>
            </div>
          ))
        ) : (
          <div className={classes.emptyState}>
            <h2>Nothing found.</h2>
            <p>It looks like you don't have any movies in this section yet. Add movies to your favorites or watchlist!</p>
            <button onClick={() => navigate("/films")}>Search for movies.</button>
          </div>
        )}
      </div>
      <div className={classes.showMore}>{/* <span>SHOW MORE</span> */}</div>
    </div>
  );
};

export default AllLists;
