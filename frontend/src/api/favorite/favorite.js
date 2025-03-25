import axios from "axios";
import { getUserIdFromToken } from "../../hooks/getUserIdFromToken";

const API_URL = "http://localhost:5000/api";

export const addToFavorites = async (movieData) => {
  try {
    const userId = await getUserIdFromToken();
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/favorite`, { userId, movieData }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Ошибка при добавлении в избранное";
  }
};

export const getFavorites = async () => {
  try {
    const userId = await getUserIdFromToken();
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/favorites/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Ошибка при добавлении в избранное";
  }
};
