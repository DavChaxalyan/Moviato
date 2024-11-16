import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import TextHead from "../TextHead/TextHead";
import movieQuizImg from "../../assets/images/movieQuiz.png";

// Styles
import styles from "./style.module.css";
import "swiper/css";
import "swiper/css/navigation";

import { FreeMode, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

const QuizItem = ({
  title = "Take the Quiz",
  imgUrl = movieQuizImg,
  question = "What is the Movie?",
  questionDesc = "Where are these shots from?",
  href = "#",
}) => {
  return (
    <Link to={href} className={styles.quizCard}>
      <div className={styles.quizHead}>
        <img src={imgUrl} alt={title} />
        <p>{title}</p>
      </div>
      <div className={styles.quizBody}>
        <h2>{question}</h2>
        <p>{questionDesc}</p>
      </div>
    </Link>
  );
};

const QuizSlider = () => {
  return (
    <section className="main-container">
      <TextHead
        title="It’s Quiz Time"
        desc="Challenge the cinematographer in You!"
      />
      <Swiper
        slidesPerView={4.5}
        spaceBetween={25}
        navigation={true}
        modules={[FreeMode, Navigation]}
        className={styles.quizSwiper}
      >
        {[...Array(25)].map((_) => {
          return (
            <SwiperSlide key={Math.random()}>
              <QuizItem
                key={Math.random()}
                title="Take the Quiz"
                question="What is the Movie?"
                questionDesc="Where are these shots from?"
                imgUrl={movieQuizImg}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default QuizSlider;
