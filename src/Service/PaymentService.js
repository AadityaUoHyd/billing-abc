import axios from "axios";

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080/api/v1.0";

export const createRazorpayOrder = async (data) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No JWT token found in localStorage');
        }
        return await axios.post(`${URL}/payments/create-order`, data, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
    } catch (error) {
        if (error.response?.status === 403) {
            toast.error('Session expired. Please log in again.');
            localStorage.removeItem('token');
            window.location.href = '/login'; // Redirect to login page
        }
        throw error;
    }
};

export const verifyPayment = async (paymentData) => {
    console.log("Token value of payment", localStorage.getItem('token'));
    return await axios.post(`${URL}/payments/verify`, paymentData, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
}
