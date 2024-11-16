import React, { useEffect, useState } from 'react';
import "./style.css";
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import SvgIcon from "../SvgIcon/SvgIcon";
import { API_KEY, BACK_SIZE_1280, BASE_URL, IMAGE_BASE_URL } from '../../config/config';

const RelatedMoviesandSerials = ({id}) => {
    const [data, setData] = useState([]);
    const [savedItems, setSavedItems] = useState([]);
    const [favoriteItems, setFavoriteItems] = useState([]);
    
    const getMovieTvDate = async () => {
        try {
        const response = await fetch(
            `${BASE_URL}tv/${id}/similar?api_key=${API_KEY}`
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

    const toggleSaveItem = (index) => {
        setSavedItems((prevSavedItems) => {
            const newSavedItems = [...prevSavedItems];
            newSavedItems[index] = !newSavedItems[index];
            return newSavedItems;
        });
    };

    const toggleFavoriteItem = (index) => {
        setFavoriteItems((prevFavoriteItems) => {
            const newFavoriteItems = [...prevFavoriteItems];
            newFavoriteItems[index] = !newFavoriteItems[index];
            return newFavoriteItems;
        });
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
    <>
    <div className='main-div-relatedSerials'>
        <div className='div-popular-title'>
            <div>
                <p style={{color: "#f5f5f5", fontSize: 'var(--m-size)', fontFamily: 'var(--font-family)'}}>Related Serials</p>
            </div> 
        </div>
        <div className='main-swipper-popular'>

        <Swiper
            rewind={true}
            modules={[Navigation]}
            slidesPerView={3.8}
            spaceBetween={24}
            navigation={true}
            className='myCartSwiper'
            >
            {data?.map((elem, index) => (
                <SwiperSlide key={index} virtualIndex={index} className='swipp'>
                    <div className='itemm-div-popular'>
                        <img src={`${IMAGE_BASE_URL}${BACK_SIZE_1280}${elem.poster_path}`} className='itemm-img-popular'/>
                    <div className='div-img-movie-related'></div>
                        <div className='icon_sav' onClick={() => toggleSaveItem(index)}>
                            <SvgIcon iconName={savedItems[index] ? "icon_save_selected" : "icon_save"} />
                        </div>
                        <div className='icon_favorit' onClick={() => toggleFavoriteItem(index)}>
                            <SvgIcon iconName={favoriteItems[index] ? "icon_favorite_selected" : "icon_favorite"} />
                        </div>                  
                    <div className='div-status-rating'>
                        <SvgIcon iconName={CalculateSmile(elem.vote_average)} className='icon_verySatis'/>
                        <p className='related-movie-rating'>{elem.vote_average.toFixed(1)}</p>
                    </div>
                    <div className='div-title-movie-related'>
                        <p>{elem.name}</p>
                    </div>
                </div>
            </SwiperSlide>
            ))}
        </Swiper>
            </div>
        </div>
    </>
  )
}

export default RelatedMoviesandSerials