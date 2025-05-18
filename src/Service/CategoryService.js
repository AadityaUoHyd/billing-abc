import axios from "axios";

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080/api/v1.0";

export const addCategory = async (category) => {
    return await axios.post(`${URL}/admin/categories`, category, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
}

export const deleteCategory = async (categoryId) => {
    return await axios.delete(`${URL}/admin/categories/${categoryId}`, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
}

export const fetchCategories = async () => {
    return await axios.get(`${URL}/categories`, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
}
