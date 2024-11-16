import React from "react";
import FreshPicksForm from "../../components/FreshPicksForm/FreshPicksForm";
import { useState } from "react";
import { useEffect } from "react";
import HeaderForm from "../../components/HeaderForm/HeaderForm";
import HeroBanner from "../../components/HeroBanner";
import { MagicSuggestButton } from "../../components/MagicSuggestButton";
import { InterestsButton } from "../../components/InterestsButton";
import PopularCollectionsForm from "../../components/PopularCollectionsForm/PopularCollectionsForm";
import ArticleBox from "../../components/ArticleBox";
import RecentActivity from "../../components/Recentactivity/RecentActivity";
import QuizSlider from "../../components/QuizSlider";
import MagicSuggestIcon from "../../components/MagicButton/MagicButton";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 700) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  return (
    <div className="main-container">
      <HeroBanner />
      <MagicSuggestButton />
      <InterestsButton />
      <FreshPicksForm />
      <PopularCollectionsForm />
      <ArticleBox />
      <RecentActivity />
      <QuizSlider />
      {isVisible && (
        <div className="top">
          <MagicSuggestIcon />
        </div>
      )}
    </div>
  );
};

export default Home;
