import { useAppContext } from "../../../context api/useAppContext";

const useWatchlistsData = () => {
  const { watchlist } = useAppContext();
  
  return watchlist;
};

export default useWatchlistsData;
