import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { API_KEY, BASE_URL, IMAGE_BASE_URL, POSTER_SIZE_500 } from "../../config/config";

import SwiperCore from 'swiper/core';
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import 'swiper/swiper-bundle.css';
import axios from "axios";
import "./styles.css";
import { Link } from "react-router-dom";

SwiperCore.use([Navigation, Pagination]);  // Initialize Swiper core with required modules
const FreshPicks = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          // `${BASE_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
          `${BASE_URL}movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <section className="ItemFreshPicks">
      <p style={{ color: "#f5f5f5", fontSize: "var(--m-size)", fontFamily: "var(--font-family)" }}>
        Fresh Picks
      </p>
      <div className="ItemFreshText">
        <p>2024 arrivals</p>
        {/* <span>SEE ALL</span> */}
      </div>
      <div className="ItemSlideShadowLeft"></div>
      <div className="ItemSlideShadowRight"></div>
      <Swiper
        slidesPerView={5}
        spaceBetween={24}
        navigation
        loop
        modules={[Navigation, Pagination]}
        className="mySwiper"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Link to={`/movie/${movie.id}`} style={{color:"inherit"}}>
            <img src={`${IMAGE_BASE_URL}${POSTER_SIZE_500}${movie.poster_path}`} alt={movie.title} />
            <div className="itemImgText">
              <p>{movie.title}</p>
              <span></span>
            </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default FreshPicks;







