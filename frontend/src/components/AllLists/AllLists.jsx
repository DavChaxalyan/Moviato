import React, { useState } from "react";
import classes from "./styles.module.css";
import HeaderForm from "../HeaderForm/HeaderForm";
import SvgIcon from "../SvgIcon/SvgIcon";

import watchlistData from "../../assets/data/watchlistData/watchlistData";
import favoritesData from "../../assets/data/favoritesData/favoritesData";
import listsData from "../../assets/data/listsData/listsData";
import activityData from "../../assets/data/activityData/activityData";
import { useParams } from "react-router-dom";

const AllLists = () => {
  // Defined button names
  const buttonName = ["Favorites", "Watchlist", "My Lists", "My Activity"];

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
      categoryData = watchlistData;
      break;
    case 1:
      categoryData = favoritesData;
      break;
    case 2:
      categoryData = showList ? listsData : [];
      break;
    case 3:
      categoryData = activityData;
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
        {categoryData.map((movie, index) => (
          <div className={classes.categoryImg} key={index}>
            <div className={classes.categoryImgChild}>
              <div className={classes.categoryShadowItem}></div>
              <img src={movie.img} alt={movie.title} />
            </div>
            <span>
              <SvgIcon iconName={CalculateSmile(movie.rating)} />
              {movie.rating}
            </span>
            <p>
              <b>{movie.title}</b>
            </p>
          </div>
        ))}
      </div>
      <div className={classes.showMore}>
        {/* <span>SHOW MORE</span> */}
      </div>
    </div>
  );
};

export default AllLists;