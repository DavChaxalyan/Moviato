import React, { useEffect, useState } from 'react';
import "./style.css";
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import SvgIcon from "../SvgIcon/SvgIcon";
import { API_KEY, BACK_SIZE_1280, BASE_URL, IMAGE_BASE_URL } from '../../config/config';
import { useNavigate } from "react-router";
import { addToFavorites, getFavorites } from '../../api/favorite/favorite';
import { useAppContext } from '../../context api/useAppContext';
import { isFavoriteMovieUser } from '../../hooks/isFavoriteMovieUser';
import { addToWatchlists, getWatchlists } from '../../api/watchlist/watchlist';
import { isWatchlistMovieUser } from '../../hooks/isWatchlistMovieUser';


const RelatedMoviesandSerials = ({ id }) => {
    const { watchlist, setWatchlist, favorites, setFavorites, loading } = useAppContext();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [message, setMessage] = useState("");
    
    const getMovieTvDate = async () => {
        try {
            const response = await fetch(
                `${BASE_URL}movie/${id}/similar?api_key=${API_KEY}`
            );
            const { results } = await response.json();
            setData(results);
        } catch (error) {
            console.log("error :", error);
        }
    };

    useEffect(() => {
        if (id) {
            getMovieTvDate();
        }
    }, [id]);

    const handleItemClick = (elemId) => {
        navigate(`/movie/${elemId}`);
    };

    const toggleSaveItem = async (elem) => {
        try {
            const response = await addToWatchlists(elem);
            setMessage(response.message);
    
            const updatedWatchlists = await getWatchlists();
            setWatchlist(updatedWatchlists);
        } catch (error) {
            setMessage(error);
        }
    };

    const toggleFavoriteItem = async (elem) => {
        try {
            const response = await addToFavorites(elem);
            setMessage(response.message);
    
            const updatedFavorites = await getFavorites();
            setFavorites(updatedFavorites);
        } catch (error) {
            setMessage(error);
        }
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
            <div className='main-div-popular main-container'>
                <div className='div-popular-title'>
                    <div>
                        <p style={{color: "#f5f5f5", fontSize: 'var(--m-size)', fontFamily: 'var(--font-family)'}}>Related Movies</p>
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
                                <div className='itemm-div-popular' onClick={() => handleItemClick(elem.id)}>
                                    <img src={`${IMAGE_BASE_URL}${BACK_SIZE_1280}${elem.poster_path}`} className='itemm-img-popular'/>
                                    <div className='div-img-movie-related'></div>
                                    <div className='icon_sav' onClick={(e) => {e.stopPropagation(); toggleSaveItem(elem)}}>
                                        <SvgIcon className={isWatchlistMovieUser(elem?.id, watchlist) && "icon_fav"} iconName={isWatchlistMovieUser(elem?.id, watchlist) ? "icon_save_selected" : "icon_save"} />
                                    </div>
                                    <div className='icon_favorit' onClick={(e) => {e.stopPropagation(); toggleFavoriteItem(elem)}}>
                                        <SvgIcon className={isFavoriteMovieUser(elem?.id, favorites) && "icon_fav"} iconName={isFavoriteMovieUser(elem?.id, favorites) ? "icon_favorite_selected" : "icon_favorite"} />
                                    </div>                  
                                    <div className='div-status-rating'>
                                        <SvgIcon iconName={CalculateSmile(elem.vote_average)} className='icon_verySatis'/>
                                        <p className='related-movie-rating'>{elem.vote_average.toFixed(1)}</p>
                                    </div>
                                    <div className='div-title-movie-related'>
                                        <p>{elem.original_title}</p>
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

export default RelatedMoviesandSerials;
