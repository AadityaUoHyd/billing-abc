import axios from 'axios';

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080/api/v1.0";

export const fetchActivityLogs = async () => {
    
    return await axios.get(`${URL}/activity`, {headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}});
};
