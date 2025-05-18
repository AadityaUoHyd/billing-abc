import axios from "axios";

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080/api/v1.0";

export const latestOrders = async () => {
    return await axios.get(`${URL}/orders/latest`, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
}

export const createOrder = async (order) => {
    return await axios.post(`${URL}/orders`, order, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
}

export const deleteOrder = async (id) => {
    return await axios.delete(`${URL}/orders/${id}`, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
}
