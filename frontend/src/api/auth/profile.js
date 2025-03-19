import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    return;
  }

  try {
    const response = await axios.get(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    console.log("Текущий пользователь:", response.data); 

  } catch (error) {
    console.error("Ошибка при получении данных пользователя", error);
  }
};

