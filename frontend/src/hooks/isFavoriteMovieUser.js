import { getUserIdFromToken } from "./getUserIdFromToken";

export const isFavoriteMovieUser = (movieId, favorites) => {
  const userId = getUserIdFromToken();
  if (!userId || !favorites?.length) return false;

  return favorites.some(favorite => 
    favorite.userId === userId && favorite.movieData.id === movieId
  );
};
