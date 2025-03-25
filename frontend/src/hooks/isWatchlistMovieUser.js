import { getUserIdFromToken } from "./getUserIdFromToken";

export const isWatchlistMovieUser = (movieId, watchlists) => {
  const userId = getUserIdFromToken();
  if (!userId || !watchlists?.length) return false;
  
  return watchlists.some(watchlist => 
    watchlist.userId === userId && watchlist.movieData.id === movieId
  );
};