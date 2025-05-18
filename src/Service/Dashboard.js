import axios from 'axios';

const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080/api/v1.0';

export const fetchDashboardData = async (token) => {
    try {
        return await axios.get(`${URL}/dashboard`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        throw error;
    }
};
