import axios from "axios";
import { getUserIdFromToken } from "../../hooks/getUserIdFromToken";

const API_URL = "http://localhost:5000/api";

export const addToWatchlists = async (movieData) => {
  try {
    const userId = await getUserIdFromToken();
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/watchlist`, { userId, movieData }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Ошибка при добавлении в избранное";
  }
};

export const getWatchlists = async () => {
  try {
    const userId = await getUserIdFromToken();
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/watchlists/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Ошибка при добавлении в избранное";
  }
};