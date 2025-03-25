import React, { createContext, useContext, useState, useEffect } from "react";
import { getWatchlists } from "../api/watchlist/watchlist";
import { getFavorites } from "../api/favorite/favorite";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [watchlistData, favoritesData] = await Promise.all([
          getWatchlists(),
          getFavorites(),
        ]);

        setWatchlist(watchlistData);
        setFavorites(favoritesData);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ watchlist, setWatchlist, favorites, setFavorites, loading }}>
      {children}
    </AppContext.Provider>
  );
};
