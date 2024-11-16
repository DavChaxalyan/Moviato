
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { API_KEY, BASE_URL, IMAGE_BASE_URL, POSTER_SIZE_500 } from '../../config/config';
import noImage from "../../assets/images/no-image.jpeg"
import { SimilarForm } from '../SimilarForm/SimilarForm';

const ActorsPage = ({id}) => {
  const [data, setData] = useState([]);
    const getMovieTvDate = async () => {
        try {
        const response = await fetch(
            `${BASE_URL}person/${id}?api_key=${API_KEY}`
        );
        const results  = await response.json();
        setData(results);
        } catch (error) {
        console.log("error :", error);
        }
    };
    useEffect(() => {
        getMovieTvDate();
    }, []);
  return (
    <>
      <section className={styles.itemActorsPage}>
        <div className={styles.AbouteActors}>
          <div className={styles.itemActors}>
            <div className={styles.imgItemActors}>
              <img src={data.profile_path ? `${IMAGE_BASE_URL}${POSTER_SIZE_500}${data?.profile_path}`:noImage}/>
            </div>
            <div className={styles.textItemActors}>
              <h2>{data?.name}</h2>
              <h3>{data.known_for_department}</h3>
              <p>
                {data?.biography}
              </p>
            </div>
          </div>
        </div>
        <SimilarForm id={id} type="person" category="movie_credits" title="Movies"/>
        <SimilarForm id={id} type="person" category="tv_credits" title="Tvs"/>
      </section>
    </>
  );
  3;
};

export default ActorsPage;