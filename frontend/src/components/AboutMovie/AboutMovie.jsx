import React, { useEffect, useRef, useState } from "react";

import { SwiperSlide, Swiper } from "swiper/react";
import { API_KEY, BACK_SIZE_1280, BASE_URL, IMAGE_BASE_URL } from "../../config/config";
import { EffectCoverflow, Navigation } from "swiper/modules";
import styles from "./style.module.css";
import "swiper/css/navigation";
import "./style.css";
const AboutMovie = ({ id }) => {
  const [date, setDate] = useState(null);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const getMovieTvDate = async () => {
    try {
      const response = await fetch(`${BASE_URL}movie/${id}?api_key=${API_KEY}&append_to_response=images`);
      const date = await response.json();
      setDate(date);
    } catch (error) {
      console.log("error :", error);
    }
  };
  useEffect(() => {
    if (id) {
      getMovieTvDate();
    }
  }, [id]);
  if (date === null) {
    return "loading";
  }
  return (
    <div className={`main-container ${styles.aboutWrap}`}>
      <div className={styles.aboutInfo}>
        <div className={styles.aboutInfoTitle}>
          <h2>About The Movie</h2>
          <p>{date?.overview}</p>
        </div>
        <div className={styles.aboutInfoOther}>
          <h2>Movie Details</h2>
          <div className={styles.aboutInfoOtherItem}>
            <h4>Production Country</h4>
            <p>
              {date?.production_countries?.map((country) => (
                <span key={Math.random()}>{country.name}</span>
              ))}
            </p>
          </div>
          <div className={styles.aboutInfoOtherItem}>
            <h4>Production Companies</h4>
            <p>
              {date?.production_companies?.map((country) => (
                <span key={Math.random()}>{country.name},</span>
              ))}
            </p>
          </div>
          <div className={styles.aboutInfoOtherItem}>
            <h4>Language</h4>
            <span>{date?.original_language}</span>
          </div>
        </div>
      </div>
      <div className={styles.verticalSwiper}>
        <Swiper
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
          direction={"vertical"}
          loop={true}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          className={styles.swiperVerticalWrap}
          // height={900}
          speed={500}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 600,
            modifier: 3,
            slideShadows: true,
          }}
          initialSlide={2}
          modules={[EffectCoverflow]}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = navigationPrevRef.current;
            swiper.params.navigation.nextEl = navigationNextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          
        >
          {date?.images?.backdrops.map((item) => {
            return (
              <SwiperSlide key={Math.random()} className={`${styles.swiperSlider} swiperVerticalSlide`}>
                <div className={styles.swiperImage}>
                  <img className="image" src={`${IMAGE_BASE_URL}${BACK_SIZE_1280}${item.file_path}`} />
                </div>
              </SwiperSlide>
            );
          })}

          <div className={styles.navigationWrap}>
       

            <div className={styles.navItem} ref={navigationPrevRef}>
              <svg xmlns="http://www.w3.org/2000/svg" width={60} height={60} viewBox="0 0 60 60" fill="none">
                <g opacity="0.8" filter="url(#filter0_b_3044_1039)">
                  <rect width={60} height={60} rx={30} fill="#808080" style={{ mixBlendMode: "luminosity" }} />
                  <rect
                    x="0.7"
                    y="0.7"
                    width="58.6"
                    height="58.6"
                    rx="29.3"
                    stroke="url(#paint0_linear_3044_1039)"
                    strokeWidth="1.4"
                  />
                  <mask
                    id="mask0_3044_1039"
                    style={{ maskType: "alpha" }}
                    maskUnits="userSpaceOnUse"
                    x={18}
                    y={18}
                    width={24}
                    height={24}
                  >
                    <path d="M42 42V18H18V42H42Z" fill="#F5F5F5" />
                  </mask>
                  <g mask="url(#mask0_3044_1039)">
                    <path
                      className="path"
                      d="M20.2903 33.922C19.9032 34.3144 19.9032 34.9507 20.2903 35.3431L20.6478 35.7057C21.0349 36.0981 21.6624 36.0981 22.0494 35.7057L28.7992 28.8617C29.1862 28.4692 29.8137 28.4692 30.2008 28.8616L36.9506 35.7057C37.3376 36.0981 37.9651 36.0981 38.3522 35.7057L38.7097 35.3431C39.0968 34.9507 39.0968 34.3144 38.7097 33.922L30.2008 25.2943C29.8137 24.9019 29.1863 24.9019 28.7992 25.2943L20.2903 33.922Z"
                  
                      fill="#F5F5F5"
                    />
                  </g>
                </g>
                <defs>
                  <filter
                    id="filter0_b_3044_1039"
                    x={-100}
                    y={-100}
                    width={260}
                    height={260}
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity={0} result="BackgroundImageFix" />
                    <feGaussianBlur in="BackgroundImageFix" stdDeviation={50} />
                    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_3044_1039" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_3044_1039" result="shape" />
                  </filter>
                  <linearGradient
                    id="paint0_linear_3044_1039"
                    x1="-19.4118"
                    y1="5.30488"
                    x2="-12.9997"
                    y2="64.6333"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="white" stopOpacity="0.4" />
                    <stop offset="0.368352" stopColor="white" stopOpacity="0.01" />
                    <stop offset="0.574372" stopColor="white" stopOpacity="0.01" />
                    <stop offset={1} stopColor="white" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div  className={styles.navItem} ref={navigationNextRef}>
              <svg xmlns="http://www.w3.org/2000/svg" width={60} height={60} viewBox="0 0 60 60" fill="none">
                <g opacity="0.8" filter="url(#filter0_b_3044_1043)">
                  <rect
                    width={60}
                    height={60}
                    rx={30}
                    transform="matrix(1 0 0 -1 0 60)"
                    fill="#808080"
                    style={{ mixBlendMode: "luminosity" }}
                  />
                  <rect
                    x="0.7"
                    y="-0.7"
                    width="58.6"
                    height="58.6"
                    rx="29.3"
                    transform="matrix(1 0 0 -1 0 58.6)"
                    stroke="url(#paint0_linear_3044_1043)"
                    strokeWidth="1.4"
                  />
                  <mask
                    id="mask0_3044_1043"
                    style={{ maskType: "alpha" }}
                    maskUnits="userSpaceOnUse"
                    x={18}
                    y={18}
                    width={24}
                    height={24}
                  >
                    <path d="M42 18V42H18V18H42Z" fill="#F5F5F5" />
                  </mask>
                  <g mask="url(#mask0_3044_1043)">
                    <path
                      className="path"
                      d="M20.2903 26.078C19.9032 25.6856 19.9032 25.0493 20.2903 24.6569L20.6478 24.2943C21.0349 23.9019 21.6624 23.9019 22.0494 24.2943L28.7992 31.1383C29.1862 31.5308 29.8137 31.5308 30.2008 31.1384L36.9506 24.2943C37.3376 23.9019 37.9651 23.9019 38.3522 24.2943L38.7097 24.6569C39.0968 25.0493 39.0968 25.6856 38.7097 26.078L30.2008 34.7057C29.8137 35.0981 29.1863 35.0981 28.7992 34.7057L20.2903 26.078Z"
                      fill="#F5F5F5"
                    />
                  </g>
                </g>
                <defs>
                  <filter
                    id="filter0_b_3044_1043"
                    x={-100}
                    y={-100}
                    width={260}
                    height={260}
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity={0} result="BackgroundImageFix" />
                    <feGaussianBlur in="BackgroundImageFix" stdDeviation={50} />
                    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_3044_1043" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_3044_1043" result="shape" />
                  </filter>
                  <linearGradient
                    id="paint0_linear_3044_1043"
                    x1="-19.4118"
                    y1="5.30488"
                    x2="-12.9997"
                    y2="64.6333"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="white" stopOpacity="0.4" />
                    <stop offset="0.368352" stopColor="white" stopOpacity="0.01" />
                    <stop offset="0.574372" stopColor="white" stopOpacity="0.01" />
                    <stop offset={1} stopColor="white" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default AboutMovie;
