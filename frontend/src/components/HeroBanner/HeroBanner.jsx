import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import heroImg from "../../assets/images/hero.png";
import "./style.swiper.css";
import {
  API_KEY,
  BACK_SIZE_1280,
  BASE_URL,
  IMAGE_BASE_URL,
} from "../../config/config";
import { Link } from "react-router-dom";
const HeroBanner = () => {
  const [data, setData] = useState([]);
  const getMovieTvDate = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}movie/popular?api_key=${API_KEY}&page=${1}`
      );
      const { results } = await response.json();
      setData(results);
    } catch (error) {
      console.log("error :", error);
    }
  };
  useEffect(() => {
    getMovieTvDate();
  }, []);
  return (
    <section className="main-container">
      <div className="container-swiper">
        <Swiper
          loop={true}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          speed={500}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 390,
            modifier: 3,
            slideShadows: true,
          }}
          initialSlide={2}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
        >
          {data?.slice(0, 5).map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <Link to={`/movie/${item.id}`} style={{color:"inherit"}}>
                <div className="swiper-image">
                  <img
                    className="image"
                    src={`${IMAGE_BASE_URL}${BACK_SIZE_1280}${item.backdrop_path}`}
                  />
                </div>
                <div className="swiper-info">
                  <div className="swiper-title">
                    <h2>{item.title}</h2>
                    <p>{new Date(item.release_date).getFullYear()}</p>
                  </div>
                  <p className="swiper-desc">
                    {item.overview.length > 160
                      ? `${item.overview.slice(0, 160)}...`
                      : item.overview}
                  </p>
                </div>

                </Link>
              </SwiperSlide>
            );
          })}
          <div className="swiper-pagination"></div>
        </Swiper>
      </div>
    </section>
  );
};

export default HeroBanner;
