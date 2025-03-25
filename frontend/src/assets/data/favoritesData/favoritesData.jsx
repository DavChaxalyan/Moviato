import { useAppContext } from "../../../context api/useAppContext";

const useFavoritesData = () => {
  const { favorites } = useAppContext();
  
  return favorites;
};

export default useFavoritesData;
