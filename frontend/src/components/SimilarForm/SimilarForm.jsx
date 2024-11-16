import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { BASE_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE_500 } from "../../config/config";
import styles from "./styles.module.css";
import noImage from "../../assets/images/no-image.jpeg"
import { Navigation } from "swiper/modules";

export const SimilarForm = ({ id="",title = "",type="movie",category="similar" }) => {
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    const getMovieTvData = async () => {
        try {
            const response = await fetch(
                `${BASE_URL}${type}/${id}/${category}?api_key=${API_KEY}`
            );
            const data = await response.json();
            if(type === 'person') {
                
            setData({
                results: [...data.cast,...data.crew]
            })
            return;
            }
            setData(data);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    useEffect(() => {
        if (id) {
            getMovieTvData();
        }
    }, [id]);

    if (data === null || !data.results) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.slide_movie_tv_wrapper}>
            <h2 className={styles.slide_movie_tv_title}>{title}</h2>
            <Swiper
                rewind={true}
                modules={[Navigation]}
                slidesPerView={3.8}
                navigation={true}
                className='mySwiper'
            >
                {data.results.map((movieTv, ind) => {
                    let image  = movieTv.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE_500}${movieTv.poster_path}` : noImage
                    return  <SwiperSlide key={ind}>
                    <div className={styles.movieTv_item}>
                        <div className={styles.movieTv_img_wrap}>
                            <img
                                src={image}
                                alt={movieTv.title}
                                onClick={() => navigate(`/movie/${movieTv.id}`)}
                            />
                        </div>
                        <h3>{movieTv.title}</h3>
                    
                    </div>
                </SwiperSlide>
                }        
                )}
            </Swiper>
        </div>
    );
};
