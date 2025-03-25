import React, { useState } from "react";
import Loading from "../Loading";
import styles from "./style.module.css";
import { API_KEY, BASE_URL, IMAGE_BASE_URL, POSTER_SIZE_500 } from "../../config/config";

const FavoriteActorsPopup = ({ movieActors, setInterests, onNext }) => {
  const [actors, setActors] = useState(movieActors);
  const [selected, setSelected] = useState([]);

  function getRandomObjectsWithId(data, count) {
    const ids = [];
    const suggestMovies = [];

    while (ids.length < count) {
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomPerson = data[randomIndex];
      const randomActorIndex = Math.floor(Math.random() * randomPerson.length);
      const randomObject = randomPerson[randomActorIndex];

      if (!ids.includes(randomObject.id)) {
        ids.push(randomObject.id);
        suggestMovies.push(randomObject);
      }
    }

    return { id: ids, suggestMovies };
  }
  const toggleSelected = (actorsId) => {
    if (!selected.includes(actorsId) && selected.length < 4) {
      setSelected([...selected, actorsId]);
    }
    if (selected.includes(actorsId)) {
      const reSelected = selected.filter((id) => id !== actorsId);
      setSelected(reSelected);
    }
  };

  const handleMovie = async () => {
    const allMovieDetails = await Promise.all(
      selected.map(async (id) => {
        const response = await fetch(`${BASE_URL}/person/${id}/movie_credits?api_key=${API_KEY}`);
        const data = await response.json();

        return [...data.cast, ...data.crew];
      })
    );
    const randomIds = getRandomObjectsWithId(allMovieDetails, 8);
    setInterests((prev) => {
      return {
        ...prev,
        suggestMovies: randomIds.suggestMovies,
      };
    });
    onNext();
  };

  if (!actors) return <Loading />;

  return (
    <>
      <div className={styles.title_container}>
        <span className={styles.pick_actor}>Pick Your Favorite Actors</span>
        <div className={styles.switch_selectors}>
          <div className={styles.switch_selector} />
          <div className={styles.switch_selector} />
          <div className={styles.switch_selector_active} />
        </div>
      </div>
      <div className={styles.favorite_actors_container}>
        {actors?.map((actor) => (
          <div key={actor.id} className={styles.favorite_actor} onClick={() => toggleSelected(actor.id)}>
            <div className={`${styles.image_container} ${selected.includes(actor.id) && styles.selected}`}>
              <img src={`${IMAGE_BASE_URL}${POSTER_SIZE_500}${actor.profile_path}`} alt={actor.name} />
            </div>
            <span className={`${styles.actors_name} ${selected.includes(actor.id) && styles.selected_actors_name}`}>
              {actor.name}
            </span>
          </div>
        ))}
      </div>
      <button className={styles.suggest_button} onClick={handleMovie}>
        Suggest
      </button>
    </>
  );
};

export default FavoriteActorsPopup;
