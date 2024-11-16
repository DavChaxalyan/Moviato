import SvgIcon from "../SvgIcon/SvgIcon";
import styles from "./style.module.css";
import Modal from "../Modal";
import axios from "axios";
import { API_KEY, BASE_URL, IMAGE_BASE_URL, POSTER_SIZE_500 } from "../../config/config";
import { useEffect, useState } from "react";

const SuggestedMovies = ({ onSkipClick }) => {
  const [movies, setMovies] = useState([]);
  const [smile, setSmile] = useState({
    smileIcon: "icon_satisfiedSmile",
    smileIcon2: "icon_satisfiedSmile",
  });
  const [changeSave, setChangeSave] = useState(false);
  const [changeFavorite, setFavorite] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          // `${BASE_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
          `${BASE_URL}movie/20/recommendations?api_key=${API_KEY}`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  movies.length = 4;

  return (
    <Modal>
      <section className={styles.suggestItem}>
        <h2>Suggested Movies</h2>
        <div className={styles.suggestImgItem}>
          {movies.map((m) => {
            return (
              <div className={styles.suggestImgBox}>
                <div className={styles.suggestImgChild}>
                  <div className={styles.suggestShadowItem}>
                    <div className={styles.suggestPlayIcon}>
                      <p style={{display: `${changeFavorite ? 'none' : 'inline'}`}} onClick={() => {
                        setFavorite(true)
                      }}>
                        {" "}
                        <SvgIcon iconName="icon_favorite" className={styles.elemSvg} />
                      </p>
                      <p  style={{display: `${!changeFavorite ? 'none' : 'inline'}`}} onClick={() => {setFavorite(false)}}>
                        {" "}
                        <SvgIcon iconName="icon_favorite_selected" className={styles.elemSvg}   />
                      </p>
                      <p style={{display: `${changeSave ? 'none' : 'inline'}`}} onClick={() => {
                        setChangeSave(true)
                      }}>
                        <SvgIcon iconName="icon_save" className={styles.elemSvgSave}/>
                      </p>
                      <p style={{display: `${!changeSave ? 'none' : 'inline'}`}} onClick={() => {setChangeSave(false)}}>
                        <SvgIcon iconName="icon_save_selected" className={styles.elemSvgSave} />
                      </p>
                    </div>

                  </div>
                  <img src={`${IMAGE_BASE_URL}${POSTER_SIZE_500}${m.poster_path}`} />
                </div>
                <span>
                  <SvgIcon iconName={smile.smileIcon} />
                  {m.vote_average.toFixed(1)}
                </span>
                <p>
                  <b>{m.title}</b>
                </p>
              </div>
            );
          })}
        </div>

        <div onClick={onSkipClick} className={styles.suggestSkipItem}>
          <p>Skip</p>
        </div>
      </section>
    </Modal>
  );
};

export default SuggestedMovies;
