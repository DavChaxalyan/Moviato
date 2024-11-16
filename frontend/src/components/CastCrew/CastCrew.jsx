import React, { useEffect, useState } from 'react'
import TextHead from '../TextHead/TextHead';
import { Swiper, SwiperSlide } from 'swiper/react';
import { API_KEY, BASE_URL, IMAGE_BASE_URL, POSTER_SIZE_500 } from '../../config/config';
import { FreeMode, Navigation } from 'swiper/modules';
import styles from "./style.module.css"
import { Link } from 'react-router-dom';
import user_image from "../CommentSection/user_image.png"
import { useNavigate } from "react-router";

const CastCrew = ({id}) => {

  const navigate = useNavigate();
  const [date, setDate] = useState(null);
  const [sliderData,setSliderData] = useState(null)

  const [isCast,setIsCast] = useState(true);

  const getMovieTvDate = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}movie/${id}/credits?api_key=${API_KEY}&language=en-US`
      );
      const date = await response.json();
      setDate(date);
      setSliderData(date.cast)
    } catch (error) {
      console.log("error :", error);
    }
  };
  useEffect(() => {
    if (id) {
      getMovieTvDate();
    }
  }, [id]);
  const handleChange = (info) => {
    if("cast" === info) {

      setSliderData(date.cast)
      setIsCast(true)
      return
    }
    
    setSliderData(date.crew)
    setIsCast(false)
  }
  if(date === null) {
    return "loading..."
  }
  return (
    <div className='main-container'>
      <TextHead
        title="The cast & Crew"
      />
      <div className={styles.btnWrap}>
        <button onClick={()=> handleChange("cast")} className={isCast ? styles.active:""}>Cast</button>
        <button onClick={()=> handleChange("crew")} className={!isCast ? styles.active:""}>Crew</button>
      </div>

      <Swiper
        slidesPerView={7.5}
        spaceBetween={25}
        navigation={true}
        modules={[FreeMode, Navigation]}
        className={styles.castSwiper}
      >
        {sliderData!== null && sliderData?.map((item) => {
          return (
            <SwiperSlide key={Math.random() + item.id}>
              <Link className={styles.actor}>
                <div onClick={() => { navigate('/actors/' + item.id)}}>
                  <img src={item.profile_path != null ? `${IMAGE_BASE_URL}${POSTER_SIZE_500}${item.profile_path}` : user_image} alt=""/>
                </div>
                <h4>{item.original_name}</h4>
                <p>{isCast ? item.character: item.department}</p>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  )
}

export default CastCrew