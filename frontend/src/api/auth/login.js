import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; 

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
