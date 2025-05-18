import axios from "axios";

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080/api/v1.0";

export const login = async (data) => {
  try {
    const response = await axios.post(`${URL}/login`, data);
    return response;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
